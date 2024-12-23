import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

const DishDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { dish, restaurantName } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity: quantity,
        restaurantId: dish.restaurantId,
        restaurantName: restaurantName,
      },
    });
    navigation.goBack();
  };

  const adjustQuantity = (increment) => {
    setQuantity(Math.max(1, quantity + increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {dish?.image ? (
            <Image source={{ uri: dish.image }} style={styles.dishImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>🍽️</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            <Text style={styles.price}>${dish?.price.toFixed(2)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{dish?.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {dish?.ingredients?.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientText}>• {ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {dish?.nutrition && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nutrition Facts</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {dish.nutrition.calories}
                  </Text>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {dish.nutrition.protein}g
                  </Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {dish.nutrition.carbs}g
                  </Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {dish.nutrition.fat}g
                  </Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
              </View>
            </View>
          )}

          {dish?.allergens && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Allergens</Text>
              <View style={styles.allergensList}>
                {dish.allergens.map((allergen, index) => (
                  <View key={index} style={styles.allergenTag}>
                    <Text style={styles.allergenText}>{allergen}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.cartSection}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => adjustQuantity(-1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => adjustQuantity(1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>
            Add to Cart - ${(dish?.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#f9fafb",
  },
  dishImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 72,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 16,
    color: "#6b7280",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
  },
  ingredientsList: {
    marginTop: 8,
  },
  ingredientItem: {
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: "#4b5563",
  },
  nutritionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  nutritionItem: {
    alignItems: "center",
    flex: 1,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  allergensList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  allergenTag: {
    backgroundColor: "#fee2e2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  allergenText: {
    color: "#dc2626",
    fontSize: 14,
  },
  cartSection: {
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  quantityButton: {
    backgroundColor: "#f3f4f6",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#4b5563",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
    color: "#1f2937",
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DishDetailScreen;
