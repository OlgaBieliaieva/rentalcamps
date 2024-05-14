import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { campersReducer } from "./campers/campersSlice";
import { favSlice } from "./fav/favSlice";

const favPersistConfig = {
  key: "fav",
  storage,
};

export const store = configureStore({
  reducer: {
    fav: persistReducer(favPersistConfig, favSlice.reducer),
    campers: campersReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
