import { StyleSheet, Text, View } from "react-native";
import ScreenWrap from "../components/ScreenWrap";
import { GlobalStyles } from "../constants/styles";
import RecentLineChart from "../components/ExpensesOutput/RecentLineChart";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../util/http";
import { expenseAction } from "../store/expenses";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
export default function RecentExpenses() {
  const [load, setLoad] = useState(true);
  const [error, setError] = useState();
  const expenseData = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        dispatch(expenseAction.setExpenses(expenses));
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setLoad(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }
  if (error && !load) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (load) {
    return <LoadingOverlay />;
  }
  const expensesLastWeek = expenseData.filter((expense) => {
    const today = moment();
    const pastDate = moment().subtract(7, "days");
    const date = moment(expense.date);
    return date >= pastDate && date <= today;
  });

  const Alldata = JSON.parse(JSON.stringify(expensesLastWeek));
  const week = JSON.parse(JSON.stringify(Alldata));
  const dtInWeekOrder = week.sort((a, b) => (a.week > b.week ? 1 : -1));

  for (let i = 0; i < 7; i++) {
    if (!dtInWeekOrder[i] || dtInWeekOrder[i].week != i + 1) {
      dtInWeekOrder.splice(i, 0, {
        amount: 0,
        week: i + 1,
      });
    }
  }

  return (
    <ScreenWrap>
      <Text style={styles.Title}>Your Expenses For This Week</Text>
      <RecentLineChart data={dtInWeekOrder} />
      <View style={styles.list}>
        <ExpensesOutput
          expenses={Alldata}
          expensesPeriod="in the past 7 days"
          at="Recent"
        />
      </View>
    </ScreenWrap>
  );
}

const styles = StyleSheet.create({
  Title: {
    color: GlobalStyles.colors.contrast,
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
