import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, IconButton, FAB, Provider as PaperProvider } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { generarReportePDF } from '../utils/pdfReportGenerator';
import ExpandButton from './components/ExpandButton';

export default function CardsScreen() {
  const navigation = useNavigation();
  const [arqueos, setArqueos] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const [visibleMenuId, setVisibleMenuId] = useState(null);

  const openMenu = (id) => setVisibleMenuId(id);
  const closeMenu = () => setVisibleMenuId(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const cargarArqueos = async () => {
    const { data, error } = await supabase
      .from('arqueos')
      .select('*')
      .order('fecha_fin', { ascending: false });

    if (!error) {
      setArqueos(data);
    }else{
      console.log("error al cargar los datos", error.message)
    }
  };

  useEffect(() => {
    cargarArqueos();
  }, []);

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.title}>Lista de Arqueos</Text>
        {arqueos.map((arqueo) => (
          <Card key={arqueo.id} style={styles.card}>
            <Card.Title
              title={arqueo.total_ninos || 'Sin descripción'}
              subtitle={`Monto: S/. ${arqueo.total_sub} - Fecha: ${arqueo.fecha_inicio}`}
              right={() => (
                <View style={styles.iconContainer}>
                  <ExpandButton
                    arqueoId={arqueo.id}
                    expandedId={expandedId}
                    onToggle={toggleExpand}
                  />
                  <IconButton
                    icon="file-pdf-box"
                    iconColor="red"
                    size={24}
                    style={styles.iconButton}
                    onPress={async () => {
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

                      // Generar el PDF con los tres argumentos
                      await generarReportePDF(arqueo, recibos, egresos);
                    }}
                    accessibilityLabel="Generar PDF"
                  />
                  <IconButton
                    icon="delete"
                    iconColor="red"
                    onPress={() => console.log('Eliminar', recibo.id)}
                    style={styles.iconButton}
                  />

                  {/* Botón editar/actualizar */}
                  <IconButton
                    icon="pencil"
                    iconColor="blue"
                    onPress={() => console.log('Editar', recibo.id)}
                    style={styles.iconButton}
                  />
                </View>
              )}
            />
            {expandedId === arqueo.id && (
              <Card.Content>
                <Text variant="bodyMedium">Tipo: {arqueo.total_jovenes}</Text>
                <Text variant="bodyMedium">Descripción: {arqueo.total_educacion || 'N/A'}</Text>
              </Card.Content>
            )}
          </Card>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('ArqueosForm')}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100
  },
  title: {
    marginBottom: 16
  },
  card: {
    marginBottom: 12
  },
  iconContainer: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
  avatar: {
    backgroundColor: '#b39ddb',
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20
  }
});
