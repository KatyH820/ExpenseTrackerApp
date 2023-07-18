import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
export default function OutputCard({ itemName, itemDate, itemPrice, at, id }) {
  const navigation = useNavigation();
  function pressedHandler() {
    navigation.navigate("ManageExpense", {
      mode: "Edit",
      from: at,
      expenseId: id,
    });
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressedEffect}
      onPress={pressedHandler}
    >
      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={[styles.text, { fontSize: 18 }]}>{itemName}</Text>
          <Text style={styles.text}>
            {moment(itemDate).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={styles.money}>
          <Text style={[styles.text, { fontSize: 18 }]}>
            ${itemPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.colors.secondary,
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "20%",
    marginBottom: "5%",
  },
  text: {
    color: GlobalStyles.colors.contrast,
    fontSize: 12,
    paddingVertical: "2%",
  },
  money: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressedEffect: {
    opacity: 0.5,
  },
});
