const Comment = require('../models/comment.model');

exports.addComment = async (req, res) => {
  try {
    const {name, description, productId, createdAt} = req.body;

    // Create a new product instance
    const newComment = new Comment({
      name,
      description,
      productId,
      createdAt,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


exports.getAllComments = async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
