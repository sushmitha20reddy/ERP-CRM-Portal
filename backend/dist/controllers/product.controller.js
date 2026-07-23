import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getLowStockProducts, } from "../services/product.service.js";
import { productSchema } from "../validators/product.validator.js";
export async function getProducts(req, res) {
    try {
        const search = typeof req.query.search === "string"
            ? req.query.search
            : undefined;
        const page = typeof req.query.page === "string"
            ? parseInt(req.query.page)
            : 1;
        const limit = typeof req.query.limit === "string"
            ? parseInt(req.query.limit)
            : 10;
        const products = await getAllProducts(search, page, limit);
        return res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
}
export async function getProduct(req, res) {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
export async function addProduct(req, res) {
    try {
        const validatedData = productSchema.parse(req.body);
        const product = await createProduct(validatedData);
        return res.status(201).json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
export async function editProduct(req, res) {
    try {
        const validatedData = productSchema.parse(req.body);
        const product = await updateProduct(req.params.id, validatedData);
        return res.status(200).json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
export async function removeProduct(req, res) {
    try {
        await deleteProduct(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
export async function getLowStock(req, res) {
    try {
        const products = await getLowStockProducts();
        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch low stock products",
        });
    }
}
