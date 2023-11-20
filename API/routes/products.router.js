const express = require("express");
const Product = require("../schemas/products.schema");
const router = express.Router();

router.post("/products", async (req, res) => {
    try {
        if (!req.body) {
            return res
                .status(400)
                .json({ message: "잘못된 데이터 형식"});
        }
    
        const { title, content, author, password } = req.body;
        
        const newProduct = new Product({
            title,
            content,
            author,
            password
        });
        await newProduct.save();
        res.status(201).json({ message: "등록 완료"});
    }
    catch (error) {
        res.status(500).json({ message: "ERROR"});
    }
});

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find()
            .select("_id title author status createdAt")
            .sort({ createdAt: -1 });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "ERROR"});
    }
});

router.get("/products/:productId", async (req, res) => {
    try {
        const products = await Product.findById(req.params.productId).select(
            "_id title content author status createdAt"
        );

        if (!product) {
            return res
            .status(404)
            .json({ message: "상품이 존재하지 않습니다." });
        }

        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "ERROR"});
    }
});
