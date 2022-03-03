const express = require("express");

const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/create", orderController.create);
router.get("/getall", orderController.getAll);
router.get("/get/:id", orderController.getOne);
router.patch("/update/:id", orderController.update);
router.delete("/delete/:id", orderController.delete);

module.exports = router;
