import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, textInputConfig, style, invalid }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        {...textInputConfig}
        style={[styles.inputBox, style, invalid && styles.invalidInput]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: "5%",
    marginVertical: "3%",
    flex: 1,
  },
  label: {
    color: GlobalStyles.colors.contrast,
    fontSize: 18,
    padding: "3%",
  },
  inputBox: {
    width: "100%",
    fontSize: 18,
    backgroundColor: GlobalStyles.colors.contrast,
    padding: "8%",
    borderRadius: 20,
    borderWidth: 0,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error,
  },
  invalidInput: {
    backgroundColor: "#fcb9b2",
    // borderColor: GlobalStyles.colors.error,
    // borderWidth: 2,
  },
});
