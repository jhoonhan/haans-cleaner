const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.create);
router.patch(
  "/update/:type/:customerId/:driverId/:orderId",
  userController.updateUserOrder()
);
router.patch("/delete/:customerId/:orderId", userController.deleteUserOrder());

router.get("/getall", userController.getAll);
router.get("/:id", userController.getOne);
router.get("/get/:googleId", userController.getByGoogleId);
router.get("/order/:googleId", userController.getUserOrders());

router.patch("/order/:id", userController.createUserOrder());
router.patch("/:id", userController.update);

router.delete("/:id", userController.delete);

module.exports = router;
