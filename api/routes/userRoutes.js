const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/create", userController.create);
router.get("/getall", userController.getAll);
router.get("/get/:id", userController.getOne);
router.patch("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;
