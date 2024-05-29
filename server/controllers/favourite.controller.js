const Favourite = require('../models/favourite.model');
const Product = require('../models/product.model');


exports.toggleFavourite = async (req, res) => {
  const { productId, userId } = req.body;

  try {
    let favourite = await Favourite.findOne({ userId });

    if (!favourite) {
      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }
      favourite = new Favourite({ userId, items: [] });
    }

    const existingItemIndex = favourite.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex !== -1) {
      // Remove item if it exists
      favourite.items.splice(existingItemIndex, 1);
    } else {
      // Add item if it doesn't exist
      favourite.items.push({ productId });
    }

    await favourite.save();
    res.status(200).json(favourite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};



exports.getFavouriteItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const favourite = await Favourite.findOne({ userId }).populate('items.productId');

    if (!favourite) {
      return res.status(404).json({ message: 'Favourites not found' });
    }

    const favouriteItems = await Promise.all(
      favourite.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return { product };
      })
    );

    res.status(200).json(favouriteItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
