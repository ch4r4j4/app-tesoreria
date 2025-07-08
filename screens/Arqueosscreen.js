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

      const { data: recibos, error } = await supabase
        .from('Recibos')
        .select('*')
        .gte('fecha', fechaInicioStr)
        .lte('fecha', fechaFinStr);

      if (error) throw error;

      const ingresos = recibos.filter(r => r.tipo.toLowerCase() === 'ingreso');
      const egresos  = recibos.filter(r => r.tipo.toLowerCase() === 'egreso');

      const totalIngresos = ingresos.reduce((sum, r) => sum + r.monto, 0);
      const totalEgresos  = egresos.reduce((sum, r) => sum + r.monto, 0);

      const saldo = totalIngresos - totalEgresos;

      const saldoEnCaja        = totalIngresos * 0.50;
      const paraOrganizacion   = totalIngresos * 0.45;
      const paraEventualidades = totalIngresos * 0.05;

      const { error: arqueoError } = await supabase.from('arqueos').insert({
        fecha_inicio: fechaInicioStr,
        fecha_fin: fechaFinStr,
        total_ingresos: totalIngresos,
        total_egresos: totalEgresos,
        saldo_en_caja: saldoEnCaja,
        para_organizacion: paraOrganizacion,
        eventualidades: paraEventualidades,
        observaciones: ''
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
