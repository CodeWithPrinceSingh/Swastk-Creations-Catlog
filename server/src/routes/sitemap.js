import express from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import Product from "../models/Product.js"; // adjust path if needed

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
    try {
        const smStream = new SitemapStream({
            hostname: "https://your-domain.com"
        });

        // Static Pages
        smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
        smStream.write({ url: "/about", priority: 0.8 });
        smStream.write({ url: "/contact", priority: 0.8 });
        smStream.write({ url: "/products", priority: 0.9 });
        smStream.write({ url: "/categories", priority: 0.9 });

        // Dynamic Products
        const products = await Product.find();

        products.forEach(product => {
            smStream.write({
                url: `/product/${product.slug}`,
                changefreq: "weekly",
                priority: 0.8
            });
        });

        smStream.end();

        const sitemap = await streamToPromise(smStream);

        res.header("Content-Type", "application/xml");
        res.send(sitemap.toString());

    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

export default router;
