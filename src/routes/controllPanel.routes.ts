import express from "express";
const app = express();
import CountriesRoutes from "../api/apiCountries";
import ProductsRoutes from "../api/apiProducts";
import BrandsRoutes from "../api/apiBrands";
import SuppliersRoutes from "../api/apiSuppliers";
import CategorisRouts from "../api/apiCategories";
import AttributesRoutes from "../api/apiAttributes";
import OutletsRoutes from "../api/apiOutlets";
import StocksRoutes from "../api/apiStockMovement";
import OrderRoutes from "../api/apiOrders";
import userRoutes from "../api/apiUser";
import sendUploadToGCS from "../google/ImageUploaderMiddleware";
import sendUploadToAlibab from "../Alibaba/ImageUploaderMiddleware";
import upload from "../Middlewares/multer";

app.use("/countries", CountriesRoutes);
app.use("/products", ProductsRoutes);
app.use("/brands", BrandsRoutes);
app.use("/suppliers", SuppliersRoutes);
app.use("/categories", CategorisRouts);
app.use("/attributes", AttributesRoutes);
app.use("/outlets", OutletsRoutes);
app.use("/stocks", StocksRoutes);
app.use("/orders", OrderRoutes);
app.use("/users", userRoutes);
app.use("/upload", upload.single("file"), sendUploadToAlibab);

export default app;
