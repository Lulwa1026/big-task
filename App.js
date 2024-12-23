import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import RestaurantDetailScreen from "./screens/RestaurantDetailScreen";
import DishDetailScreen from "./screens/DishDetailScreen";
import CartScreen from "./screens/CartScreen";
import { CartProvider } from "./context/CartContext";
import CartIcon from "./components/CartIcon";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { AuthProvider } from "./context/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#f3f4f6",
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <CartIcon />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Categories"
              component={CategoriesScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <CartIcon />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Restaurants"
              component={RestaurantsScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <CartIcon />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="RestaurantDetail"
              component={RestaurantDetailScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <CartIcon />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="DishDetail"
              component={DishDetailScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <CartIcon />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{
                headerShown: true,
              }}
            />
          </Stack.Navigator>
          <StatusBar style="dark" />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
});
