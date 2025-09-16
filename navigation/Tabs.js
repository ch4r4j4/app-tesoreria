// TabsSwipe.js
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DashboardScreen from "../screens/DashboardScreen";
import RecibosScreen from "../screens/RecibosScreen";
import ArqueoScreen from "../screens/Arqueosscreen";
import { View, Text,StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

function TabLabel({ label, icon, color }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={{ fontSize: 12, color }}>{label}</Text>
    </View>
  );
}

export default function TabsSwipe() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Tab.Navigator
          tabBarPosition="bottom"
          screenOptions={{
            swipeEnabled: true,
            tabBarIndicatorStyle: { backgroundColor: "green", height: 3 },
            tabBarStyle: styles.tabBar,
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              tabBarLabel: ({ color }) => (
                <TabLabel label="Dashboard" icon="home" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Recibos"
            component={RecibosScreen}
            options={{
              tabBarLabel: ({ color }) => (
                <TabLabel label="Recibos" icon="receipt" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Arqueos"
            component={ArqueoScreen}
            options={{
              tabBarLabel: ({ color }) => (
                <TabLabel label="Arqueos" icon="cash" color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 5,
  },
});