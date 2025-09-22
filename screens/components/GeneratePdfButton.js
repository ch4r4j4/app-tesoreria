// GeneratePdfButton.js
import React from "react";
import { IconButton } from "react-native-paper";
import { Linking, Alert, StyleSheet } from "react-native";

export default function GeneratePdfButton({ arqueo }) {
  const handleOpenPdf = async () => {
    try {
      if (arqueo.pdf_url) {
        await Linking.openURL(arqueo.pdf_url);
      } else {
        Alert.alert("Sin PDF", "Este arqueo no tiene un PDF guardado.");
      }
    } catch (e) {
      console.error("Error al abrir el PDF:", e);
      Alert.alert("Error", "No se pudo abrir el PDF.");
    }
  };

  return (
    <IconButton
      icon="file-pdf-box"
      iconColor="red"
      size={24}
      onPress={handleOpenPdf}
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
