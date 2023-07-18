import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import CustomButton from "../CustomButton";

export default function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <CustomButton onPress={onConfirm}>
        <Text style={[styles.text, { marginBottom: 0, padding: "3%" }]}>
          Okay
        </Text>
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary,
  },
  text: {
    textAlign: "center",
    marginBottom: "5%",
    fontSize: 16,
    color: GlobalStyles.colors.contrast,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
