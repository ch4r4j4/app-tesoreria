// RecibosModal.js
import React, { useState } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../lib/supabase';

export default function RecibosModal({ onClose, onSaved }) {
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const formatDate = (date) => date.toLocaleDateString('en-CA');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
    setFecha(currentDate);
  };

  const guardarRecibo = async () => {
    if (!fecha || !monto || !tipo) {
      alert('Los campos fecha, monto y tipo son obligatorios');
      return;
    }

    const fechaString = formatDate(fecha);

    const { error } = await supabase.from('Recibos').insert([{
      fecha: fechaString,
      monto: parseFloat(monto),
      tipo,
      descripcion
    }]);

    if (error) {
      alert('Error al guardar: ' + error.message);
    } else {
      alert('Recibo guardado correctamente');
      onSaved(); // para recargar la lista
      onClose(); // cerrar modal
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text variant="titleLarge">Nuevo Recibo</Text>

      <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.input}>
        Fecha: {formatDate(fecha)}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TextInput
        label="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Tipo (ingreso o egreso)"
        value={tipo}
        onChangeText={setTipo}
        style={styles.input}
      />
      <TextInput
        label="Descripción (opcional)"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={styles.input}
      />

      <Button mode="contained" onPress={guardarRecibo}>
        Guardar
      </Button>
      <Button onPress={onClose} style={{ marginTop: 8 }}>Cancelar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10
  },
  input: {
    marginBottom: 16
  }
});
