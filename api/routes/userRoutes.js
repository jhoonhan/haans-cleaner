const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/all", userController.getAll);
router.post("/create", userController.create);
router.post("/update/:id", userController.update);
router.post("/delete/:id", userController.delete);

module.exports = router;
