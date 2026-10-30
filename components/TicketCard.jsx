
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import StatusBadge from './StatusBadge';

export default function TicketCard({ ticket }) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.kart}
      onPress={() =>
        router.push(`/ariza/${ticket.id}`)
      }
    >
      <View style={styles.ustSatir}>
        <Text style={styles.baslik}>
          {ticket.baslik}
        </Text>

        <StatusBadge durum={ticket.durum} />
      </View>

      <Text style={styles.id}>
        {ticket.id}
      </Text>

      <View style={styles.altSatir}>
        <Text style={styles.birim}>
          {ticket.birim}
        </Text>

        <Text style={styles.oncelik}>
          {ticket.oncelik} Öncelik
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kart: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAE4F5',
    elevation: 2,
  },
  ustSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  baslik: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#403452',
    flex: 1,
  },
  id: {
    color: '#9990A8',
    fontSize: 12,
    marginTop: 8,
  },
  altSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  birim: {
    color: '#756987',
    fontSize: 12,
  },
  oncelik: {
    color: '#756987',
    fontSize: 12,
    fontWeight: '600',
  },
});
