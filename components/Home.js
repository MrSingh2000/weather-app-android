import { useEffect, useState } from 'react';
import { Pressable, ActivityIndicator, StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { cloudy, haze, sunny, rainy, day, night } from "../assets/weather";
import SearchBar from './SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Home(props) {
    const { location, navigation, firstLoad, setFirstLoad } = { ...props };
    const [city, setCity] = useState(location?.coords?.latitude ? `${location.coords.latitude},${location.coords.longitude}` : "London");

    const [bgImage, setBgImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [weatherDetails, setWeatherDetails] = useState({
        location: "London",
        country: "UK",
        temp: "20",
        weather: "sunny",
        humidity: 0,
        wind: 0,
        isDay: 1,
    });

    const [forcastWeather, setForcastWeather] = useState(
        {
            temp: "20",
            weather: "sunny",
            humidity: 0,
            wind: 0,
        });

    const setBg = () => {
        switch (weatherDetails.weather) {
            case "sunny":
                setBgImage(sunny);
                break;
            case "haze":
                setBgImage(haze);
                break;
            case "cloudy":
                setBgImage(cloudy);
                break;
            case "rainy":
                setBgImage(rainy);
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        setBg();
    }, [weatherDetails])


    return loading ? (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    ) : (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ height: '100%' }} source={bgImage} resizeMode="cover">
                <View style={{ marginTop: 20, marginLeft: 20, flexDirection: 'column' }}>
                    {/* <Text style={{ fontSize: 30 }}>Weather-Hop</Text> */}
                    <SearchBar firstLoad={firstLoad} setFirstLoad={setFirstLoad} city={city} setCity={setCity} location={location} setWeatherDetails={setWeatherDetails} setForcastWeather={setForcastWeather} loading={loading} setLoading={setLoading} />
                    <View style={styles.view1}>
                        {/* Current weather Card */}
                        <View style={styles.weatherCard}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>{weatherDetails.location}, {weatherDetails.country}</Text>
                            <ImageBackground borderRadius={10} style={styles.cardImg} source={weatherDetails.isDay ? day : night} resizeMode="cover">
                                <View style={styles.innerView}>

                                    <Text style={styles.miniText}>
                                        <Text style={{ color: `${weatherDetails.isDay ? 'black' : 'white'}` }}>
                                            <Text style={styles.textStyle}>Temp: </Text>{weatherDetails.temp}°C
                                        </Text>
                                    </Text>
                                    <Text style={styles.miniText}>
                                        <Text style={{ color: `${weatherDetails.isDay ? 'black' : 'white'}` }}>
                                            <Text style={styles.textStyle}>Weather: </Text>{weatherDetails.weather}
                                        </Text>
                                    </Text>

                                </View>

                                <View style={styles.innerView}>

                                    <Text style={styles.miniText}>
                                        <Text style={{ color: `${weatherDetails.isDay ? 'black' : 'white'}` }}>
                                            <Text style={styles.textStyle}>Humidity: </Text>{weatherDetails.humidity}
                                        </Text>
                                    </Text>
                                    <Text style={styles.miniText}>
                                        <Text style={{ color: `${weatherDetails.isDay ? 'black' : 'white'}` }}>
                                            <Text style={styles.textStyle}>Wind: </Text>{weatherDetails.wind} kph
                                        </Text>
                                    </Text>

                                </View>
                            </ImageBackground>
                        </View>


                        {/* upcoming weather card */}
                        <View style={[styles.weatherCard, styles.card2]}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>Tomorrow</Text>
                            <ImageBackground borderRadius={10} style={styles.cardImg} source={weatherDetails.isDay ? day : night} resizeMode="cover">
                                <View style={styles.innerView}>

                                    <Text style={styles.miniText}><Text style={styles.textStyle}>
                                        <Text style={{ color: `${weatherDetails.isDay ? 'black' : 'white'}` }}>
                                            Temp: </Text>{forcastWeather.temp}°C
                                    </Text>
                                    </Text>
                                    <Text style={styles.miniText}>
                                        <Text style={{ color: `${weatherDetails.isDay ? 'black' : 'white'}` }}>
                                            <Text style={styles.textStyle}>Weather: </Text>{forcastWeather.weather}
                                        </Text>
                                    </Text>

                                </View>

                                <View style={styles.innerView}>

                                    <Text style={styles.miniText}>
                                        <Text style={{ color: `${weatherDetails.isDay ? 'black' : 'white'}` }}>
                                            <Text style={styles.textStyle}>Humidity: </Text>{forcastWeather.humidity}
                                        </Text>
                                    </Text>
                                    <Text style={styles.miniText}>
                                        <Text style={{ color: `${weatherDetails.isDay ? 'black' : 'white'}` }}>
                                            <Text style={styles.textStyle}>Wind: </Text>{forcastWeather.wind} kph
                                        </Text>
                                    </Text>

                                </View>
                            </ImageBackground>
                        </View>

                    </View>

                    <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate('About')}
                    >
                        <Text>About Us</Text>
                    </Pressable>

                </View>
            </ImageBackground>
        </View >
    )
};


const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 30,
        backgroundColor: '#FFCAD4',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '40%',
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFC2CD',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view1: {
        marginTop: 50,
        alignItems: 'center',
        flexDirection: 'column',
    },
    textStyle: {
        fontWeight: '500',
    },
    textStyle1: {
        marginLeft: 5,
    },
    weatherCard: {
        borderRadius: 10,
        padding: 10,
        width: 300,
        height: 200
    },
    card2: {
        marginTop: 10
    },
    miniText: {
        flex: 1,
        textAlign: 'center',
        padding: 20,
        textShadowRadius: 2,
        shadowColor: '#210F04',
    },
    innerView: {
        flexDirection: 'row',
        borderRadius: 10,
    },
    cardImg: {
        borderWidth: 1,
        borderRadius: 10,
    }
});

export default Home