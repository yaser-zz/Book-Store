const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const {updateUser, getAllUsers, getUsersById, deleteUser} = require("../controllers/userController");



router.put("/:id", verifyTokenAndAuthorization, updateUser);

router.get("/", verifyTokenAndAdmin, getAllUsers);

router.get("/:id", verifyTokenAndAuthorization, getUsersById);

router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;