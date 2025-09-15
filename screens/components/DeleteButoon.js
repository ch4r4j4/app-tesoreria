import React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet, Alert } from "react-native";
import { supabase } from "../../lib/supabase";

export default function DeleteButton({ id, resource, onDeleted }) {
  const handleDelete = async () => {
    // Confirmación antes de eliminar
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabase
                .from(resource) // 👈 usamos el resource dinámico
                .delete()
                .eq("id", id);

              if (error) {
                console.error("Error al eliminar:", error.message);
              } else {
                console.log(`Eliminado de ${resource} con id: ${id}`);
                if (onDeleted) {
                  onDeleted(id); // notifica al padre para actualizar estado
                }
              }
            } catch (err) {
              console.error("Error inesperado:", err);
            }
          },
        },
      ]
    );
  };

  return (
    <IconButton
      icon="delete"
      iconColor="red"
      onPress={handleDelete}
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
