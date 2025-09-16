import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, IconButton, FAB, Provider as PaperProvider } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DeleteButton from './components/DeleteButoon';
import EditButton from './components/EditButton';

export default function RecibosScreen() {
  const navigation = useNavigation();
  const [recibos, setRecibos] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const cargarDatos = async () => {
    const { data: ingresos, error: errorRecibos } = await supabase
      .from('recibos')
      .select('*');

    const { data: egresos, error: errorEgresos } = await supabase
      .from('egresos')
      .select('*');

    if (errorRecibos || errorEgresos) {
      console.log('Error cargando datos', errorRecibos || errorEgresos);
      return;
    }

    // Identificamos de qué tabla vienen
    const ingresosConTipo = ingresos.map(r => ({ ...r, tipo: 'Ingreso' }));
    const egresosConTipo = egresos.map(e => ({ ...e, tipo: 'Egreso' }));

    // Unimos y ordenamos por created_at
    const todos = [...ingresosConTipo, ...egresosConTipo].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setRecibos(todos);
  };

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.title}>Lista de Recibos y Egresos</Text>

        {recibos.map((recibo) => (
          <Card
            key={recibo.id}
            style={[
              styles.card,
              recibo.tipo === 'Ingreso' ? styles.cardIngreso : styles.cardEgreso
            ]}
          >
            <Card.Title
              title={recibo.nombre || 'Sin descripción'}
              subtitle={`${recibo.tipo} - Total: ${recibo.totalrcb} - Fecha: ${recibo.fecha}`}
              right={() => (
                <View style={styles.iconContainer}>
                  <IconButton
                    icon={expandedId === recibo.id ? 'chevron-up' : 'chevron-down'}
                    onPress={() => toggleExpand(recibo.id)}
                    style={styles.iconButton}
                  />
                  <DeleteButton
                    id={recibo.id}
                    resource={recibo.tipo === 'Ingreso' ? 'recibos' : 'egresos'}
                    onDeleted={(deletedId) =>
                      setRecibos((prev) => prev.filter((item) => item.id !== deletedId))
                    }
                  />
                  <EditButton
                    id={recibo.id}
                    resource={recibo.tipo === 'Ingreso' ? 'recibos' : 'egresos'}
                    data={recibo}
                  />
                </View>
              )}
            />
            {expandedId === recibo.id && (
              <Card.Content>
                <Text variant="bodyMedium">Diezmo: {recibo.diezmo}</Text>
                <Text variant="bodyMedium">Primicia: {recibo.primicia || 'N/A'}</Text>
              </Card.Content>
            )}
          </Card>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('RecibosForm')}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    borderWidth: 2, // 👈 borde visible
    borderRadius: 8,
  },
  cardIngreso: {
    borderColor: 'green', // 👈 borde verde si es Ingreso
  },
  cardEgreso: {
    borderColor: 'red', // 👈 borde rojo si es Egreso
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 0,
    margin: 0,
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
