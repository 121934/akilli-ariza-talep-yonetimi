
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  TextInput,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

// 1. RENK PALETİ
const RENK = {
  arkaPlan: '#FAF7FF',
  beyaz: '#FFFFFF',
  acikLila: '#F3E8FF',
  lila: '#E9D5FF',
  ortaLila: '#D8B4FE',
  mor: '#8B5CF6',
  koyuMor: '#6B21A8',
  koyuYazi: '#302044',
  ikincilYazi: '#81738F',
  kenarlik: '#E9DDF5',
  yesil: '#16A34A',
  turuncu: '#D97706',
  kirmizi: '#DC2626',
  mavi: '#6366F1'
};

// 2. ÖRNEK TALEPLER
const baslangicTalepleri = [
  {
    id: 'TLP-1001',
    baslik: 'Bilgisayar açılmıyor',
    aciklama: 'Bilgisayar açma düğmesine basıldığında tepki vermiyor.',
    kategori: 'Bilgisayar',
    birim: 'Öğrenci İşleri',
    oncelik: 'Yüksek',
    durum: 'Bekliyor'
  },
  {
    id: 'TLP-1002',
    baslik: 'Yazıcı bağlantı sorunu',
    aciklama: 'Yazıcı bilgisayara bağlanamıyor.',
    kategori: 'Yazıcı',
    birim: 'Personel Daire Başkanlığı',
    oncelik: 'Orta',
    durum: 'İşlemde'
  },
  {
    id: 'TLP-1003',
    baslik: 'İnternet bağlantısı kesildi',
    aciklama: 'Birimdeki bilgisayarlarda internet bağlantısı yok.',
    kategori: 'İnternet',
    birim: 'Kütüphane',
    oncelik: 'Yüksek',
    durum: 'Bekliyor'
  },
  {
    id: 'TLP-1004',
    baslik: 'Ofis yazılımı hata veriyor',
    aciklama: 'Ofis programı açılırken hata mesajı gösteriyor.',
    kategori: 'Yazılım',
    birim: 'Muhasebe',
    oncelik: 'Düşük',
    durum: 'Tamamlandı'
  },
  {
    id: 'TLP-1005',
    baslik: 'Bilgisayar çok yavaş',
    aciklama: 'Bilgisayar uygulamaları yavaş açılıyor.',
    kategori: 'Bilgisayar',
    birim: 'Mühendislik Fakültesi',
    oncelik: 'Orta',
    durum: 'İşlemde'
  },
  {
    id: 'TLP-1006',
    baslik: 'Yazıcı kağıt sıkıştırıyor',
    aciklama: 'Yazdırma sırasında kağıt sıkışması yaşanıyor.',
    kategori: 'Yazıcı',
    birim: 'Rektörlük',
    oncelik: 'Düşük',
    durum: 'Tamamlandı'
  },
  {
    id: 'TLP-1007',
    baslik: 'Kablosuz ağ çalışmıyor',
    aciklama: 'Kablosuz ağa bağlantı kurulamıyor.',
    kategori: 'İnternet',
    birim: 'Merkezi Derslikler',
    oncelik: 'Yüksek',
    durum: 'Bekliyor'
  },
  {
    id: 'TLP-1008',
    baslik: 'Program lisans sorunu',
    aciklama: 'Program lisans etkinleştirme hatası veriyor.',
    kategori: 'Yazılım',
    birim: 'Bilgi İşlem',
    oncelik: 'Orta',
    durum: 'İşlemde'
  }
];

// 3. FİLTRELER
const durumFiltreleri = [
  'Tümü',
  'Bekliyor',
  'İşlemde',
  'Tamamlandı'
];

const oncelikFiltreleri = [
  'Tümü',
  'Düşük',
  'Orta',
  'Yüksek'
];

const oncelikRengi = (oncelik) => {
  if (oncelik === 'Yüksek') return RENK.kirmizi;
  if (oncelik === 'Orta') return RENK.turuncu;
  return RENK.yesil;
};

const durumRengi = (durum) => {
  if (durum === 'Bekliyor') return RENK.turuncu;
  if (durum === 'İşlemde') return RENK.mavi;
  return RENK.yesil;
};

const kategoriIkonu = (kategori) => {
  if (kategori === 'Bilgisayar') return 'laptop';
  if (kategori === 'Yazıcı') return 'printer';
  if (kategori === 'İnternet') return 'wifi';
  if (kategori === 'Yazılım') return 'application-cog-outline';
  return 'tools';
};

