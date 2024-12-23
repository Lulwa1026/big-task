import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { categories, popularRestaurants } from "../constants/data";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() =>
        navigation.navigate("Restaurants", {
          categoryId: category.id,
          categoryName: category.name,
          restaurants: category.restaurants,
        })
      }
    >
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  const renderRestaurantCard = (restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.restaurantCard}
      onPress={() => navigation.navigate("RestaurantDetail")}
    >
      <View style={styles.restaurantImageContainer}>
        <Text style={styles.restaurantImage}>{restaurant.image}</Text>
      </View>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantDetails}>
          ⭐ {restaurant.rating} • {restaurant.cuisine}
        </Text>
        <Text style={styles.deliveryTime}>🕒 {restaurant.deliveryTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map(renderCategoryCard)}
          </ScrollView>
        </View>

        {/* Featured Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Restaurants</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurants")}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.restaurantsGrid}>
            {popularRestaurants.map(renderRestaurantCard)}
          </View>
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
  content: {
    flex: 1,
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  seeAll: {
    color: "#4b5563",
    fontSize: 14,
  },
  categoriesScroll: {
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  categoryCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.25,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4b5563",
  },
  restaurantsGrid: {
    marginTop: 10,
  },
  restaurantCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restaurantImageContainer: {
    height: 150,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantImage: {
    fontSize: 72,
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  restaurantDetails: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: "#6b7280",
  },
});

export default HomeScreen;
