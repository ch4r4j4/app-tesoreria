import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import { Picker } from '@react-native-picker/picker';
import {  Button } from 'react-native-paper';

export default function RecibosFormScreen({ navigation }) {
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
	const [tipo, setTipo] = useState('');
	const [descripcion, setDescripcion] = useState('');
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
   const [tipoRecibo, setTipoRecibo] = useState('Ingreso'); // Nuevo selector

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
			navigation.goBack();
		}
	};
	
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.label}>Tipo de Registro</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoRecibo}
          onValueChange={(itemValue) => setTipoRecibo(itemValue)}
        >
          <Picker.Item label="Ingreso" value="Ingreso" />
          <Picker.Item label="Egreso" value="Egreso" />
        </Picker>
      </View>

			<Text style={styles.label}>Nuevo Recibo</Text>

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

      <Text style={styles.label}>Nombre del Recibo</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={monto}
				keyboardType='numeric'
        onChangeText={setMonto}
      />

      <Text style={styles.label}>Monto</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
      />

			<Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="descripcion"
        value={descripcion}
        onChangeText={setDescripcion}
				multiline
      />

      <TouchableOpacity style={styles.button} onPress={guardarRecibo}>
        <Text style={styles.buttonText}>Guardar Recibo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
