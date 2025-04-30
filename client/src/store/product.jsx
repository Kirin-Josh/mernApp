import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "Please fill in all fields ",
      };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        // Check if the HTTP status is not 2xx
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      // Ensure the response has the expected structure
      if (!data.data) {
        throw new Error("Invalid response format");
      }

      set((state) => ({ products: [...state.products, data.data] }));

      return {
        success: true,
        message: "Product successfully added.",
      };
    } catch (error) {
      console.error("Failed to create product:", error);
      return {
        success: false,
        message: error.message || "Failed to create product.",
      };
    }
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success)
        return {
          success: true,
          message: "Product deleted successfully.",
        };

      // updates the ui immediately
      set((state) => ({
        products: state.products.filter((product) => product.id !== pid),
      }));
    } catch (error) {
      console.error("Failed to delete product:", error);
      return {
        success: false,
        message: error.message || "Failed to delete product.",
      };
    }
  },
  updateProduct: async (pid, updateProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct)
    });
    const data = await res.json();
    if (!data.success)
      return {
        success: false,
        message: data.message,
      };
    
    // once again updates the ui
    set((state) => ({
      products: state.products.map(
      (product) => (
        product.id === pid
          ? data.data
          : product
        ))
    }))
  }
}));