// 4. ÖZET KARTI
function OzetKarti({ baslik, sayi, renk, ikon, genislik }) {
  return (
    <View style={[styles.summaryCard, { width: genislik }]}>
      <View style={styles.summaryTop}>
        <View
          style={[
            styles.summaryIconBox,
            { backgroundColor: renk + '18' }
          ]}
        >
          <MaterialCommunityIcons
            name={ikon}
            size={23}
            color={renk}
          />
        </View>

        <View
          style={[
            styles.summaryIndicator,
            { backgroundColor: renk }
          ]}
        />
      </View>

      <Text style={[styles.summaryNumber, { color: renk }]}>
        {sayi}
      </Text>
      <Text style={styles.summaryLabel}>{baslik}</Text>
    </View>
  );
}

// 5. FİLTRE BUTONU
function FiltreButonu({ baslik, secili, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.filterButton,
        secili && styles.activeFilter
      ]}
    >
      {secili && (
        <MaterialCommunityIcons
          name="check-circle"
          size={15}
          color={RENK.beyaz}
        />
      )}

      <Text
        style={[
          styles.filterText,
          secili && styles.activeFilterText
        ]}
      >
        {baslik}
      </Text>
    </Pressable>
  );
}

// 6. TALEP KARTI
function TalepKarti({
  talep,
  acikDetay,
  onDetayDegistir,
  onDurumDegistir,
  onTalepSil
}) {
  const tamamlandi = talep.durum === 'Tamamlandı';
  const oncelikRenk = oncelikRengi(talep.oncelik);
  const durumRenk = durumRengi(talep.durum);

  return (
    <View style={styles.ticketCard}>
      <Pressable
        onPress={onDetayDegistir}
        onLongPress={() => onTalepSil(talep)}
        delayLongPress={500}
        style={({ pressed }) => [
          styles.ticketPressable,
          pressed && styles.cardPressed
        ]}
      >
        <View style={styles.ticketTop}>
          <View style={styles.ticketIdContainer}>
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={17}
              color={RENK.mor}
            />
            <Text style={styles.ticketId}>{talep.id}</Text>
          </View>

          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: oncelikRenk + '18' }
            ]}
          >
            <View
              style={[
                styles.priorityDot,
                { backgroundColor: oncelikRenk }
              ]}
            />
            <Text
              style={[
                styles.priorityText,
                { color: oncelikRenk }
              ]}
            >
              {talep.oncelik}
            </Text>
          </View>
        </View>

        <View style={styles.ticketTitleRow}>
          <View style={styles.categoryIconBox}>
            <MaterialCommunityIcons
              name={kategoriIkonu(talep.kategori)}
              size={24}
              color={RENK.koyuMor}
            />
          </View>

          <View style={styles.ticketTitleArea}>
            <Text style={styles.ticketTitle}>
              {talep.baslik}
            </Text>

            <Text style={styles.ticketDetail}>
              {talep.kategori} • {talep.birim}
            </Text>
          </View>
        </View>

        <View style={styles.ticketBottom}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: durumRenk + '18' }
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: durumRenk }
              ]}
            >
              {talep.durum}
            </Text>
          </View>

          <View style={styles.detailHint}>
            <Text style={styles.detailHintText}>
              {acikDetay ? 'Detayı gizle' : 'Detayları gör'}
            </Text>
            <MaterialCommunityIcons
              name={acikDetay ? 'chevron-up' : 'chevron-down'}
              size={19}
              color={RENK.mor}
            />
          </View>
        </View>

        <Text style={styles.longPressHint}>
          Silmek için talebe uzun bas
        </Text>
      </Pressable>

      {acikDetay && (
        <View style={styles.detailPanel}>
          <View style={styles.detailHeader}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={19}
              color={RENK.koyuMor}
            />
            <Text style={styles.detailHeaderText}>
              Talep Detayları
            </Text>
          </View>

          <DetaySatiri etiket="Talep numarası" deger={talep.id} />
          <DetaySatiri etiket="Arıza başlığı" deger={talep.baslik} />
          <DetaySatiri etiket="Kategori" deger={talep.kategori} />
          <DetaySatiri etiket="Birim" deger={talep.birim} />
          <DetaySatiri
            etiket="Açıklama"
            deger={talep.aciklama || 'Açıklama girilmemiş.'}
          />
          <DetaySatiri
            etiket="Öncelik"
            deger={talep.oncelik}
            renk={oncelikRenk}
          />
          <DetaySatiri
            etiket="Durum"
            deger={talep.durum}
            renk={durumRenk}
            son
          />
        </View>
      )}

      <View style={styles.actionArea}>
        {!tamamlandi ? (
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed
            ]}
            onPress={() => onDurumDegistir(talep.id)}
          >
            <MaterialCommunityIcons
              name={
                talep.durum === 'Bekliyor'
                  ? 'play-circle-outline'
                  : 'check-circle-outline'
              }
              size={19}
              color={RENK.beyaz}
            />

            <Text style={styles.actionText}>
              {talep.durum === 'Bekliyor'
                ? 'İşleme Al'
                : 'Tamamla'}
            </Text>
          </Pressable>
        ) : (
          <View style={styles.completedContainer}>
            <MaterialCommunityIcons
              name="check-circle"
              size={17}
              color={RENK.yesil}
            />
            <Text style={styles.completedText}>
              İşlem tamamlandı
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function DetaySatiri({ etiket, deger, renk, son }) {
  return (
    <View style={[styles.detailRow, son && styles.lastDetailRow]}>
      <Text style={styles.detailLabel}>{etiket}</Text>
      <Text
        style={[
          styles.detailValue,
          renk ? { color: renk } : null
        ]}
      >
        {deger}
      </Text>
    </View>
  );
}

// 7. ANA YÖNETİM PANELİ
function TeknikDestekPaneli() {
  const [talepler, setTalepler] = useState(baslangicTalepleri);
  const [aktifDurumFiltresi, setAktifDurumFiltresi] = useState('Tümü');
  const [aktifOncelikFiltresi, setAktifOncelikFiltresi] = useState('Tümü');
  const [acikTalepId, setAcikTalepId] = useState(null);

  // YENİ: ARAMA METNİ
  const [aramaMetni, setAramaMetni] = useState('');

  const [formAcik, setFormAcik] = useState(false);
  const [baslik, setBaslik] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [kategori, setKategori] = useState('Bilgisayar');
  const [birim, setBirim] = useState('');
  const [oncelik, setOncelik] = useState('Orta');

  const { width } = useWindowDimensions();
  const sutunSayisi = width >= 700 ? 4 : 2;
  const yatayBosluk = 40;
  const kartAraligi = 12;

  const kartGenisligi =
    (width - yatayBosluk - kartAraligi * (sutunSayisi - 1)) /
    sutunSayisi;

  // ÖZET SAYILARI
  const toplam = talepler.length;

  const bekleyen = talepler.filter(
    item => item.durum === 'Bekliyor'
  ).length;

  const islemde = talepler.filter(
    item => item.durum === 'İşlemde'
  ).length;

  const tamamlanan = talepler.filter(
    item => item.durum === 'Tamamlandı'
  ).length;

  // FİLTRELEME, SIRALAMA VE YAZDIKÇA ARAMA
  const oncelikSirasi = {
    'Yüksek': 1,
    'Orta': 2,
    'Düşük': 3
  };

  const filtreliTalepler = [...talepler]
    .sort(
      (a, b) => oncelikSirasi[a.oncelik] - oncelikSirasi[b.oncelik]
    )
    .filter((item) => {
      const durumUygun =
        aktifDurumFiltresi === 'Tümü' ||
        item.durum === aktifDurumFiltresi;

      const oncelikUygun =
        aktifOncelikFiltresi === 'Tümü' ||
        item.oncelik === aktifOncelikFiltresi;

      // YENİ: BAŞLIĞA GÖRE ARAMA
      const aramaUygun = item.baslik
        .toLocaleLowerCase('tr-TR')
        .includes(
          aramaMetni.trim().toLocaleLowerCase('tr-TR')
        );

      return durumUygun && oncelikUygun && aramaUygun;
    });

  // DETAY AÇMA VE KAPATMA
  const detayDegistir = (id) => {
    setAcikTalepId(oncekiId => oncekiId === id ? null : id);
  };

  // DURUM GÜNCELLEME
  const durumDegistir = (id) => {
    setTalepler(oncekiTalepler =>
      oncekiTalepler.map(talep => {
        if (talep.id !== id) return talep;

        let yeniDurum;

        if (talep.durum === 'Bekliyor') {
          yeniDurum = 'İşlemde';
        } else if (talep.durum === 'İşlemde') {
          yeniDurum = 'Tamamlandı';
        } else {
          yeniDurum = 'Tamamlandı';
        }

        return { ...talep, durum: yeniDurum };
      })
    );
  };

  // TALEP SİLME VE ONAY
  const talepSil = (talep) => {
    Alert.alert(
      'Talebi Sil',
      `"${talep.baslik}" başlıklı talebi silmek istediğine emin misin?`,
      [
        {
          text: 'Vazgeç',
          style: 'cancel'
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            setTalepler(oncekiTalepler =>
              oncekiTalepler.filter(item => item.id !== talep.id)
            );

            if (acikTalepId === talep.id) {
              setAcikTalepId(null);
            }

            Alert.alert('Silindi', 'Talep başarıyla silindi.');
          }
        }
      ]
    );
  };

  // YENİ TALEP KAYDETME
  const talepKaydet = () => {
    if (!baslik.trim() || !aciklama.trim()) {
      Alert.alert(
        'Eksik Bilgi',
        'Lütfen talep başlığını ve açıklamasını girin.'
      );
      return;
    }

    const yeniTalep = {
      id: `TLP-${Date.now()}`,
      baslik: baslik.trim(),
      aciklama: aciklama.trim(),
      kategori,
      birim: birim.trim() || 'Belirtilmedi',
      oncelik,
      durum: 'Bekliyor'
    };

    setTalepler(oncekiTalepler => [
      yeniTalep,
      ...oncekiTalepler
    ]);

    setAktifDurumFiltresi('Tümü');
    setAktifOncelikFiltresi('Tümü');
    setAramaMetni('');
    setAcikTalepId(yeniTalep.id);

    setBaslik('');
    setAciklama('');
    setBirim('');
    setKategori('Bilgisayar');
    setOncelik('Orta');
    setFormAcik(false);

    Alert.alert('Başarılı', 'Talebiniz oluşturuldu.');
  };

  // YENİ TALEP FORMU
  const talepFormu = (
    <View style={styles.filterSection}>
      <Text style={styles.sectionTitle}>Yeni Arıza Talebi</Text>

      <TextInput
        style={styles.formInput}
        placeholder="Arıza başlığı"
        placeholderTextColor={RENK.ikincilYazi}
        value={baslik}
        onChangeText={setBaslik}
      />

      <TextInput
        style={[styles.formInput, styles.descriptionInput]}
        placeholder="Arıza açıklaması"
        placeholderTextColor={RENK.ikincilYazi}
        value={aciklama}
        onChangeText={setAciklama}
        multiline
      />

      <TextInput
        style={styles.formInput}
        placeholder="Birim (isteğe bağlı)"
        placeholderTextColor={RENK.ikincilYazi}
        value={birim}
        onChangeText={setBirim}
      />

      <Text style={styles.filterTitle}>Kategori seçin</Text>
      <View style={styles.filterContainer}>
        {['Bilgisayar', 'Yazıcı', 'İnternet', 'Yazılım'].map(secenek => (
          <FiltreButonu
            key={secenek}
            baslik={secenek}
            secili={kategori === secenek}
            onPress={() => setKategori(secenek)}
          />
        ))}
      </View>

      <Text style={styles.filterTitle}>Öncelik seçin</Text>
      <View style={styles.filterContainer}>
        {['Düşük', 'Orta', 'Yüksek'].map(secenek => (
          <FiltreButonu
            key={secenek}
            baslik={secenek}
            secili={oncelik === secenek}
            onPress={() => setOncelik(secenek)}
          />
        ))}
      </View>

      <Pressable style={styles.actionButton} onPress={talepKaydet}>
        <MaterialCommunityIcons
          name="content-save-outline"
          size={19}
          color={RENK.beyaz}
        />
        <Text style={styles.actionText}>Talebi Kaydet</Text>
      </Pressable>

      <Pressable
        style={styles.cancelFormButton}
        onPress={() => setFormAcik(false)}
      >
        <Text style={styles.resetButtonText}>Vazgeç</Text>
      </Pressable>
    </View>
  );

  // LİSTE BAŞLIĞI
  const listeBasligi = (
    <View>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons
            name="headset"
            size={29}
            color={RENK.koyuMor}
          />
        </View>

        <Text style={styles.headerLabel}>
          BİLGİ İŞLEM DAİRE BAŞKANLIĞI
        </Text>

        <Text style={styles.title}>Teknik Destek Paneli</Text>

        <Text style={styles.subtitle}>
          Tüm destek taleplerini tek yerden yönetin.
        </Text>

        <View style={styles.headerBottom}>
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={16}
            color={RENK.koyuMor}
          />
          <Text style={styles.headerBottomText}>
            Talep Yönetim Sistemi
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.actionButton}
        onPress={() => setFormAcik(!formAcik)}
      >
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={20}
          color={RENK.beyaz}
        />
        <Text style={styles.actionText}>
          {formAcik ? 'Formu Kapat' : 'Yeni Talep Oluştur'}
        </Text>
      </Pressable>

      {formAcik && talepFormu}

      {/* ÖZET KARTLARI */}
      <View style={styles.summaryGrid}>
        <OzetKarti
          baslik="Toplam Talep"
          sayi={toplam}
          renk={RENK.mor}
          ikon="clipboard-list-outline"
          genislik={kartGenisligi}
        />

        <OzetKarti
          baslik="Bekleyen Talep"
          sayi={bekleyen}
          renk={RENK.turuncu}
          ikon="clock-outline"
          genislik={kartGenisligi}
        />

        <OzetKarti
          baslik="İşlemde"
          sayi={islemde}
          renk={RENK.mavi}
          ikon="progress-clock"
          genislik={kartGenisligi}
        />

        <OzetKarti
          baslik="Tamamlanan"
          sayi={tamamlanan}
          renk={RENK.yesil}
          ikon="check-circle-outline"
          genislik={kartGenisligi}
        />
      </View>

      {/* YENİ: ARAMA ALANI */}
      <View style={styles.filterSection}>
        <View style={styles.filterHeading}>
          <MaterialCommunityIcons
            name="magnify"
            size={18}
            color={RENK.koyuMor}
          />
          <Text style={styles.filterTitle}>
            Arıza Başlığı Ara
          </Text>
        </View>

        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Örn. Bilgisayar, Yazıcı..."
            placeholderTextColor={RENK.ikincilYazi}
            value={aramaMetni}
            onChangeText={setAramaMetni}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {aramaMetni.length > 0 && (
            <Pressable onPress={() => setAramaMetni('')}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={RENK.ikincilYazi}
              />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleArea}>
          <View style={styles.sectionIcon}>
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={21}
              color={RENK.koyuMor}
            />
          </View>
          <Text style={styles.sectionTitle}>Destek Talepleri</Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.sectionCount}>
            {filtreliTalepler.length} kayıt
          </Text>
        </View>
      </View>

      {/* DURUM FİLTRESİ */}
      <View style={styles.filterSection}>
        <View style={styles.filterHeading}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={18}
            color={RENK.koyuMor}
          />
          <Text style={styles.filterTitle}>Duruma göre</Text>
        </View>

        <View style={styles.filterContainer}>
          {durumFiltreleri.map(filtre => (
            <FiltreButonu
              key={filtre}
              baslik={filtre}
              secili={aktifDurumFiltresi === filtre}
              onPress={() => setAktifDurumFiltresi(filtre)}
            />
          ))}
        </View>
      </View>

      {/* ÖNCELİK FİLTRESİ */}
      <View style={styles.filterSection}>
        <View style={styles.filterHeading}>
          <MaterialCommunityIcons
            name="flag-outline"
            size={18}
            color={RENK.koyuMor}
          />
          <Text style={styles.filterTitle}>Önceliğe göre</Text>
        </View>

        <View style={styles.filterContainer}>
          {oncelikFiltreleri.map(filtre => (
            <FiltreButonu
              key={filtre}
              baslik={filtre}
              secili={aktifOncelikFiltresi === filtre}
              onPress={() => setAktifOncelikFiltresi(filtre)}
            />
          ))}
        </View>
      </View>

      {(aktifDurumFiltresi !== 'Tümü' ||
        aktifOncelikFiltresi !== 'Tümü') && (
        <View style={styles.activeFilterInfo}>
          <MaterialCommunityIcons
            name="information-outline"
            size={17}
            color={RENK.koyuMor}
          />

          <Text style={styles.activeFilterInfoText}>
            {aktifDurumFiltresi !== 'Tümü'
              ? aktifDurumFiltresi
              : 'Tüm durumlar'}
            {' • '}
            {aktifOncelikFiltresi !== 'Tümü'
              ? aktifOncelikFiltresi + ' öncelik'
              : 'Tüm öncelikler'}
          </Text>

          <Pressable
            style={styles.resetButton}
            onPress={() => {
              setAktifDurumFiltresi('Tümü');
              setAktifOncelikFiltresi('Tümü');
            }}
          >
            <Text style={styles.resetButtonText}>Temizle</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  // EKRAN
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={RENK.arkaPlan}
      />

      <FlatList
        data={filtreliTalepler}
        keyExtractor={item => item.id}
        extraData={acikTalepId}
        renderItem={({ item }) => (
          <TalepKarti
            talep={item}
            acikDetay={acikTalepId === item.id}
            onDetayDegistir={() => detayDegistir(item.id)}
            onDurumDegistir={durumDegistir}
            onTalepSil={talepSil}
          />
        )}
        ListHeaderComponent={listeBasligi}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBox}>
              <MaterialCommunityIcons
                name="clipboard-search-outline"
                size={42}
                color={RENK.mor}
              />
            </View>

            <Text style={styles.emptyTitle}>Talep bulunamadı</Text>

            <Text style={styles.emptyText}>
              Arama veya filtrelere uygun bir destek talebi bulunmuyor.
            </Text>

            <Pressable
              style={styles.emptyResetButton}
              onPress={() => {
                setAktifDurumFiltresi('Tümü');
                setAktifOncelikFiltresi('Tümü');
                setAramaMetni('');
              }}
            >
              <Text style={styles.emptyResetText}>
                Aramayı ve filtreleri temizle
              </Text>
            </Pressable>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// 8. UYGULAMA KÖKÜ
export default function App() {
  return (
    <SafeAreaProvider>
      <TeknikDestekPaneli />
    </SafeAreaProvider>
  );
}

// 9. TASARIM STİLLERİ
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RENK.arkaPlan
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 35,
    flexGrow: 1
  },
  header: {
    backgroundColor: RENK.acikLila,
    borderRadius: 24,
    padding: 22,
    marginTop: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: RENK.lila
  },
  headerIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: RENK.beyaz,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: RENK.koyuMor,
    letterSpacing: 1.1
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: RENK.koyuYazi,
    marginTop: 9
  },
  subtitle: {
    fontSize: 14,
    color: RENK.ikincilYazi,
    marginTop: 8,
    lineHeight: 21
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 7,
    backgroundColor: RENK.beyaz,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 17
  },
  headerBottomText: {
    color: RENK.koyuMor,
    fontSize: 12,
    fontWeight: '700'
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
    marginBottom: 28
  },
  summaryCard: {
    backgroundColor: RENK.beyaz,
    borderRadius: 19,
    padding: 14,
    minHeight: 133,
    borderWidth: 1,
    borderColor: RENK.kenarlik,
    justifyContent: 'center',
    shadowColor: RENK.koyuMor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 9
  },
  summaryIconBox: {
    width: 39,
    height: 39,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryIndicator: {
    width: 5,
    height: 24,
    borderRadius: 5
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: '800'
  },
  summaryLabel: {
    color: RENK.ikincilYazi,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 17
  },
  sectionTitleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 9
  },
  sectionIcon: {
    width: 39,
    height: 39,
    backgroundColor: RENK.acikLila,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: RENK.koyuYazi,
    flexShrink: 1
  },
  countBadge: {
    backgroundColor: RENK.acikLila,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 12
  },
  sectionCount: {
    fontSize: 12,
    color: RENK.koyuMor,
    fontWeight: '700'
  },
  filterSection: {
    backgroundColor: RENK.beyaz,
    borderWidth: 1,
    borderColor: RENK.kenarlik,
    borderRadius: 17,
    padding: 14,
    marginBottom: 12
  },
  filterHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 12
  },
  filterTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: RENK.koyuYazi,
    marginTop: 12,
    marginBottom: 9
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#F7F3FC',
    borderWidth: 1,
    borderColor: RENK.kenarlik,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 11,
    minHeight: 39
  },
  activeFilter: {
    backgroundColor: RENK.mor,
    borderColor: RENK.mor
  },
  filterText: {
    color: RENK.ikincilYazi,
    fontSize: 12,
    fontWeight: '700'
  },
  activeFilterText: {
    color: RENK.beyaz
  },
  activeFilterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: RENK.acikLila,
    borderRadius: 12,
    padding: 11,
    marginBottom: 18,
    marginTop: 2
  },
  activeFilterInfoText: {
    color: RENK.koyuMor,
    fontSize: 11,
    fontWeight: '700',
    flex: 1
  },
  resetButton: {
    paddingVertical: 6,
    paddingHorizontal: 9,
    backgroundColor: RENK.beyaz,
    borderRadius: 8
  },
  resetButtonText: {
    color: RENK.koyuMor,
    fontSize: 11,
    fontWeight: '800'
  },
  ticketCard: {
    backgroundColor: RENK.beyaz,
    borderRadius: 19,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: RENK.kenarlik,
    overflow: 'hidden',
    shadowColor: RENK.koyuMor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.045,
    shadowRadius: 7,
    elevation: 2
  },
  ticketPressable: {
    padding: 16
  },
  cardPressed: {
    backgroundColor: '#FCFAFF'
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 9,
    marginBottom: 15
  },
  ticketIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  ticketId: {
    color: RENK.ikincilYazi,
    fontSize: 11,
    fontWeight: '700'
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '800'
  },
  ticketTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  categoryIconBox: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: RENK.acikLila,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ticketTitleArea: {
    flex: 1,
    minWidth: 0
  },
  ticketTitle: {
    color: RENK.koyuYazi,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22
  },
  ticketDetail: {
    color: RENK.ikincilYazi,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5
  },
  ticketBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#F2EDF8'
  },
  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 9
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800'
  },
  detailHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  detailHintText: {
    fontSize: 11,
    fontWeight: '700',
    color: RENK.mor
  },
  longPressHint: {
    fontSize: 10,
    color: RENK.ikincilYazi,
    marginTop: 12
  },
  detailPanel: {
    backgroundColor: '#FAF7FF',
    marginHorizontal: 13,
    marginBottom: 13,
    padding: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: RENK.lila
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingBottom: 12,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: RENK.lila
  },
  detailHeaderText: {
    color: RENK.koyuMor,
    fontSize: 13,
    fontWeight: '800'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE5FA'
  },
  lastDetailRow: {
    borderBottomWidth: 0,
    paddingBottom: 2
  },
  detailLabel: {
    flex: 1,
    color: RENK.ikincilYazi,
    fontSize: 12,
    lineHeight: 18
  },
  detailValue: {
    flex: 1,
    color: RENK.koyuYazi,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
    lineHeight: 18
  },
  actionArea: {
    paddingHorizontal: 14,
    paddingBottom: 14
  },
  actionButton: {
    backgroundColor: RENK.mor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8
  },
  actionButtonPressed: {
    backgroundColor: RENK.koyuMor
  },
  actionText: {
    color: RENK.beyaz,
    fontSize: 12,
    fontWeight: '800'
  },
  completedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#F0FDF4',
    paddingVertical: 11,
    borderRadius: 12
  },
  completedText: {
    fontSize: 12,
    color: RENK.yesil,
    fontWeight: '700'
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 25,
    marginTop: 4,
    marginBottom: 15,
    backgroundColor: RENK.beyaz,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: RENK.kenarlik
  },
  emptyIconBox: {
    width: 76,
    height: 76,
    borderRadius: 25,
    backgroundColor: RENK.acikLila,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: RENK.koyuYazi
  },
  emptyText: {
    fontSize: 12,
    color: RENK.ikincilYazi,
    marginTop: 8,
    lineHeight: 19,
    textAlign: 'center'
  },
  emptyResetButton: {
    backgroundColor: RENK.mor,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 11,
    marginTop: 17
  },
  emptyResetText: {
    color: RENK.beyaz,
    fontSize: 12,
    fontWeight: '800'
  },
  formInput: {
    backgroundColor: RENK.arkaPlan,
    borderWidth: 1,
    borderColor: RENK.kenarlik,
    borderRadius: 12,
    padding: 13,
    marginTop: 12,
    marginBottom: 4,
    color: RENK.koyuYazi,
    fontSize: 14
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  cancelFormButton: {
    alignItems: 'center',
    padding: 12,
    marginTop: 5
  },

  // YENİ: ARAMA ALANININ STİLLERİ
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RENK.arkaPlan,
    borderWidth: 1,
    borderColor: RENK.kenarlik,
    borderRadius: 12,
    paddingHorizontal: 12
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    color: RENK.koyuYazi,
    fontSize: 13
  }
});
