import { ScrollView, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function ScreenWrap({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: GlobalStyles.colors.primary,

    alignItems: "center",
  },
});
