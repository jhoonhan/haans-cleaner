const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.create);
router.patch(
  "/completed/:customerId/:driverId",
  userController.postCompleted()
);

router.get("/getall", userController.getAll);
router.get("/:id", userController.getOne);
router.get("/get/:googleId", userController.getByGoogleId);

router.patch("/mofo/:id", userController.mofo());
router.patch("/order/:id", userController.updateOrder);
router.patch("/:id", userController.update);

router.delete("/:id", userController.delete);

module.exports = router;
