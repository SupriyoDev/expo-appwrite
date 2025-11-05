import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "coral",
        tabBarInactiveTintColor: "gray",

        //tabbbar bg style
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 2,
          borderTopWidth: 1,
          borderColor: "gray",
        },

        //tabbar label style
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 13,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
