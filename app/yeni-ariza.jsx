
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTickets } from '../context/TicketContext';

export default function YeniAriza() {
  const router = useRouter();
  const { setTickets } = useTickets();

  const [baslik, setBaslik] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [birim, setBirim] = useState('');
  const [kategori, setKategori] = useState('Bilgisayar');
  const [oncelik, setOncelik] = useState('Orta');

  const arizaOlustur = () => {
    if (!baslik.trim() || !aciklama.trim() || !birim.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const yeniKayit = {
      id: `TLP-${Date.now()}`,
      baslik: baslik.trim(),
      aciklama: aciklama.trim(),
      birim: birim.trim(),
      kategori,
      oncelik,
      durum: 'Bekliyor',
    };

    setTickets((onceki) => [yeniKayit, ...onceki]);

    Alert.alert('Başarılı', 'Yeni arıza kaydı oluşturuldu.', [
      {
        text: 'Tamam',
        onPress: () => router.replace('/arizalar'),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.geri}>← Geri</Text>
      </Pressable>

      <Text style={styles.baslik}>Yeni Arıza Oluştur</Text>
      <Text style={styles.aciklama}>
        Teknik destek talebinizi aşağıdaki formdan oluşturabilirsiniz.
      </Text>

      <View style={styles.form}>
        <Text style={styles.etiket}>Arıza Başlığı</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: Bilgisayar açılmıyor"
          value={baslik}
          onChangeText={setBaslik}
        />

        <Text style={styles.etiket}>Açıklama</Text>
        <TextInput
          style={[styles.input, styles.buyukInput]}
          placeholder="Arızayı açıklayınız..."
          value={aciklama}
          onChangeText={setAciklama}
          multiline
        />

        <Text style={styles.etiket}>Birim / Konum</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: Öğrenci İşleri"
          value={birim}
          onChangeText={setBirim}
        />

        <Text style={styles.etiket}>Kategori</Text>
        <View style={styles.secimAlani}>
          {['Bilgisayar', 'Yazıcı', 'İnternet', 'Yazılım'].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.secim,
                kategori === item && styles.secili,
              ]}
              onPress={() => setKategori(item)}
            >
              <Text
                style={[
                  styles.secimYazi,
                  kategori === item && styles.seciliYazi,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.etiket}>Öncelik</Text>
        <View style={styles.secimAlani}>
          {['Düşük', 'Orta', 'Yüksek'].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.secim,
                oncelik === item && styles.secili,
              ]}
              onPress={() => setOncelik(item)}
            >
              <Text
                style={[
                  styles.secimYazi,
                  oncelik === item && styles.seciliYazi,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.buton} onPress={arizaOlustur}>
          <Text style={styles.butonYazi}>Arıza Kaydı Oluştur</Text>
        </Pressable>
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
  geri: {
    color: '#8065A8',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 22,
  },
  baslik: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#403452',
  },
  aciklama: {
    fontSize: 14,
    color: '#8A8197',
    marginTop: 8,
    marginBottom: 22,
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 30,
  },
  etiket: {
    fontSize: 14,
    fontWeight: '600',
    color: '#554767',
    marginBottom: 9,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F8F6FB',
    borderWidth: 1,
    borderColor: '#EAE4F5',
    borderRadius: 11,
    padding: 13,
    fontSize: 14,
    color: '#403452',
  },
  buyukInput: {
    height: 110,
    textAlignVertical: 'top',
  },
  secimAlani: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  secim: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: '#F3EFF8',
    borderRadius: 10,
  },
  secili: {
    backgroundColor: '#8065A8',
  },
  secimYazi: {
    color: '#665879',
    fontSize: 13,
  },
  seciliYazi: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buton: {
    backgroundColor: '#8065A8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  butonYazi: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
