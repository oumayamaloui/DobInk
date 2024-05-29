const Commande = require('../models/Commande.model');
const Cart = require('../models/cart.model');
const mongoose = require('mongoose');


exports.createCommande = async (req, res) => {
  const {userId, method} = req.body;

  if (!userId || !method) {
    return res.status(400).json({error: 'userId and method are required'});
  }

  try {
    // Find the cart for the given userId
    const cart = await Cart.findOne({userId: mongoose.Types.ObjectId(userId)}).exec();
    if (!cart) {
      return res.status(404).json({error: 'Cart not found'});
    }

    const newCommande = new Commande({
      userId: mongoose.Types.ObjectId(userId),
      status: 'en cours',
      payment: method,
      items: cart.items,
      cartId: cart._id
    });

    const savedCommande = await newCommande.save();

    return res.status(201).json(savedCommande);
  } catch (error) {
    console.error('Error creating commande:', error);
    return res.status(500).json({error: 'Internal server error'});
  }
};

exports.getAllCommande = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


exports.updateCommandeStatus = async (req, res) => {
  try {
    const {id, newStatus} = req.body;
    const commande = await Commande.findById(id);
    if (!commande) {
      return res.status(404).json({message: 'commande not found'});
    }
    commande.status = newStatus;
    await commande.save();
    res.status(200).json({message: 'commande status updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getCommandeByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const commandes = await Commande.find({ userId: mongoose.Types.ObjectId(userId) });

    if (!commandes || commandes.length === 0) {
      return res.status(404).json({ message: 'No commandes found for the given user ID' });
    }

    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

