// components/EditButton.js
import React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EditButton({ id, resource, data }) {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate("RecibosForm", {
      mode: "edit",
      resource,
      item: data, // 👈 mandamos el objeto entero
    });
  };

  return (
    <IconButton
      icon="pencil"
      iconColor="blue"
      onPress={handleEdit}
      style={styles.iconButton}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: {
    margin: 0,
    padding: 0,
  },
});
