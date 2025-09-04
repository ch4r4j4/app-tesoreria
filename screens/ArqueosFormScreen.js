import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { Text, Button, Provider as PaperProvider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../lib/supabase';

export default function ArqueoScreen() {
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());

  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);

  // 🔧 Función para formatear fecha sin problema de zona horaria
  const formatDate = (date) => {
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
  };

  const onChangeInicio = (event, selectedDate) => {
    setShowInicioPicker(false);
    if (selectedDate) {
      setFechaInicio(selectedDate);
    }
  };

  const onChangeFin = (event, selectedDate) => {
    setShowFinPicker(false);
    if (selectedDate) {
      setFechaFin(selectedDate);
    }
  };

  const realizarArqueo = async () => {
    try {
      const fechaInicioStr = formatDate(fechaInicio);
      const fechaFinStr = formatDate(fechaFin);

      const { data, error } = await supabase
        .from('recibos')
        .select('*')
        .gte('fecha', fechaInicioStr)
        .lte('fecha', fechaFinStr);

      if (error) throw error;

      let total_primicia = 0;
      let total_diezmo = 0;
      let total_pobres = 0;
      let total_agradecimiento = 0;
      let total_escsab = 0;
      let total_jovenes = 0;
      let total_adolescentes = 0;
      let total_ninos = 0;
      let total_educacion = 0;
      let total_salud = 0;
      let total_obramis = 0;
      let total_musica = 0;
      let total_renuevatv = 0;
      let total_primersab = 0;
      let total_semorac = 0;
      let total_misextranj = 0;
      let total_construccion = 0;
      let total_diversos = 0;
      let total_sub = 0;

      data.forEach((recibo) => {
        total_primicia += recibo.primicia || 0;
        total_diezmo += recibo.diezmo || 0;
        total_pobres += recibo.pobres || 0;
        total_agradecimiento += recibo.agradecimiento || 0;
        total_escsab += recibo.esc_sabatica || 0;
        total_jovenes += recibo.jovenes || 0;
        total_adolescentes += recibo.adolescentes || 0;
        total_ninos += recibo.ninos || 0;
        total_educacion += recibo.educacion || 0;
        total_salud += recibo.salud || 0;
        total_obramis += recibo.obra_mis || 0;
        total_musica += recibo.musica || 0;
        total_renuevatv += recibo.renuevatv || 0;
        total_primersab += recibo.primer_sabado || 0;
        total_semorac += recibo.sem_oracion || 0;
        total_misextranj += recibo.mis_extranj || 0;
        total_construccion += recibo.construccion || 0;
        total_diversos += recibo.diversos || 0;
        total_sub += recibo.totalrcb || 0;
      })

      const { error: arqueoError } = await supabase.from('arqueos').insert({
        fecha_inicio: fechaInicioStr,
        fecha_fin: fechaFinStr,
        total_primicia,
        total_diezmo,
        total_pobres,
        total_agradecimiento,
        total_escsab,
        total_jovenes,
        total_adolescentes,
        total_ninos,
        total_educacion,
        total_salud,
        total_obramis,
        total_musica,
        total_renuevatv,
        total_primersab,
        total_semorac,
        total_misextranj,
        total_construccion,
        total_diversos,
        total_sub
      });

      if (arqueoError) throw arqueoError;

      Alert.alert('Éxito', 'Arqueo registrado correctamente');
    } catch (e) {
      console.error(e);
      Alert.alert('Error al calcular arqueo', e.message);
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge">Arqueo de Caja</Text>

        <Button
          mode="outlined"
          onPress={() => setShowInicioPicker(true)}
          style={styles.input}
        >
          Fecha de inicio: {formatDate(fechaInicio)}
        </Button>
        {showInicioPicker && (
          <DateTimePicker
            value={fechaInicio}
            mode="date"
            display="default"
            onChange={onChangeInicio}
          />
        )}

        <Button
          mode="outlined"
          onPress={() => setShowFinPicker(true)}
          style={styles.input}
        >
          Fecha de fin: {formatDate(fechaFin)}
        </Button>
        {showFinPicker && (
          <DateTimePicker
            value={fechaFin}
            mode="date"
            display="default"
            onChange={onChangeFin}
          />
        )}

        <Button mode="contained" onPress={realizarArqueo}>
          Calcular y Guardar Arqueo
        </Button>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50
  },
  input: {
    marginBottom: 16
  }
});