const router = require('express').Router();
const { createOrder, getAllOrders, deleteOrder } = require('../controllers/order.controller.js');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrder);

module.exports = router;
