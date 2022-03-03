const express = require("express");

const orderController = require("../controllers/orderController");
const controller = require("../controllers/controller");

const router = express.Router();

router.post("/", orderController.create);
router.post("/geocode", orderController.getGeocode);

router.get("/getall", orderController.getAll);
router.get("/:id", orderController.getOne);
router.get("/get/:googleId", orderController.getByGoogleId);

router.patch("/update/:id", orderController.update);
router.delete("/delete/:id", orderController.delete);

module.exports = router;
