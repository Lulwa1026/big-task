import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";

const RestaurantScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>RestaurantScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 15,
  },
  text: {
    color: COLORS.primary,
    fontSize: 16,
  },
});

export default RestaurantScreen;
