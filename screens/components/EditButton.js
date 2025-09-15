import React from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function EditButton() {
  return (
    <IconButton
      icon="pencil"
      iconColor="blue"
      style={styles.iconButton}
    />
  );
}
const styles = StyleSheet.create({
  iconButton: {
    margin: 0,
    padding: 0,
  },
})

