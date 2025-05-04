const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const { getAllBooks, getBookById, creatBook, updateBook, deleteBook} = require("../controllers/bookController");

// /api/books
router.route("/")
      .get(getAllBooks)
      .post(verifyTokenAndAdmin, creatBook)

// /api/books/:id
router.route("/:id")
      .get(getBookById)
      .put(verifyTokenAndAdmin, updateBook)
      .delete(verifyTokenAndAdmin, deleteBook)

module.exports = router;