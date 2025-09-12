import React from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function ExpandButton({ arqueoId, expandedId, onToggle }) {
  return (
    <IconButton
      icon={expandedId === arqueoId ? 'chevron-up' : 'chevron-down'}
      onPress={() => onToggle(arqueoId)}
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