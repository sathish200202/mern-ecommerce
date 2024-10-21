import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

//GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    if (!product) {
      res.status(200).json({ message: " No Products are here! " });
    } else {
      res.status(200).json({ product });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server Error", error });
  }
};

//GET FEATURED PRODUCT
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    //if not in redis, fetch from mongodb
    //.lean() is gonna return a plain javascript onject instead of mongodb document
    //which is good for performance

    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(500).json({ message: "No featured products found" });
    }

    //store in redis for future quick access

    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.status(200).json({ featuredProducts });
  } catch (error) {
    console.log("Error in geFeaturedProducts controller ", error.message);
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};

//CREATE A NEW PRODCT
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    //console.log("outside the if statement");

    if (image) {
      //console.log("inside the if statement");

      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      //console.log("cloudinary ", cloudinaryResponse);
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
      category,
    });

    res.status(200).json(product);
  } catch (error) {
    console.log("Error in createProduct controller ", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  //console.log("deleting.. ");
  //const { id } = req.params;

  //console.log("deleting: ", id);

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloudinary");
      } catch (err) {
        console.log("error deleting image from cloudinary", error);
      }
    }
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//GET RECOMMENDED PRODUCTS
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (err) {
    console.log("Error in getRecommended controller", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//GET PRODUCT BY CATEGORY
export const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getProductByCategory controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//TOGGLE FEATURED PRODUCT
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isFeatured = !product.isFeatured;

      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//UPDATE FEATURED PRODUCTS CACHE
async function updateFeaturedProductsCache() {
  try {
    //the .lean() method is used to return plain javascript objects of full mongoose documents.this can significantly improve performance

    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in updateFeaturedProductCache ", error.message);
  }
}
