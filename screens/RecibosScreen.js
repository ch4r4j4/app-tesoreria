import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, IconButton, List, FAB, Provider as PaperProvider } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { Modal, Portal } from 'react-native-paper';
import RecibosModal from './RecibosModal';


export default function RecibosScreen() {
  const [recibos, setRecibos] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // nuevo estado

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const cargarRecibos = async () => {
    const { data, error } = await supabase.from('Recibos').select('*').order('fecha', { ascending: false });
    if (!error) {
      setRecibos(data);
    }
  };

  useEffect(() => {
    cargarRecibos();
  }, []);

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.title}>Lista de Recibos</Text>

        {recibos.map((recibo) => (
          <Card key={recibo.id} style={styles.card}>
            <Card.Title
              title={recibo.descripcion || 'Sin descripción'}
              subtitle={`Monto: S/. ${recibo.monto} - Fecha: ${recibo.fecha}`}
              left={() => <View style={styles.avatar} />}
              right={() => (
                <View style={styles.iconContainer}>
                  <IconButton
                    icon={expandedId === recibo.id ? 'chevron-up' : 'chevron-down'}
                    onPress={() => toggleExpand(recibo.id)}
                  />
                  <IconButton
                    icon="dots-vertical"
                    onPress={() => console.log('Editar', recibo.id)}
                  />
                </View>
              )}
            />
            {expandedId === recibo.id && (
              <Card.Content>
                <Text variant="bodyMedium">Tipo: {recibo.tipo}</Text>
                <Text variant="bodyMedium">Descripción: {recibo.descripcion || 'N/A'}</Text>
              </Card.Content>
            )}
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalWrapper}
        >
          <RecibosModal
            onClose={() => setModalVisible(false)}
            onSaved={cargarRecibos}
          />
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
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
    flexDirection: 'row'
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
  },
  modalWrapper: {
  backgroundColor: 'white',
  margin: 20,
  borderRadius: 10,
  padding: 20
  },
});
