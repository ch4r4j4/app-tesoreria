// screens/DashboardScreen.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

// 🔹 Datos de prueba
const totalBalance = 94162;
const pieData = [
  {
    name: "QR Code",
    population: 54280,
    color: "#FF6B6B",
    legendFontColor: "#ccc",
    legendFontSize: 12,
  },
  {
    name: "Zhi Xiaomi",
    population: 23400,
    color: "#4ECDC4",
    legendFontColor: "#ccc",
    legendFontSize: 12,
  },
  {
    name: "Industry Solutions",
    population: 16482,
    color: "#45B7D1",
    legendFontColor: "#ccc",
    legendFontSize: 12,
  },
];

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 🔹 Tarjeta 1 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Scan code collection</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 48}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"16"}
          hasLegend={true}
          absolute
        />
        <View style={styles.centerValue}>
          <Text style={styles.total}>${totalBalance}</Text>
          <Text style={styles.sub}>1259</Text>
        </View>
      </View>

      {/* 🔹 Tarjeta 2 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Customer details</Text>
        <View style={styles.row}>
          <View style={styles.detailItem}>
            <Ionicons name="logo-paypal" size={28} color="#3b7bbf" />
            <Text style={styles.detailText}>$28,632</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="card" size={28} color="#4ECDC4" />
            <Text style={styles.detailText}>$16,420</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cart" size={28} color="#ff9f1c" />
            <Text style={styles.detailText}>$9,362</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#1e1e2f",
  backgroundGradientTo: "#1e1e2f",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  card: {
    backgroundColor: "#1e1e2f",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 12,
    fontWeight: "600",
  },
  centerValue: {
    position: "absolute",
    top: "45%",
    left: "35%",
    alignItems: "center",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  sub: {
    fontSize: 14,
    color: "#aaa",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  detailItem: {
    alignItems: "center",
  },
  detailText: {
    marginTop: 6,
    fontSize: 14,
    color: "#fff",
  },
});
