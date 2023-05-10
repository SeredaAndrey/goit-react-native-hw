import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultPostScreen from "../nested/DefaultPostScreen";
import MapScreen from "../nested/MapScreen";
import CommentsScreen from "../nested/CommentScreen";

const NestedScreen = createNativeStackNavigator();

const PostScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="defaultScreen"
        component={DefaultPostScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ headerTitle: "Локація" }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerTitle: "Коментарі" }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostScreen;
