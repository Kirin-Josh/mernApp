// entry point for our api
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept data in the req.body

app.use("/api/products", productRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")))
}

app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:" + PORT);
    
})

