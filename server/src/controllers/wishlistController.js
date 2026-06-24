import User from "../models/User.js";
import Product from "../models/Product.js";
import { serializeProduct } from "../utils/serialize.js";

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");

  res.json({
  wishlist: user.wishlist.map(serializeProduct),
});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const addWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

const user = await User.findById(req.user.id);

if (!user.wishlist) {
  user.wishlist = [];
}

const exists = user.wishlist.some(
  (id) => id.toString() === productId
);

if (!exists) {
  user.wishlist.push(product._id);
  await user.save();
}

await user.populate("wishlist");

res.json({
  wishlist: user.wishlist.map(serializeProduct),
});
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    
    });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = if (!user.wishlist) {
  user.wishlist = [];
}

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    await user.populate("wishlist");

  res.json({
  wishlist: user.wishlist.map(serializeProduct),
});
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
      
    });
  }
};
