import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

interface Product {
  _id: any;
  name: string;
  image: any;
  shortDesc: string;
  longDesc: string;
  price: number;
  brand: string;
}
const initialState = {
  items: [] as Product[],
  status: "idle",
  createStatus: "",
  updateStatus: "",
};

export const productsFetch = createAsyncThunk(
  "products/productFetch",
  async () => {
    const response = await axios.get(`${url}/products`);
    return response?.data;
  }
);
export const productsCreate = createAsyncThunk(
  "products/productCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );
      return response?.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productsUpdate = createAsyncThunk(
  "products/productUpdate",
  async ({ _id, values }: any) => {
    try {
      const response = await axios.put(
        `${url}/products/${_id}`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productDelete = createAsyncThunk(
  "products/productDelete",
  async ({ _id }: any) => {
    try {
      const response = await axios.delete(
        `${url}/products/${_id}`,
        setHeaders()
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(productsCreate.pending, (state, action) => {
        state.createStatus = "pending";
      })
      .addCase(productsCreate.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.items.push(action.payload);
        toast.success("Product Created");
      })
      .addCase(productsCreate.rejected, (state, action) => {
        state.createStatus = "rejected";
      })
      .addCase(productsUpdate.pending, (state, action) => {
        state.updateStatus = "pending";
      })
      .addCase(productsUpdate.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex(
          (item: any) => item._id === action.payload._id
        );
        state.items[itemIndex] = action.payload;
        state.updateStatus = "success";
        toast.success("Product Updated");
      })
      .addCase(productsUpdate.rejected, (state, action) => {
        state.updateStatus = "rejected";
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.items.splice(
          state.items.findIndex((arrow: any) => arrow._id === action.payload),
          1
        );
        toast.success("Product Deleted success");
      });
  },
});

export default productsSlice.reducer;
