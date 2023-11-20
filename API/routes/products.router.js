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

router.put("/products/:productId", async (req, res) => {
    try {
        if (!req.body || !req.params) {
            return res
                .status(400)
                .json({ message: "데이터 형식이 올바르지 않습니다." });
        }

        const { title, content, password, status } = req.body;
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "상품이 존재하지 않습니다." });
        }

        if (password != product.password) {
            return res
                .status(404)
                .json({ message: "권한이 존재하지 않습니다." });
        }

        product.title = title;
        product.content = content;
        product.status = status;

        await product.save();
        res.json({ message: "수정 완료" });
    }
    catch (error) {
        res.status(500).json({ message: "ERROR"});
    }
});

router.delete("/products/:productId", async (req, res) => {
    try {
        if (!req.body || !req.params) {
            return res
                .status(400)
                .json({ message: "데이터 형식이 올바르지 않습니다." });
        }

        const productId = req.params.productId;
        const { password } = req.body;
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "상품이 존재하지 않습니다." });
        }

        if (password != product.password) {
            return res
                .status(404)
                .json({ message: "권한이 존재하지 않습니다." });
        }

        await product.deleteOne({ id: productId });
        res.json({ message: "삭제 완료" });
    }
    catch (error) {
        res.status(500).json({ message: "ERROR"});
    }
});
