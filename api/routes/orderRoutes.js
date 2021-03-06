const express = require("express");

const orderController = require("../controllers/orderController");
const controller = require("../controllers/controller");

const router = express.Router();

router.post("/", orderController.create);
router.post("/geocode", orderController.getGeocode);
// router.post("/distance", orderController.getDistance);

router.get("/getall", orderController.getAll);
router.get("/driversearch/:type/:acceptId", orderController.getDriverOrder());
router.get("/:id", orderController.getOne);

router.patch("/update/:id", orderController.update);
router.patch(
  "/aaang/:type/:customerId/:driverId/:orderId",
  orderController.acceptOrder()
);
// router.patch("/accept/:id", orderController.acceptOrder());
router.delete("/delete/:id", orderController.delete);

module.exports = router;
