import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  CreateProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("New Product Added Successfully");
    } catch (error) {
      console.log("Error ", error.message);
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/products");
      //console.log("response: ", response);
      set({ products: response.data.product, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: true });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },

  fetchAllProductsByCategory: async (category) => {
    //console.log("in the hook: ", category);
    set({ loading: true });

    try {
      const response = await axios.get(`/products/category/${category}`);
      set({ product: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });

    try {
      const response = await axios.patch(`/products/${productId}`);
      //this will update the isFeartured prop of the product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.log("error in isFeatred: ", error);
      toast.error(error.response.data.error || "Failed to update product");
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    console.log("product ID: ", productId);

    try {
      const res = await axios.delete(`/products/${productId}`);
      console.log("response in the deleting: ", res);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id === productId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.log("Error in deleting ", error);
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });

    try {
      const res = await axios.get("/products/featured");
      set({ products: res.data });
    } catch (error) {
      set({ error: "Failed to fetch products" });
      console.log("Error in fetching featured products: ", error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
