import axios from "axios";

const BACKEND_URL =
  "https://expensestrackerapp-5f9e7-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  //expenseData is an obkect that holds the amount, description, date,month, week NOT ID, because a unique ID will be auto-generated by Firebase
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
      month: response.data[key].month,
      week: response.data[key].week,
    };

    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}