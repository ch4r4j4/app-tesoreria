// ArqueosFormScreen.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Text, Button, Provider as PaperProvider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../lib/supabase";
import { generarReportePDF } from "../utils/pdfReportGenerator";

export default function ArqueoScreen() {
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [saldoInicial, setSaldoInicial] = useState(0);

  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);

  // 🔧 Función para formatear fecha YYYY-MM-DD
  const formatDate = (date) => date.toLocaleDateString("en-CA");

  // Al montar la pantalla, traer último arqueo
  useEffect(() => {
    const fetchLastArqueo = async () => {
      const { data: lastArqueo, error } = await supabase
        .from("arqueos")
        .select("*")
        .order("fecha_fin", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.log("ℹ️ No hay arqueos previos, se inicia en 0");
        return;
      }

      if (lastArqueo) {
        // saldo inicial = saldo final del último arqueo
        setSaldoInicial(lastArqueo.saldo_final || 0);

        // fecha inicio = día siguiente al último arqueo
        const nextDay = new Date(lastArqueo.fecha_fin);
        nextDay.setDate(nextDay.getDate() + 1);
        setFechaInicio(nextDay);
      }
    };

    fetchLastArqueo();
  }, []);

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

      console.log("⏳ Fechas:", fechaInicioStr, fechaFinStr);

      // 📌 1. Traer recibos del rango
      const { data: recibos, error: errorRecibos } = await supabase
        .from("recibos")
        .select("*")
        .gte("fecha", fechaInicioStr)
        .lte("fecha", fechaFinStr);

      if (errorRecibos) throw errorRecibos;

      // 📌 2. Calcular totales de ingresos
      let totales = {
        primicia: 0, diezmo: 0, pobres: 0, agradecimiento: 0,
        escsab: 0, jovenes: 0, adolescentes: 0, ninos: 0,
        educacion: 0, salud: 0, obramis: 0, musica: 0,
        renuevatv: 0, primersab: 0, semorac: 0, misextranj: 0,
        construccion: 0, diversos: 0, sub: 0,
      };

      recibos.forEach((r) => {
        totales.primicia += r.primicia || 0;
        totales.diezmo += r.diezmo || 0;
        totales.pobres += r.pobres || 0;
        totales.agradecimiento += r.agradecimiento || 0;
        totales.escsab += r.esc_sabatica || 0;
        totales.jovenes += r.jovenes || 0;
        totales.adolescentes += r.adolescentes || 0;
        totales.ninos += r.ninos || 0;
        totales.educacion += r.educacion || 0;
        totales.salud += r.salud || 0;
        totales.obramis += r.obra_mis || 0;
        totales.musica += r.musica || 0;
        totales.renuevatv += r.renuevatv || 0;
        totales.primersab += r.primer_sabado || 0;
        totales.semorac += r.sem_oracion || 0;
        totales.misextranj += r.mis_extranj || 0;
        totales.construccion += r.construccion || 0;
        totales.diversos += r.diversos || 0;
        totales.sub += r.totalrcb || 0;
      });

      // 📌 3. Traer egresos del rango
      const { data: egresos, error: errorEgresos } = await supabase
        .from("egresos")
        .select("*")
        .gte("fecha", fechaInicioStr)
        .lte("fecha", fechaFinStr);

      if (errorEgresos) throw errorEgresos;

      const totalEgresos = egresos.reduce((acc, e) => acc + (e.totalrcb || 0), 0);

      // 📌 4. Calcular saldo final
      const saldoFinal = saldoInicial + totales.sub - totalEgresos;

      // 📌 5. Insertar arqueo en la tabla
      const { data: inserted, error: arqueoError } = await supabase
        .from("arqueos")
        .insert({
          fecha_inicio: fechaInicioStr,
          fecha_fin: fechaFinStr,
          total_primicia: totales.primicia,
          total_diezmo: totales.diezmo,
          total_pobres: totales.pobres,
          total_agradecimiento: totales.agradecimiento,
          total_escsab: totales.escsab,
          total_jovenes: totales.jovenes,
          total_adolescentes: totales.adolescentes,
          total_ninos: totales.ninos,
          total_educacion: totales.educacion,
          total_salud: totales.salud,
          total_obramis: totales.obramis,
          total_musica: totales.musica,
          total_renuevatv: totales.renuevatv,
          total_primersab: totales.primersab,
          total_semorac: totales.semorac,
          total_misextranj: totales.misextranj,
          total_construccion: totales.construccion,
          total_diversos: totales.diversos,
          total_sub: totales.sub,
          saldo_inicial: saldoInicial,
          saldo_final: saldoFinal,
        })
        .select();

      if (arqueoError) throw arqueoError;

      // 📌 6. Generar y subir PDF
      await generarReportePDF(inserted[0], recibos, egresos);

      Alert.alert("Éxito", "Arqueo registrado y PDF generado correctamente");
    } catch (e) {
      console.error("❌ Error en realizarArqueo:", e);
      Alert.alert("Error", e.message || "Ocurrió un problema");
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge">Arqueo de Caja</Text>
        <Text style={{ marginBottom: 10 }}>Saldo inicial: S/. {saldoInicial.toFixed(2)}</Text>

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
