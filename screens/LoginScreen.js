import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { users, login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login attempt with:", { identifier, password });
    console.log("Available users:", users);

    // Check for empty fields
    if (!identifier.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields", [{ text: "OK" }]);
      return;
    }

    // Check if user exists
    const user = users.find(
      (user) =>
        user.email.toLowerCase() === identifier.toLowerCase() ||
        user.name.toLowerCase() === identifier.toLowerCase()
    );

    console.log("Found user:", user);

    if (!user) {
      Alert.alert(
        "Account Not Found",
        "Please register first before attempting to login.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Register Now",
            onPress: () => {
              setIdentifier("");
              setPassword("");
              navigation.navigate("Register");
            },
          },
        ]
      );
      return;
    }

    // Check password
    if (user.password !== password) {
      Alert.alert("Error", "Incorrect password", [{ text: "OK" }]);
      return;
    }

    // Login successful
    console.log("Login successful, navigating to Home");
    login(user);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email or Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email or username"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
          />
          <Text style={styles.helperText}>
            You can use either your email or username to login
          </Text>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.registerButton}
          >
            <Text style={styles.registerText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  helperText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#4f46e5",
    fontWeight: "600",
  },
  registerButton: {
    padding: 4,
  },
});

export default LoginScreen;
