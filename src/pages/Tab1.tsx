import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonLoading, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';
import './Tab1.css'; // Pastikan file ini diimpor dengan benar

const Beranda: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('Manado'); // State untuk menyimpan nama kota

  const apiKey = '0778e9ccb817829cffd4e5b462d046bb'; // Masukkan API Key kamu

  // Fungsi untuk mengambil data cuaca
  const fetchWeatherData = async (city: string) => {
    setLoading(true); // Tampilkan loading saat mengambil data
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setError(null); // Reset error jika data berhasil diambil
    } catch (err) {
      setError('Gagal mengambil data cuaca.'); // Set error jika terjadi kesalahan
    } finally {
      setLoading(false); // Sembunyikan loading
    }
  };

  // useEffect untuk mengambil data cuaca saat komponen di-mount
  useEffect(() => {
    fetchWeatherData(city); // Ambil data cuaca untuk kota default
  }, [city]); // Menjalankan efek setiap kali nama kota berubah

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Weather Forecast</IonTitle>
          <p className="text-author">
            By: Imelda Lie - 220211060011
          </p>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="input-card"> {/* Card untuk input dan tombol */}
          <IonInput 
            className="input-city" /* Kelas untuk input kota */
            value={city} 
            placeholder="Masukkan nama kota" 
            onIonChange={(e) => setCity(e.detail.value!)} // Mengubah nilai kota
          />
          <IonButton 
            expand="full" 
            className="search-button" /* Kelas untuk tombol pencarian */
            onClick={() => fetchWeatherData(city)} 
          >
            Cari
          </IonButton>
        </IonCard>
        
        {loading ? (
          <IonLoading isOpen={loading} message={"Mengambil data cuaca..."} />
        ) : error ? (
          <IonCard>
            <IonCardContent>
              <p>{error}</p>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardContent>
              <h2>{weatherData.name}</h2>
              <p>Suhu: {weatherData.main.temp}°C</p>
              <p>{weatherData.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Beranda; // Ubah export default menjadi Beranda
