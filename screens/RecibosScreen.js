import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, IconButton, FAB, Provider as PaperProvider } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import DeleteButton from './components/DeleteButoon';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import EditButton from './components/EditButton';

export default function RecibosScreen() {
  const navigation = useNavigation();
  const [recibos, setRecibos] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const cargarRecibos = async () => {
    const { data, error } = await supabase
      .from('recibos')
      .select('*')
      .order('fecha', { ascending: false });

    if (!error) {
      setRecibos(data);
    }
  };

  useFocusEffect(
  useCallback(() => {
      cargarRecibos();
    }, [])
  );

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.title}>Lista de Recibos</Text>

        {recibos.map((recibo) => (
          <Card key={recibo.id} style={styles.card}>
            <Card.Title
              title={recibo.nombre || 'Sin descripción'}
              subtitle={`Nombre ${recibo.totalrcb} - Fecha: ${recibo.fecha}`}
              right={() => (
                <View style={styles.iconContainer}>
                  {/* Botón expandir/cerrar */}
                  <IconButton
                    icon={expandedId === recibo.id ? 'chevron-up' : 'chevron-down'}
                    onPress={() => toggleExpand(recibo.id)}
                    style={styles.iconButton}
                  />
                  <DeleteButton
                    id={recibo.id}
                    resource="recibos"
                    onDeleted={(deletedId) =>
                      setRecibos((prev) => prev.filter((item) => item.id !== deletedId))
                    }
                  />
                  {/* Botón editar/actualizar */}
                  <EditButton  />
                </View>
              )}
            />
            {expandedId === recibo.id && (
              <Card.Content>
                <Text variant="bodyMedium">Diezmo: {recibo.diezmo}</Text>
                <Text variant="bodyMedium">Descripción: {recibo.primicia || 'N/A'}</Text>
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
    padding:0,
    margin:0
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
