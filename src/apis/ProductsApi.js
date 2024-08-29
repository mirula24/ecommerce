import dayjs from "dayjs";
import { setProductCategories } from "../redux/productCategories/productCategoriesSlice";
import {
  setLoading,
  setProducts,
  addProduct,
  editProduct,
  setError,
} from "../redux/products/productsSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class ProductApi {
  static async getProduct(page = 1, limit = 10, query) {
    store.dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get("/products", {
        params: {
          page,
          limit,
          query,
        },
      });
      const { data } = res;
      store.dispatch(
        setProducts({
          items: data.items,
          total: data.total,
        })
      );
    } catch (e) {
      console.log("error: ", e.message);
      throw new Error(`ProductsApi getProducts: ${e.message}`);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async getProductDetail(productId) {
    store.dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(`/products/${productId}`);
      return res.data;
    } catch (e) {
      console.log("error: ", e.message);
      throw new Error(`ProductsApi getProductDetail: ${e.message}`);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async getCategories() {
    store.dispatch(setLoading(true));
    const lastFetch = store.getState().productCategories.lastFetch;
    try {
      if (lastFetch) {
        const currentDate = dayjs(new Date().toISOString);

        const isLessThan1Hour = currentDate.diff(lastFetch, "hour") < 1;
        if (isLessThan1Hour) {
          return;
        }
      }

      const res = await axiosInstance.get("/categories");
      const { data } = res;
      store.dispatch(setProductCategories(data));
    } catch (e) {
      console.log("error: ", e.message);
      throw new Error(`ProductsApi getCategories: ${e.message}`);
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  static async createProduct(productData) {
    store.dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post("/products", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      store.dispatch(addProduct(res.data));
    } catch (e) {
      console.log("Error post produc:", e.message);
      store.dispatch(setLoading(false));
    }
  }

  static async updateProduct(id, productsData) {
    store.dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(
        `/products/${id}`,
        productsData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      store.dispatch(editProduct(response.data));
      return response.data;
    } catch (error) {
      console.log("Error get Product", error.message);
      store.dispatch(setError(error));
    } finally {
      store.dispatch(setLoading(false));
    }
  }
}

export default ProductApi;
