const express = require("express");
const { getForgotPasswordView, sendForgotPasswordLink, getRestPassowrdView, resetThePassword } = require("../controllers/passwordController");
const router = express.Router();


// /password/forgot-password
router
    .route("/forgot-password")
    .get(getForgotPasswordView)
    .post(sendForgotPasswordLink);


// /Password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token")
    .get(getRestPassowrdView)
    .post(resetThePassword)
module.exports = router;
