import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenses";
export const store = configureStore({
  reducer: {
    expense: expenseSlice.reducer,
  },
});
