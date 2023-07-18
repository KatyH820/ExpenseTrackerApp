import { View, Text, StyleSheet, FlatList } from "react-native";
import OutputCard from "./OutputCard";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ expenses, expensesPeriod, at }) {
  // expenses is an array of object
  const expensesSum = expenses.reduce((sum, expense) => {
    return expense.amount + sum;
  }, 0);

  expensesData = expenses.filter((exp) => exp.date);

  function renderExpenseItem(itemData) {
    return (
      <OutputCard
        itemDate={itemData.item.date}
        itemName={itemData.item.description}
        itemPrice={itemData.item.amount}
        id={itemData.item.id}
        at={at}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You have spent{" "}
        <Text style={styles.importantText}>${expensesSum.toFixed(2)} </Text>
        {expensesPeriod}
      </Text>

      <FlatList
        data={expensesData}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: GlobalStyles.colors.contrast,
    fontSize: 18,
    textAlign: "center",
    marginBottom: "5%",
  },
  container: {
    width: "90%",
  },
  importantText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
