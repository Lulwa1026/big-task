import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const RestaurantsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurants, categoryName } = route.params || {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName || "Restaurants",
    });
  }, [categoryName]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.restaurantItem}
            onPress={() =>
              navigation.navigate("RestaurantDetail", {
                restaurant: item,
              })
            }
          >
            <View style={styles.imageContainer}>
              <Text style={styles.restaurantImage}>{item.image}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantInfo}>
                ⭐ {item.rating} • {item.cuisine}
              </Text>
              <Text style={styles.deliveryTime}>🕒 {item.deliveryTime}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  listContent: {
    padding: 15,
  },
  restaurantItem: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    height: 180,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantImage: {
    fontSize: 72,
  },
  infoContainer: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  restaurantInfo: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: "#6b7280",
  },
});

export default RestaurantsScreen;
