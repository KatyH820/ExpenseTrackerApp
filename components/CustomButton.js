import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
export default function CustomButton({ children, onPress, style, type }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        type !== "flat" && styles.button,
        style,
        pressed ? styles.pressedEffect : null,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.thirdary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    borderRadius: "100%",
    margin: "2%",
  },
  pressedEffect: {
    opacity: 0.5,
  },
});
