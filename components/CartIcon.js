import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={24} color="#4f46e5" />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 4,
  },
});

export default CartIcon;
