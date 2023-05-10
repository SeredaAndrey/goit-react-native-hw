import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import PostScreen from "./screens/main/PostScreen";
import CreateScreen from "./screens/main/CreateScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

export function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="register"
          component={RegisterScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          headerTitle: "Публікації",
          tabBarIcon: ({ focused, size, color }) => {
            return <Feather name="grid" size={size} color={color} />;
          },
        }}
        name="posts"
        component={PostScreen}
      />
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          headerTitle: "Створити публікацію",
          tabBarIcon: ({ focused, size, color }) => {
            return <Feather name="plus" size={size} color={color} />;
          },
        }}
        name="create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          headerTitle: "Профіль",
          tabBarIcon: ({ focused, size, color }) => {
            return <Feather name="user" size={size} color={color} />;
          },
        }}
        name="profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
