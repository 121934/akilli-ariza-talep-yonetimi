
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatusBadge({ durum }) {
  const renkler = {
    Bekliyor: {
      arkaPlan: '#FFF0D9',
      yazi: '#C47A16',
    },
    İşlemde: {
      arkaPlan: '#E2EAFE',
      yazi: '#4169B2',
    },
    Çözüldü: {
      arkaPlan: '#DDF5E5',
      yazi: '#27834B',
    },
  };

  const renk = renkler[durum] || renkler.Bekliyor;

  return (
    <View style={[styles.rozet, { backgroundColor: renk.arkaPlan }]}>
      <Text style={[styles.yazi, { color: renk.yazi }]}>
        {durum}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rozet: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  yazi: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
