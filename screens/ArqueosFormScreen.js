// ArqueosFormScreen.js
import React, { useState } from "react";
import { StyleSheet, Alert, ScrollView } from "react-native";
import { Text, Button, Provider as PaperProvider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../lib/supabase";
import { generarReportePDF } from "../utils/pdfReportGenerator";

export default function ArqueoScreen() {
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());

  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);

  const formatDate = (date) => date.toLocaleDateString("en-CA"); // YYYY-MM-DD

  const onChangeInicio = (event, selectedDate) => {
    setShowInicioPicker(false);
    if (selectedDate) setFechaInicio(selectedDate);
  };

  const onChangeFin = (event, selectedDate) => {
    setShowFinPicker(false);
    if (selectedDate) setFechaFin(selectedDate);
  };

  const realizarArqueo = async () => {
    try {
      const fechaInicioStr = formatDate(fechaInicio);
      const fechaFinStr = formatDate(fechaFin);

      console.log("⏳ Fechas seleccionadas:", { fechaInicioStr, fechaFinStr });

      // 📌 1. Traer recibos del rango
      const { data: recibos, error: errorRecibos } = await supabase
        .from("recibos")
        .select("*")
        .gte("fecha", fechaInicioStr)
        .lte("fecha", fechaFinStr);

      if (errorRecibos) throw errorRecibos;
      console.log("✅ Recibos obtenidos:", recibos.length);

      // 📌 2. Calcular totales
      let total_primicia = 0,
        total_diezmo = 0,
        total_pobres = 0,
        total_agradecimiento = 0,
        total_escsab = 0,
        total_jovenes = 0,
        total_adolescentes = 0,
        total_ninos = 0,
        total_educacion = 0,
        total_salud = 0,
        total_obramis = 0,
        total_musica = 0,
        total_renuevatv = 0,
        total_primersab = 0,
        total_semorac = 0,
        total_misextranj = 0,
        total_construccion = 0,
        total_diversos = 0,
        total_sub = 0;

      recibos.forEach((recibo) => {
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
      });

      console.log("📊 Totales calculados:", {
        total_primicia,
        total_diezmo,
        total_sub,
      });

      // 📌 3. Insertar arqueo
      const { error: arqueoError } = await supabase.from("arqueos").insert(
        {
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
          total_sub,
        },
        { returning: "minimal" }
      );

      if (arqueoError) throw arqueoError;
      console.log("✅ Insert en arqueos realizado correctamente");

      // 📌 4. Delay para timing
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 📌 5. Obtener último arqueo insertado
      const { data: insertedRows, error: selectError } = await supabase
        .from("arqueos")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);

      if (selectError) throw selectError;
      const insertedArqueo = insertedRows[0];
      console.log("✅ Último arqueo recuperado:", insertedArqueo);

      // 📌 6. Traer egresos
      const { data: egresos, error: errorEgresos } = await supabase
        .from("egresos")
        .select("*")
        .gte("fecha", fechaInicioStr)
        .lte("fecha", fechaFinStr);

      if (errorEgresos) throw errorEgresos;
      console.log("✅ Egresos obtenidos:", egresos.length);

      // 📌 7. Generar y guardar PDF
      await generarReportePDF(insertedArqueo, recibos, egresos);
      console.log("📄 PDF generado y guardado en Supabase Storage");

      Alert.alert("Éxito", "Arqueo registrado y PDF generado correctamente");
    } catch (e) {
      console.error("❌ Error en realizarArqueo:", e);
      Alert.alert("Error al calcular arqueo", e.message);
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
          Calcular, Guardar y Generar PDF
        </Button>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  input: {
    marginBottom: 16,
  },
});
