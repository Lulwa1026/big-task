import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

const RestaurantDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { restaurant } = route.params || {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: restaurant?.name || "Restaurant Details",
    });
  }, [restaurant]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Text style={styles.restaurantImage}>{restaurant?.image}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.restaurantName}>{restaurant?.name}</Text>
            <Text style={styles.restaurantInfo}>
              ⭐ {restaurant?.rating} • {restaurant?.cuisine}
            </Text>
            <Text style={styles.deliveryTime}>
              🕒 {restaurant?.deliveryTime}
            </Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Menu</Text>
          {restaurant?.menu?.map((dish) => (
            <TouchableOpacity
              key={dish.id}
              style={styles.dishCard}
              onPress={() =>
                navigation.navigate("DishDetail", {
                  dish,
                  restaurantName: restaurant.name,
                })
              }
            >
              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishDescription}>{dish.description}</Text>
                <Text style={styles.dishPrice}>${dish.price}</Text>
              </View>
              <View style={styles.dishImageContainer}>
                <Image source={{ uri: dish.image }} style={styles.dishImage} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "white",
  },
  imageContainer: {
    height: 200,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantImage: {
    fontSize: 100,
  },
  headerInfo: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  restaurantInfo: {
    fontSize: 16,
    color: "#4b5563",
    marginTop: 4,
  },
  deliveryTime: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 4,
  },
  menuSection: {
    padding: 15,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 15,
  },
  dishCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dishInfo: {
    flex: 1,
    marginRight: 15,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4b5563",
  },
  dishImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
});

export default RestaurantDetailScreen;
