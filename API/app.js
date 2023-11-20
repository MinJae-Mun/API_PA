require("dotenv"),config();
const express = require("express");
const connect = require("./schemas");

const app = express();
app.use(express.json());

connect();

const router = require("./routes/products.router");
app.use("/api", router);

app.listen(3000, () => {
    console.log("새 서버");
});