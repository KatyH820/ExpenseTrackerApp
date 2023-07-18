import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import {
  NavigationContainer,
  SafeAreaView,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpense from "./screens/ManageExpense";
import { GlobalStyles } from "./constants/styles";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./store";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpensesOverview() {
  const navigation = useNavigation();
  function postHandler() {
    navigation.navigate("ManageExpense", { mode: "Post", from: null });
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary,
          height: 90,
        },
        tabBarActiveTintColor: GlobalStyles.colors.tabfocus,
        tabBarPosition: "bottom",
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="hourglass-3" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          title: "Manage Expense",
          tabBarLabel: "Post",
          presentation: "modal",
          tabBarButton: () => (
            <CustomButton onPress={postHandler}>
              <AntDesign
                name="plus"
                size={25}
                color={GlobalStyles.colors.tabfocus}
              />
            </CustomButton>
          ),
        }}
      />

      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Screens() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: GlobalStyles.colors.primary,
      }}
    >
      {/* <ExpensesOverview /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </View>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
