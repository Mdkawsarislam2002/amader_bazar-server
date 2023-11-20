import express from "express";
import multer from "multer";
import { CreateDiskStorage } from "../middlewares";

import {
    PopularProduct,
    createProduct,
    deleteProduct,
    getAllFeatureProduct,
    getAllProduct,
    getProductByIdOrCategory,
    getSingleProductById,
    makeFeatureProduct,
    updateProduct,
} from "../controller/product.controller";

export const productRoute = express.Router();
const upload = multer({ storage: CreateDiskStorage("products") });

productRoute.get("/test", (req, res) => {
    res.send("Hello World");
});

//? Products
productRoute.get("/find", getProductByIdOrCategory); //! Bug Detected - Image are not coming
productRoute
    .route("/all")
    .get(getAllProduct)
    .post(upload.single("img"), createProduct); // ! Bug Detected - category can't be add twice

productRoute
    .route("/all/:id")
    .get(getSingleProductById)
    .patch(updateProduct)
    .delete(deleteProduct);

//? Featured
productRoute.route("/feature").get(getAllFeatureProduct);
productRoute.route("/feature/:id").put(makeFeatureProduct);

//?  Most popular
productRoute.route("/popular").get(PopularProduct);
