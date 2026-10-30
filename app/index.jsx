
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.ustBaslik}>
          BİLGİ İŞLEM DAİRE BAŞKANLIĞI
        </Text>

        <Text style={styles.baslik}>
          Teknik Destek
        </Text>

        <Text style={styles.altBaslik}>
          Arıza Takip Sistemi
        </Text>
      </View>

      <View style={styles.kart}>
        <Text style={styles.kartBaslik}>
          Hoş Geldiniz!
        </Text>

        <Text style={styles.aciklama}>
          Teknik destek taleplerinizi görüntüleyebilir
          veya yeni bir arıza kaydı oluşturabilirsiniz.
        </Text>

        <Pressable
          style={styles.buton}
          onPress={() => router.push('/arizalar')}
        >
          <Text style={styles.butonYazi}>
            Arıza Listesi →
          </Text>
        </Pressable>

        <Pressable
          style={styles.ikincilButon}
          onPress={() => router.push('/yeni-ariza')}
        >
          <Text style={styles.ikincilButonYazi}>
            + Yeni Arıza Oluştur
          </Text>
        </Pressable>

        <Pressable
          style={styles.panelButon}
          onPress={() => router.push('/panel')}
        >
          <Text style={styles.panelYazi}>
            Eski Teknik Destek Panelini Aç
          </Text>
        </Pressable>
      </View>

      <Text style={styles.altBilgi}>
        Teknik Destek Yönetim Sistemi
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4FC',
    justifyContent: 'center',
    padding: 22,
  },
  header: {
    alignItems: 'center',
    marginBottom: 35,
  },
  ustBaslik: {
    color: '#8065A8',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  baslik: {
    color: '#403452',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
  },
  altBaslik: {
    color: '#8A8197',
    fontSize: 17,
    marginTop: 5,
  },
  kart: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EAE4F5',
  },
  kartBaslik: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#403452',
    marginBottom: 12,
  },
  aciklama: {
    color: '#8A8197',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 25,
  },
  buton: {
    backgroundColor: '#8065A8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  butonYazi: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  ikincilButon: {
    backgroundColor: '#EEE8F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ikincilButonYazi: {
    color: '#8065A8',
    fontSize: 15,
    fontWeight: 'bold',
  },
  panelButon: {
    marginTop: 18,
    alignItems: 'center',
  },
  panelYazi: {
    color: '#8A8197',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  altBilgi: {
    textAlign: 'center',
    color: '#A69BB5',
    fontSize: 12,
    marginTop: 30,
  },
});
