const router = require('express').Router();
const { createOrder, getAllOrders, deleteOrder } = require('../controllers/order.controller.js');
const { parser } = require("../utils/cloudinary.js");


router.post('/', createOrder);
router.get('/', parser.single("image"), getAllOrders);
router.delete('/:id', deleteOrder);

module.exports = router;
