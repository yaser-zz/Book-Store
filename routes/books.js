const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken")
const { ValidateCreatBook, ValidateUpdateBook, Book } = require("../models/Book");


/**
 * @desc Get All Books
 * @route /api/books
 * @method Get
 * @access public
 */
router.get("/" , asyncHandler( 
    async (req,res) => {
    const books = await Book.find().populate("author", ["firstName","lastName"]);
    res.status(200).json(books);
}));

/**
 * @desc Get Books By ID
 * @route /api/books/:id
 * @method Get
 * @access public
 */
router.get("/:id" , asyncHandler(
    async(req,res) => {
        const book = await Book.findById(req.params.id).populate("author");
    if(book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({message: "book not found"})
    }
    }
));

/**
 * @desc Creat New Book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */
router.post("/",
    verifyTokenAndAdmin,
    asyncHandler(
    async(req,res) => {
        const {  error  } = ValidateCreatBook(req.body);
        if(error) {
        return res.status(400).json({  message: error.details[0].message  });
    }
    const book = new Book (
        {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    )
    const result = await book.save();
    res.status(201).json(result);  
}));

/**
 * @desc Update a book
 * @route /api/books/:id
 * @method PUT
 * @access private
 */
router.put("/:id",
    verifyTokenAndAdmin,
    asyncHandler(
    async(req,res) => {
    const { error } = ValidateUpdateBook(req.body);

    if(error) {
        return res.status(400).json({  message: error.details[0].message  });
    }
    const updateBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    }, {new: true});
    res.status(200).json(updateBook);
}));

/**
 * @desc Delete a book
 * @route /api/books/:id
 * @method DELETE
 * @access private (only admin)
 */
 router.delete("/:id",
    verifyTokenAndAdmin,
    asyncHandler(
    async(req,res) => {
    const book = await Book.findById(req.params.id);
    if(book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ massage: "book has been deleted"});
    } else {
        res.status(404).json({ massage: "book not found" });
    }
}));

module.exports = router;