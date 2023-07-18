import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [
      // {
      //   id: "e1",
      //   description: "A pair of shoes",
      //   amount: 59.99,
      //   date: "2023-07-09",
      //   week: moment("2023-07-09").isoWeekday(),
      //   month: moment("2023-07-09").month(),
      // },
      // {
      //   id: "e2",
      //   description: "A pair of trousers",
      //   amount: 89.29,
      //   date: "2023-07-10",
      //   week: moment("2023-07-10").isoWeekday(),
      //   month: moment("2023-07-10").month(),
      // },
      // {
      //   id: "e3",
      //   description: "Some bananas",
      //   amount: 5.99,
      //   date: "2023-07-11",
      //   week: moment("2023-07-11").isoWeekday(),
      //   month: moment("2023-07-11").month(),
      // },
      // {
      //   id: "e4",
      //   description: "A book",
      //   amount: 15.99,
      //   date: "2023-07-12",
      //   week: moment("2023-07-12").isoWeekday(),
      //   month: moment("2023-07-12").month(),
      // },
      // {
      //   id: "e5",
      //   description: "Another book",
      //   amount: 18.99,
      //   date: "2023-07-13",
      //   week: moment("2023-07-13").isoWeekday(),
      //   month: moment("2023-07-13").month(),
      // },
      // {
      //   id: "e6",
      //   description: "Another shoes",
      //   amount: 18.99,
      //   date: "2023-07-14",
      //   week: moment("2023-07-14").isoWeekday(),
      //   month: moment("2023-07-14").month(),
      // },
      // {
      //   id: "e7",
      //   description: "Another bananas",
      //   amount: 18.99,
      //   date: "2023-07-15",
      //   week: moment("2023-07-15").isoWeekday(),
      //   month: moment("2023-07-15").month(),
      // },
    ],
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
          // ...state.expenses[index],
          id: action.payload.id,
          description: action.payload.description,
          amount: action.payload.amount,
          date: action.payload.date,
          week: action.payload.week,
          month: action.payload.week,
        };
      }
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice;
