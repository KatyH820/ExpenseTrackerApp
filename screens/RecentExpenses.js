import { StyleSheet, Text, View } from "react-native";
import ScreenWrap from "../components/ScreenWrap";
import { GlobalStyles } from "../constants/styles";
import RecentLineChart from "../components/ExpensesOutput/RecentLineChart";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { generateId } from "../util/date";
import moment from "moment";
export default function RecentExpenses() {
  const expenseData = useSelector((state) => state.expense.expenses);

  const expensesLastWeek = expenseData.filter((expense) => {
    const today = moment();
    const pastDate = moment().subtract(7, "days");
    const date = moment(expense.date);
    return date >= pastDate && date <= today;
  });

  const Alldata = JSON.parse(JSON.stringify(expensesLastWeek));
  const dtInWeekOrder = Alldata.sort((a, b) => (a.week > b.week ? 1 : -1));

  for (let i = 0; i < 7; i++) {
    if (!dtInWeekOrder[i] || dtInWeekOrder[i].week != i + 1) {
      dtInWeekOrder.splice(i, 0, {
        amount: 0,
        id: generateId(),
        week: i + 1,
      });
    }
  }

  const data = dtInWeekOrder.sort((a, b) =>
    new Date(b.date) > new Date(a.date) ? 1 : -1
  );

  return (
    <ScreenWrap>
      <Text style={styles.Title}>Your Expenses For This Week</Text>
      <RecentLineChart data={data} />
      <View style={styles.list}>
        <ExpensesOutput
          expenses={data}
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
