import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import { Picker } from '@react-native-picker/picker';
import {  Button, ProgressBar } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Ingreso', value: 'Ingreso' },
  { label: 'Egreso', value: 'Egreso' },
];

export default function RecibosFormScreen({ navigation }) {
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nombre, setNombre] = useState('');
  const [tipoRecibo, setTipoRecibo] = useState('Ingreso'); // Nuevo selector

  const [primicia,setPrimicia] = useState(0);
  const [diezmo, setDiezmo] = useState(0);
  const [pobres, setPobres] = useState(0);
  const [agradecimiento, setAgradecimiento] = useState(0);
  const [esc_sabatica, setEscsabatica] = useState(0);
  const [jovenes, setJovenes] = useState(0);
  const [adolescentes, setAdolescentes] = useState(0);
  const [ninos, setNinos] = useState(0);
  const [educacion, setEducacion] = useState(0);
  const [salud, setSalud] = useState(0);
  const [obra_mis, setObramis] = useState(0);
  const [musica, setMusica] = useState(0);
  const [renuevatv, setRenuevatv] = useState(0);
  const [primer_sabado, setPrimersab] = useState(0);
  const [sem_oracion, setSemorac] = useState(0);
  const [mis_extranj, setMisextran] = useState(0);
  const [construccion, setConstruc] = useState(0);
  const [diversos, setDiversos] = useState(0);

	const formatDate = (date) => date.toLocaleDateString('en-CA');

	const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
    setFecha(currentDate);
  };

  const guardarRecibo = async () => {
		if (!fecha || !nombre) {
			alert('el campo nombre es obligatorio');
			return;
		}

		const fechaString = formatDate(fecha);

    const tabla = tipoRecibo === 'Ingreso' ? 'ReciboIg' : 'egresos';

    const data = {
      fecha: fechaString,
      nombre,
			primicia,
      diezmo,
      pobres,
      agradecimiento,
      esc_sabatica,
      jovenes,
      adolescentes,
      ninos,
      educacion,
      salud,
      obra_mis,
      musica,
      renuevatv,
      primer_sabado,
      sem_oracion,
      mis_extranj,
      construccion,
      diversos,
    }

		const { error } = await supabase.from(tabla).insert(data);

		if (error) {
			alert('Error al guardar: ' + error.message);
		} else {
			alert('Recibo guardado correctamente');
			navigation.goBack();
		}
	};
	
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Selecciona tipo"
          value={tipoRecibo}
          onChange={(item) => {
            setTipoRecibo(item.value);
          }}
        />
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

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Primicia</Text>
      <TextInput
        style={styles.input}
        placeholder="Primicia"
        value={primicia}
        keyboardType='numeric'
        onChangeText={setPrimicia}
      />

			<Text style={styles.label}>Diezmo</Text>
      <TextInput
        style={styles.input}
        placeholder="Diezmo"
        value={diezmo}
        keyboardType='numeric'
        onChangeText={setDiezmo}
      />
      <Text style={styles.label}>Pobres</Text>
      <TextInput
        style={styles.input}
        placeholder="Pobres"
        value={pobres}
				keyboardType='numeric'
        onChangeText={setPobres}
      />

      <Text style={styles.label}>Agradecimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="Agradecimeinto"
        value={agradecimiento}
        keyboardType='numeric'
        onChangeText={setAgradecimiento}
      />

			<Text style={styles.label}>Esc Sabataica</Text>
      <TextInput
        style={styles.input}
        placeholder="Escuela Sabatica"
        value={esc_sabatica}
        onChangeText={setEscsabatica}
				keyboardType='numeric'
      />
      <Text style={styles.label}>Jovenes</Text>
      <TextInput
        style={styles.input}
        placeholder="Jovenes"
        value={jovenes}
				keyboardType='numeric'
        onChangeText={setJovenes}
      />

      <Text style={styles.label}>Adolescentes</Text>
      <TextInput
        style={styles.input}
        placeholder="Adolescentes"
        value={adolescentes}
        onChangeText={setAdolescentes}
        keyboardType='numeric'
      />

			<Text style={styles.label}>Niños</Text>
      <TextInput
        style={styles.input}
        placeholder="Niños"
        value={ninos}
        onChangeText={setNinos}
        keyboardType='numeric'
      />
      <Text style={styles.label}>Educacion</Text>
      <TextInput
        style={styles.input}
        placeholder="Educacion"
        value={educacion}
				keyboardType='numeric'
        onChangeText={setEducacion}
      />

      <Text style={styles.label}>Salud</Text>
      <TextInput
        style={styles.input}
        placeholder="Salud"
        value={salud}
        keyboardType='numeric'
        onChangeText={setSalud}
      />

			<Text style={styles.label}>Obra Misionera</Text>
      <TextInput
        style={styles.input}
        placeholder="Obra Misionera"
        value={obra_mis}
        keyboardType='numeric'
        onChangeText={setObramis}
      />
      <Text style={styles.label}>Musica</Text>
      <TextInput
        style={styles.input}
        placeholder="Musica"
        value={musica}
				keyboardType='numeric'
        onChangeText={setMusica}
      />

      <Text style={styles.label}>Renueva TV</Text>
      <TextInput
        style={styles.input}
        placeholder="Renueva Tv"
        value={renuevatv}
        keyboardType='numeric'
        onChangeText={setRenuevatv}
      />

			<Text style={styles.label}>1er Sabado</Text>
      <TextInput
        style={styles.input}
        placeholder="1er Sabado"
        value={primer_sabado}
        keyboardType='numeric'
        onChangeText={setPrimersab}
      />
      <Text style={styles.label}>Semana de Oracion</Text>
      <TextInput
        style={styles.input}
        placeholder="Sem. Oracion"
        value={sem_oracion}
				keyboardType='numeric'
        onChangeText={setSemorac}
      />

      <Text style={styles.label}>Mis Extranjera</Text>
      <TextInput
        style={styles.input}
        placeholder="Mis Extranjera"
        value={mis_extranj}
        keyboardType='numeric'
        onChangeText={setMisextran}
      />

			<Text style={styles.label}>Construccion</Text>
      <TextInput
        style={styles.input}
        placeholder="Construccion"
        value={construccion}
        keyboardType='numeric'
        onChangeText={setConstruc}
      />
      <Text style={styles.label}>Diversos</Text>
      <TextInput
        style={styles.input}
        placeholder="Diversos"
        value={diversos}
        keyboardType='numeric'
        onChangeText={setDiversos}
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
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    color: '#999',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
});
