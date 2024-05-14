import { createSlice } from '@reduxjs/toolkit';

export const favSlice = createSlice({
    name: 'fav',
    initialState: { favorites: [] },
    reducers: {
      add: (state, action) => {
        state.favorites.push(action.payload);
      },
      remove: (state, action) => {
        const index = state.favorites.findIndex(
          item => item === action.payload
        );
        state.favorites.splice(index, 1);
      },
    },
  });

  export const { add, remove } = favSlice.actions;