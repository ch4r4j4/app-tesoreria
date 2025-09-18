// components/HeaderMenu.js
import React, { useState } from "react";
import { Menu } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HeaderMenu({ navigation }) {
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TouchableOpacity onPress={() => setVisible(true)} style={{ marginRight: 10 }}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" /> 
        </TouchableOpacity>
      }
    >
      <Menu.Item
        onPress={() => {
          setVisible(false);
          navigation.navigate("Configuration");
        }}
        title="Configuración"
      />
      <Menu.Item
        onPress={() => {
          setVisible(false);
          alert("Opción de ayuda");
        }}
        title="Ayuda"
      />
    </Menu>
  );
}
