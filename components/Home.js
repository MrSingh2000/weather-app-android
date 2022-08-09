import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { cloudy, haze, sunny, rainy } from "../assets/weather";
import SearchBar from './SearchBar';
import { EvilIcons } from '@expo/vector-icons';

function Home() {
    const [bgImage, setBgImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [weatherDetails, setWeatherDetails] = useState({
        location: "",
        temp: "",
        weather: "",
        humidity: 0,
        wind: 0,
        isDay: true,
    })

    return loading ? (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00"/>
        </View>
    ) : (
        <View style={{ marginTop: 20, marginLeft: 20 }}>
            <ImageBackground source={bgImage} resizeMode="cover">
                <Text style={{ fontSize: 30, marginTop: 10 }}>Weather-Hop</Text>
                <SearchBar style={{ flex: 1 }} setWeatherDetails={setWeatherDetails} loading={loading} setLoading={setLoading} />
                <View style={{backgroundColor: 'red'}}>
                    <Text>{weatherDetails.location}</Text>
                    <Text>{weatherDetails.temp}</Text>
                    <Text>{weatherDetails.weather}</Text>
                    <Text>{weatherDetails.humidity}</Text>
                    <Text>{weatherDetails.wind}</Text>
                    <Text>{weatherDetails.isDay}</Text>
                </View>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home