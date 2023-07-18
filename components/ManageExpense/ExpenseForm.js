import { StyleSheet, View, Text, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import { useState } from "react";
import CustomButton from "../CustomButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../store/expenses";
import { generateId } from "../../util/date";
import moment from "moment";
export default function ExpenseForm({ navBack, initial }) {
  const route = useRoute();
  const navigation = useNavigation();
  const from = route.params.from;
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    amount: {
      value: initial ? initial.amount.toString() : "",
      isValid: true,
    },
    date: { value: initial ? initial.date : "", isValid: true },
    description: {
      value: initial ? initial.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((prev) => ({
      ...prev,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      description: inputValues.description.value,
      date: inputValues.date.value,
      week: moment(inputValues.date.value).isoWeekday(),
      month: moment(inputValues.date.value).month(),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;
    const dateIsValid = dateRegex.test(expenseData.date);
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((prev) => ({
        amount: { value: prev.amount.value, isValid: amountIsValid },
        date: { value: prev.date.value, isValid: dateIsValid },
        description: {
          value: prev.description.value,
          isValid: descriptionIsValid,
        },
      }));
      Alert.alert("Invalid Input", "Please check your input values");
      return;
    }

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      if (!isEditing) {
        dispatch(
          expenseAction.addExpense({
            id: generateId(),
            ...expenseData,
          })
        );
        console.log(expenseData);
      } else {
        dispatch(
          expenseAction.updateExpense({
            id: expenseId,
            ...expenseData,
          })
        );
      }
    }
    navBack();
  }

  //   console.log(inputValues);
  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <View style={styles.row}>
        <Input
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            placeholder: "$50.00",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          placeholder: "Shoes",
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
        style={styles.textArea}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your entered data!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton style={[styles.button]} onPress={navBack}>
          <Text style={styles.text}>Cancel</Text>
        </CustomButton>

        <CustomButton onPress={submitHandler} style={styles.button}>
          <Text style={styles.text}>Submit</Text>
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    height: "60%",
  },
  textArea: {
    height: "50%",
    borderRadius: 10,
    textAlignVertical: "top",
    padding: "5%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: "4%",
    paddingHorizontal: "10%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "10%",
  },
  text: {
    color: GlobalStyles.colors.contrast,
    fontSize: 18,
  },
  errorText: {
    textAlign: "center",
    fontSize: 20,
    color: GlobalStyles.colors.delete,
    paddingHorizontal: "5%",
  },
});
