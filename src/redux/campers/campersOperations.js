import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


axios.defaults.baseURL = "https://6618f1089a41b1b3dfbe61ce.mockapi.io/api/";

const REQUEST_OPTIONS = {
  limit: 4,
  page: 1
};

export const fetchAll = createAsyncThunk(
    "campers/fetchAll",
    async (_, thunkAPI) => {
      
      try {
        const response = await axios.get(`/advert`);
        console.log(response.data);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const fetchByReq = createAsyncThunk(
    "campers/fetchByReq",
    async (params, thunkAPI) => {
      REQUEST_OPTIONS.page = params.page;
      REQUEST_OPTIONS.limit = params.limit;

      const options = new URLSearchParams(REQUEST_OPTIONS);
      try {
        const response = await axios.get(`/advert?${options}`);
        console.log(response.data);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );