const router = require("express").Router();
const productRoutes = require("./product.route.js");
const orderRoutes = require("./order.route.js");

const base = "/api/v1";

router.use(`${base}/products`, productRoutes);
router.use(`${base}/orders`, orderRoutes);

module.exports = router;
