import { createSlice } from "@reduxjs/toolkit";
const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    deleteExpense(state, action) {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload
      );
      state.expenses.splice(index, 1);
    },
    updateExpense(state, action) {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = {
          id: action.payload.id,
          description: action.payload.description,
          amount: action.payload.amount,
          date: action.payload.date,
          week: action.payload.week,
          month: action.payload.week,
        };
      }
    },
    setExpenses(state, action) {
      // const inverted = action.payload.reverse();
      state.expenses = action.payload;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice;
