const express = require("express");
const {
  // addItems,
  getItems,
} = require("../../controllers/api/StoreItemsController");

const router = express.Router();

router.get("/api/items", getItems);
// router.get("/api/add-items", addItems);

module.exports = router;
