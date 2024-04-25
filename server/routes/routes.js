const router = require("express").Router();
const productRoutes = require("./product.route.js");


const base = "/api/v1";

router.use(`${base}/products`, productRoutes);


module.exports = router;