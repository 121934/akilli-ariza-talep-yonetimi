
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useTickets } from '../../context/TicketContext';
import StatusBadge from '../../components/StatusBadge';

export default function ArizaDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tickets } = useTickets();

  const ticket = tickets.find(
    (item) => item.id === id
  );

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Text style={styles.hataBaslik}>
          Arıza bulunamadı!
        </Text>

        <Text style={styles.aciklama}>
          Aradığınız arıza kaydı sistemde bulunmuyor.
        </Text>

        <Pressable
          style={styles.buton}
          onPress={() => router.back()}
        >
          <Text style={styles.butonYazi}>
            Geri Dön
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={styles.geriButonu}
      >
        <Text style={styles.geriYazi}>← Arıza Listesine Dön</Text>
      </Pressable>

      <Text style={styles.baslik}>Arıza Detayı</Text>

      <View style={styles.kart}>
        <Text style={styles.id}>{ticket.id}</Text>

        <Text style={styles.arizaBaslik}>
          {ticket.baslik}
        </Text>

        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>Durum</Text>
          <StatusBadge durum={ticket.durum} />
        </View>

        <View style={styles.cizgi} />

        <Text style={styles.etiket}>Açıklama</Text>
        <Text style={styles.deger}>
          {ticket.aciklama}
        </Text>

        <View style={styles.cizgi} />

        <Text style={styles.etiket}>Birim / Konum</Text>
        <Text style={styles.deger}>
          {ticket.birim}
        </Text>

        <View style={styles.cizgi} />

        <Text style={styles.etiket}>Kategori</Text>
        <Text style={styles.deger}>
          {ticket.kategori}
        </Text>

        <View style={styles.cizgi} />

        <Text style={styles.etiket}>Öncelik</Text>
        <Text style={styles.deger}>
          {ticket.oncelik}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4FC',
    padding: 20,
    paddingTop: 60,
  },
  geriButonu: {
    marginBottom: 22,
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
    marginBottom: 20,
  },
  kart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EAE4F5',
  },
  id: {
    color: '#9489A5',
    fontSize: 13,
    marginBottom: 10,
  },
  arizaBaslik: {
    color: '#403452',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 22,
  },
  bilgiSatiri: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etiket: {
    color: '#8A8197',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  deger: {
    color: '#403452',
    fontSize: 15,
    lineHeight: 23,
  },
  cizgi: {
    height: 1,
    backgroundColor: '#EEE9F5',
    marginVertical: 17,
  },
  hataBaslik: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#403452',
    marginBottom: 10,
  },
  aciklama: {
    color: '#8A8197',
    fontSize: 14,
    marginBottom: 20,
  },
  buton: {
    backgroundColor: '#8065A8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  butonYazi: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
