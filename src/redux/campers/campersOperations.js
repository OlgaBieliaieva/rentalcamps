import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://d2z6qxr3g6q9lf.cloudfront.net/api";
// "http://rentalcamps-api-env.eba-xpvcfwgq.eu-central-1.elasticbeanstalk.com/api";
// axios.defaults.baseURL = "http://localhost:5000/api";
export const fetchAll = createAsyncThunk(
  "campers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/campers`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
