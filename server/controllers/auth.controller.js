const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'saidani_aziz@hotmail.com',
    pass: 'solutiongroupnext1//', // Ensure this is correct and valid
  },
});

// user: 'pfe_2024@outlook.com',
//   pass: 'pfepfe2024',


// create json web token
const createToken = (id) => {
  return jwt.sign({id}, 'net ninja secret', {
    expiresIn: '1800s'
  });
};
const SECRET_KEY = 'net ninja secret';


exports.resetPassword = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    // Generate a new reset token
    const resetToken = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1h'});

    // Save the reset token and expiration time to the user document
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Fetch the user again to verify the save
    const updatedUser = await User.findOne({email});

    // Log the token and expiration from the database
    console.log('Generated resetToken:', resetToken);
    console.log('Saved resetToken in DB:', updatedUser.resetToken);
    console.log('Token expires at:', new Date(updatedUser.resetTokenExpires).toString());

    // Update the reset link to include '/api/auth'
    const resetLink = `${req.protocol}://${req.get('host')}/api/auth/reset/${resetToken}`;
    const mailOptions = {
      from: 'saidani_aziz@hotmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({error: 'Failed to send reset email'});
      }
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({message: 'Password reset email sent'});
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.renderResetPasswordForm = async (req, res) => {
  console.log('renderResetPasswordForm called');
  try {
    const {token} = req.params;
    console.log('Token received in URL:', token);

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('User not found');
      return res.status(400).json({error: 'Invalid or expired token'});
    }

    // Log the token stored in the user document
    console.log('Token stored in user record:', user.resetToken);

    if (user.resetToken !== token) {
      console.log('Token does not match user record');
      return res.status(400).json({error: 'Invalid or expired token'});
    }

    if (user.resetTokenExpires < Date.now()) {
      console.log('Token has expired');
      return res.status(400).json({error: 'Invalid or expired token'});
    }

    res.send(`
      <form action="/api/auth/reset/${token}" method="POST">
        <input type="password" name="newPassword" placeholder="Enter your new password" required/>
        <button type="submit">Reset Password</button>
      </form>
    `);
  } catch (error) {
    console.log('Error during token verification:', error.message);
    res.status(500).json({error: error.message});
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const {token} = req.params;
    const {newPassword} = req.body;
    console.log('Request body:', req.body); // Add this line

    // Validate newPassword
    if (!newPassword || typeof newPassword !== 'string' || newPassword.trim().length === 0) {
      return res.status(400).json({error: 'Invalid password'});
    }

    console.log('Token received in URL:', token);

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('User not found');
      return res.status(400).json({error: 'Invalid or expired token'});
    }

    if (user.resetToken !== token) {
      console.log('Token does not match user record');
      return res.status(400).json({error: 'Invalid or expired token'});
    }

    if (user.resetTokenExpires < Date.now()) {
      console.log('Token has expired');
      return res.status(400).json({error: 'Invalid or expired token'});
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({message: 'Password has been reset successfully'});
  } catch (error) {
    console.log('Error during password update:', error.message);
    res.status(500).json({error: error.message});
  }
};
exports.changePassword = async (req, res) => {
  try {
    const {email, oldPassword, newPassword} = req.body;

    // Validate inputs
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({error: 'Missing required fields'});
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({error: 'Incorrect old password'});
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({message: 'Password updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.updateUsername = async (req, res) => {
  try {
    const {email, newUsername} = req.body;

    // Validate inputs
    if (!email || !newUsername) {
      return res.status(400).json({error: 'Missing required fields'});
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({message: 'Username updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.updateAddress = async (req, res) => {
  try {
    const {email, newAddress} = req.body;

    // Validate inputs
    if (!email || !newAddress) {
      return res.status(400).json({error: 'Missing required fields'});
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    user.address = newAddress;
    await user.save();

    res.status(200).json({message: 'Address updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.updatePhoneNumber = async (req, res) => {
  try {
    const {email, newPhoneNumber} = req.body;

    // Validate inputs
    if (!email || !newPhoneNumber) {
      return res.status(400).json({error: 'Missing required fields'});
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    user.phone = newPhoneNumber;
    await user.save();

    res.status(200).json({message: 'Phone number updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.register = async (req, res) => {
  try {
    const {username, email, password, role, address, phone} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, email, password: hashedPassword, role, address, phone});
    await user.save();
    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({error: 'Invalid email or password'});
    }
    if (user.status !== 'active') {
      return res.status(403).json({ error: 'Votre compte est verrouillé' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({error: 'Invalid email or password'});
    }

    const token = createToken(user._id);
    const id = user._id
    const {username, role} = user;

    res.status(200).json({token, username, role, id});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.getUserDetails = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({error: 'Missing required field: id'});
    }

    const user = await User.findById(id, {username: 1, phone: 1, address: 1});
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    const {username, phone = '', address = ''} = user;

    res.status(200).json({username, phone, address});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.updateUserStatus = async (req, res) => {
  try {
    const {id, status, role} = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    user.status = status
    user.role = role
    await user.save(); // Save the updated user document

    res.status(200).json({message: 'User status updated successfully', user});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

