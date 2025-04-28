const mongoose = require("mongoose");
const Joi = require("joi");

// Book Schema
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:200,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
    },
    cover: {
        type: String,
        required: true,
        enum: ["Soft Cover","Hard Cover"]
    }
}, {timestamps: true}
);

//Book Model 
const Book = mongoose.model("Book", BookSchema);


// Validate Creat Book 
function ValidateCreatBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().trim().min(3).max(200).required(),
        description: Joi.string().trim().min(3).max(700).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("Soft Cover","Hard Cover").required(),
    });

    return schema.validate(obj);

}

// Validate Update Book 
function ValidateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        author: Joi.string(),
        description: Joi.string().trim().min(3).max(700),
        price: Joi.number().min(0),
        cover: Joi.string().valid("Soft Cover","Hard Cover"),
    })

    return schema.validate(obj);

}
module.exports = {
    Book,
    ValidateCreatBook,
    ValidateUpdateBook
}