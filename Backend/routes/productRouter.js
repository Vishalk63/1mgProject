const express = require("express");
const ProductModel = require("../models/productModel");
const auth = require("../middleware/auth");
const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
    const { image, name, description, category, price, rating, highlights, brand, tags } = req.body;
    try {
        const product = new ProductModel({
            image: image,
            name: name,
            description: description,
            category: category,
            price: price,
            rating: rating,
            highlights: highlights,
            brand: brand,
            tags: tags,
        });
        await product.save();
        // console.log(product)
        res.status(201).json({
            msg: "Product Posted Sucessfully",
            success: true,
            "postedData": product
        });
    } catch (err) {
        res.status(500).json({
            msg: "err while posting products",
            err: err,
        });
    }
});

// we need to provide auth 
productRouter.get('/', async (req, res) => {
    const user = req.body.user
    const product = await ProductModel.find()
    res.status(200).json({
        msg: "data fetched sucessfully",
        "success": true,
        "user":user,
        "data": product
    })
})

productRouter.get('/:id',async (req,res)=>{
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        if(!product){
            res.send('Product not found')
        }else{
            res.status(200).json({
                msg:'Successfully Fetched',
                "product":product
            })
        }

    } catch (err) {
        res.send('err while fetchig data with id')
    }
})

module.exports = productRouter;
