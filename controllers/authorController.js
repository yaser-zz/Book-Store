const asyncHandler = require("express-async-handler");
const { ValidateUpdateAuthors, ValidateCreatAuthor, Author } = require("../models/Author");


/**
 * @desc Get All Authors
 * @route /api/authors
 * @method Get
 * @access public
 */
const getAllAuthors = asyncHandler(
    async (req,res) => {
        const { pageNumber } = req.query;
        const authorsPerPage = 2; 
        const authorList = await Author.find()
                                       .skip((pageNumber -1) * authorsPerPage)
                                       .limit(authorsPerPage)
        res.status(200).json(authorList);
    }
 );

 /**
  * @desc Get Author By ID
  * @route /api/authors/:id
  * @method Get
  * @access public
  */
 const getAuthorById = asyncHandler(
    async (req,res) => {
            const author = await Author.findById(req.params.id);
            if(author) {
                res.status(200).json(author);
            } else {
                res.status(404).json({message: "author not found"})
            }
    }
 );

 /**
 * @desc Creat New Author
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
 const creatAuthor = asyncHandler(
     async (req,res) => {
     
         const { error } = ValidateCreatAuthor(req.body);
         
         if(error) {
              return res.status(400).json({  message: error.details[0].message  });
         }
                 const author = new Author({
                 firstName: req.body.firstName,
                 lastName: req.body.lastName,
                 nationality: req.body.nationality,
                 Image: req.body.Image,
             })
             const result = await author.save();
         
             res.status(201).json(result);
     }
  );

/**
 * @desc Update an author
 * @route /api/authors/:id
 * @method PUT
 * @access private
 */
const updateAuthor = asyncHandler(
    async (req,res) => {
        const { error } = ValidateUpdateAuthors(req.body); 
        if(error) {
            return res.status(400).json({  message: error.details[0].message  });
        }  
            const author = await Author.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        nationality: req.body.nationality,
                        Image: req.body.Image,
                    },
                },
                { new: true }
            );
            res.status(200).json(author);
    }
 );

/**
 * @desc Delete an author
 * @route /api/authors/:id
 * @method DELETE
 * @access private
 */
 const deleteAuthor = asyncHandler(
    async (req,res) => {
            const author = await Author.findById(req.params.id);
        if(author){
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json({ massage: "author has been deleted"});
        } else {
            res.status(404).json({ massage: "author not found" });
        }
    }
 );


 module.exports = {
    getAllAuthors,
    getAuthorById,
    creatAuthor,
    updateAuthor,
    deleteAuthor
 }