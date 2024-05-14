import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";

axios.defaults.baseURL = "https://6618f1089a41b1b3dfbe61ce.mockapi.io/api/";

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