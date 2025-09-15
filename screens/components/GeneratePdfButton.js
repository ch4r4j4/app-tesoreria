import React from 'react';
import { IconButton } from 'react-native-paper';
import { supabase } from '../../lib/supabase';
import { generarReportePDF } from '../../utils/pdfReportGenerator';
import { StyleSheet } from 'react-native';

export default function GeneratePdfButton({ arqueo }) {
  const handleGeneratePdf = async () => {
    // Obtener recibos
    const { data: recibos, error: errorRecibos } = await supabase
      .from('recibos')
      .select('*')
      .gte('fecha', arqueo.fecha_inicio)
      .lte('fecha', arqueo.fecha_fin);

    if (errorRecibos) {
      console.error("Error al obtener recibos:", errorRecibos.message);
      return;
    }

    // Obtener egresos
    const { data: egresos, error: errorEgresos } = await supabase
      .from('egresos')
      .select('*')
      .gte('fecha', arqueo.fecha_inicio)
      .lte('fecha', arqueo.fecha_fin);

    if (errorEgresos) {
      console.error("Error al obtener egresos:", errorEgresos.message);
      return;
    }

    await generarReportePDF(arqueo, recibos, egresos);
  };

  return (
    <IconButton
      icon="file-pdf-box"
      iconColor="red"
      size={24}
      onPress={handleGeneratePdf}
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
