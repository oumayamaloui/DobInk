const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const commentController = require('../controllers/comment.controller');
const cartController = require('../controllers/cart.controller');
const favouriteController = require('../controllers/favourite.controller');
const commandeController = require('../controllers/commande.controller');
const contactController = require("../controllers/contact.controller");

router.post('/add', productController.addProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/load', productController.getAllProducts);
router.post('/comment', commentController.addComment);
router.get('/loadComments', commentController.getAllComments);
router.post('/generateBill', productController.generateBill);
router.post('/payment', productController.payment);
router.post('/cart', cartController.addToCart);
router.get('/cart/:userId', cartController.getCartItems);
router.post('/favourites/add', favouriteController.toggleFavourite);
router.get('/favourites/:userId', favouriteController.getFavouriteItems);
router.post('/create-checkout-session', productController.createCheckoutSession);
router.delete('/cart/:userId', cartController.deleteCart);
router.post('/commande', commandeController.createCommande);
router.get('/loadCommande', commandeController.getAllCommande);
router.put('/updateCommande', commandeController.updateCommandeStatus);
router.get('/loadCommande/:id', commandeController.getCommandeByUserId);


module.exports = router;
