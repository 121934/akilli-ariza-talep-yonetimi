
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';

import { useTickets } from '../context/TicketContext';
import TicketCard from '../components/TicketCard';

export default function Arizalar() {
  const router = useRouter();
  const { tickets } = useTickets();

  return (
    <View style={styles.container}>
      <View style={styles.baslikAlani}>
        <Pressable
          onPress={() => router.back()}
          style={styles.geriButonu}
        >
          <Text style={styles.geriYazi}>← Geri</Text>
        </Pressable>

        <Text style={styles.baslik}>Arıza Listesi</Text>
        <Text style={styles.aciklama}>
          Sistemde kayıtlı destek talepleri
        </Text>
      </View>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TicketCard ticket={item} />
        )}
        contentContainerStyle={styles.liste}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4FC',
    paddingTop: 55,
  },
  baslikAlani: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  geriButonu: {
    marginBottom: 18,
  },
  geriYazi: {
    color: '#8065A8',
    fontSize: 15,
    fontWeight: '600',
  },
  baslik: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#403452',
  },
  aciklama: {
    color: '#8A8197',
    fontSize: 14,
    marginTop: 6,
  },
  liste: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});
