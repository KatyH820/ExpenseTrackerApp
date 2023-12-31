import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ScreenWrap from "../components/ScreenWrap";
import AllBarChart from "../components/ExpensesOutput/AllBarChart";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
export default function AllExpenses() {
  const expenseData = useSelector((state) => state.expense.expenses);
  const Alldata = JSON.parse(JSON.stringify(expenseData));

  return (
    <ScreenWrap>
      <Text style={styles.Title}>Expenses Trend For This Year</Text>
      <AllBarChart data={Alldata} />
      <View style={styles.list}>
        <ExpensesOutput expenses={Alldata} expensesPeriod="in total" at="All" />
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
