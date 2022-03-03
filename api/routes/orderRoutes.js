const express = require("express");

const orderController = require("../controllers/orderController");
const controller = require("../controllers/controller");

const router = express.Router();

router.post("/", orderController.create);

router.get("/getall", orderController.getAll);
router.get("/:id", orderController.getOne);
router.get("/get/:googleId", orderController.getByGoogleId);
router.get("/geocode/:id", orderController.getGeocode);

router.patch("/update/:id", orderController.update);
router.delete("/delete/:id", orderController.delete);

module.exports = router;
