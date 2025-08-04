import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import {  Button} from 'react-native-paper';
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
  const [totalrcb, setTotalrcb] = useState(0);

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

  const calcularTotal = () => {
    const suma =
    parseFloat(primicia) +
    parseFloat(diezmo) +
    parseFloat(pobres) +
    parseFloat(agradecimiento) +
    parseFloat(esc_sabatica) +
    parseFloat(jovenes) +
    parseFloat(adolescentes) +
    parseFloat(ninos) +
    parseFloat(educacion) +
    parseFloat(salud) +
    parseFloat(obra_mis) +
    parseFloat(musica) +
    parseFloat(renuevatv) +
    parseFloat(primer_sabado) +
    parseFloat(sem_oracion) +
    parseFloat(mis_extranj) +
    parseFloat(construccion) +
    parseFloat(diversos);

    setTotalrcb(suma);
  };

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
      totalrcb,
    }

		const { error } = await supabase.from(tabla).insert(data);

		if (error) {
			alert('Error al guardar: ' + error.message);
		} else {
			alert('Recibo guardado correctamente');
			navigation.goBack();
		}
	};

  useEffect(() => {
    calcularTotal();
  }, [
    primicia, diezmo, pobres, agradecimiento, esc_sabatica, jovenes,
    adolescentes, ninos, educacion, salud, obra_mis, musica,
    renuevatv, primer_sabado, sem_oracion, mis_extranj,
    construccion, diversos
  ]);
	
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          backgroundColor: '#f0f0f0',
          borderBottomWidth: 1,
          borderColor: '#ccc',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          Total: S/.{totalrcb.toFixed(2)}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
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

          <View style={{ flex: 1 }}>
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
               {formatDate(fecha)}
            </Button>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Primicia</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Primicia"
            value={primicia}
            keyboardType='numeric'
            onChangeText={(text) => {
              setPrimicia(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Diezmo</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Diezmo"
            value={diezmo}
            keyboardType='numeric'
            onChangeText={(text) => {
              setDiezmo(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Pobres</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Pobres"
            value={pobres}
            keyboardType='numeric'
            onChangeText={(text) => {
              setPobres(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Agradecimiento</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Agradecimeinto"
            value={agradecimiento}
            keyboardType='numeric'
            onChangeText={(text) => {
              setAgradecimiento(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Esc Sabataica</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Escuela Sabatica"
            value={esc_sabatica}
            onChangeText={(text) => {
              setEscsabatica(text);
              calcularTotal();
            }}
            keyboardType='numeric'
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Jovenes</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Jovenes"
            value={jovenes}
            keyboardType='numeric'
            onChangeText={(text) => {
              setJovenes(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Adolescentes</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Adolescentes"
            value={adolescentes}
            keyboardType='numeric'
            onChangeText={(text) => {
              setAdolescentes(text);
              calcularTotal();
            }}
            
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Niños</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Niños"
            value={ninos}
            onChangeText={(text) => {
              setNinos(text);
              calcularTotal();
            }}
            keyboardType='numeric'
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Educacion</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Educacion"
            value={educacion}
            keyboardType='numeric'
            onChangeText={(text) => {
              setEducacion(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Salud</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Salud"
            value={salud}
            keyboardType='numeric'
            onChangeText={(text) => {
              setSalud(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Obra Misionera</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Obra Misionera"
            value={obra_mis}
            keyboardType='numeric'
            oonChangeText={(text) => {
              setObramis(text);
              calcularTotal();
            }}
          />   
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Musica</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Musica"
            value={musica}
            keyboardType='numeric'
            onChangeText={(text) => {
              setMusica(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Renueva TV</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Renueva Tv"
            value={renuevatv}
            keyboardType='numeric'
            onChangeText={(text) => {
              setRenuevatv(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>1er Sabado</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="1er Sabado"
            value={primer_sabado}
            keyboardType='numeric'
            onChangeText={(text) => {
              setPrimersab(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Semana de Oracion</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Sem. Oracion"
            value={sem_oracion}
            keyboardType='numeric'
            onChangeText={(text) => {
              setSemorac(text);
              calcularTotal();
            }}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Mis Extranjera</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Mis Extranjera"
            value={mis_extranj}
            keyboardType='numeric'
            onChangeText={(text) => {
              setMisextran(text);
              calcularTotal();
            }}
          />
        </View>
       
        <View style={styles.row}>
          <Text style={styles.label}>Construccion</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Construccion"
            value={construccion}
            keyboardType='numeric'
            onChangeText={(text) => {
              setConstruc(text);
              calcularTotal();
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Diversos</Text>
          <TextInput
            style={styles.inputRight}
            placeholder="Diversos"
            value={diversos}
            keyboardType='numeric'
            onChangeText={(text) => {
              setDiversos(text);
              calcularTotal();
            }}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={guardarRecibo}>
          <Text style={styles.buttonText}>Guardar Recibo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    flex:1,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputRight: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    textAlign: 'left',
  },
});
