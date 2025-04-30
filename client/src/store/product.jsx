import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return {
                success: false,
                message: "Please fill in all fields "
            }
        }
        try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {  // Check if the HTTP status is not 2xx
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
    }
}));