import { StyleSheet, Text, View } from "react-native";
import ScreenWrap from "../components/ScreenWrap";
import { GlobalStyles } from "../constants/styles";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { expenseAction } from "../store/expenses";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense } from "../util/http";
import { useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
export default function ManageExpense() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  const from = route.params.from;
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const dispatch = useDispatch();
  const mode = route.params.mode;
  const expenses = useSelector((state) => state.expense.expenses);
  let selectedExpense = expenses.find((expense) => expense.id === expenseId);

  function navBack() {
    if (from) {
      navigation.navigate(from === "Recent" ? "RecentExpenses" : "AllExpenses");
    } else {
      navigation.goBack();
    }
  }

  function errorHandler() {
    setError(null);
  }
  async function deleteHandler() {
    setLoad(true);
    try {
      await deleteExpense(expenseId);
      dispatch(expenseAction.deleteExpense(expenseId));
      navBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setLoad(false);
    }
  }

  if (load) {
    return <LoadingOverlay />;
  }

  if (error && !load) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  return (
    <ScreenWrap>
      <View style={styles.screen}>
        <Text style={styles.text}>{mode} Your Expense</Text>

        <ExpenseForm navBack={navBack} initial={selectedExpense} />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <CustomButton
              type="flat"
              onPress={deleteHandler}
              style={styles.button}
            >
              <FontAwesome5
                name="trash-alt"
                size={30}
                color={GlobalStyles.colors.delete}
              />
            </CustomButton>
          </View>
        )}
      </View>
    </ScreenWrap>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    margin: "5%",
    textAlign: "center",
    color: GlobalStyles.colors.contrast,
  },

  deleteContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    paddingTop: "5%",
  },
});
