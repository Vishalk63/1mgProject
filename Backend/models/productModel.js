const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    brand: { type: String },
    tags: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    highlights: { type: String, required: true }
}, {
    versionKey: false
})

const ProductModel = mongoose.model('product', productSchema);

module.exports = ProductModel;