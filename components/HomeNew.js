import React from 'react';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Dimensions, ImageBackground, ScrollView, ActivityIndicator, StyleSheet, Text, View, Image, Button } from 'react-native';
import { cloudy, haze, sunny, rainy, day, night } from "../assets/weather";
import SearchBar from './SearchBar';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    drop,
    cloud,
    pressure,
    sunrise,
    sunset,
    wind,
    clear_night_wth,
    clear_wth,
    haze_wth,
    cloudy_wth,
    rainy_wth,
    temp_wth,
    uv_wth
} from '../assets/icons/index';

function HomeNew(props) {
    const { height } = Dimensions.get('window')
    const { location, navigation, firstLoad, setFirstLoad } = { ...props };
    const [city, setCity] = useState(location?.coords?.latitude ? `${location.coords.latitude},${location.coords.longitude}` : "London");

    const [bgImage, setBgImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [weatherDetails, setWeatherDetails] = useState({
        location: "London",
        country: "UK",
        temp: 0,
        weather: "sunny",
        humidity: 0,
        wind: 0,
        isDay: 1,
        cloud: 0,
        pressure: 0,
        sunrise: 0,
        sunset: 0,
    });

    const [forcastWeather, setForcastWeather] = useState(
        {
            temp: 0,
            wind: 0,
            humidity: 0,
            uv: 0
        });

    const [forcastHour, setForcastHour] = useState([]);

    // console.log(d.getHours());
    // console.log(forcastHour[0].time.slice(-5, -3) > d.getHours);

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
                setBgImage(sunny);
                break;
        }
    }

    const decideIcon = (weather, day) => {
        if (weather.indexOf("sun") !== -1) {
            weather = "sunny";
            if (day)
                clear_wth;
            else
                clear_night_wth;
        }
        else if (weather.indexOf("mist") !== -1)
            return haze_wth;
        else if (weather.indexOf("cloud") !== -1)
            return cloudy_wth;
        else if (weather.indexOf("rain") !== -1)
            return rainy_wth;
        else
            return clear_wth;
    }

    useEffect(() => {
        // console.log(forcastHour);
        setBg();
    }, [weatherDetails])

    return loading ? (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    ) : (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground style={{}} source={bgImage} resizeMode="cover">
                <SearchBar setForcastHour={setForcastHour} firstLoad={firstLoad} setFirstLoad={setFirstLoad} city={city} setCity={setCity} location={location} setWeatherDetails={setWeatherDetails} setForcastWeather={setForcastWeather} loading={loading} setLoading={setLoading} />

                <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 20 }}>{weatherDetails.location}, {weatherDetails.country}</Text>

                <ScrollView style={{ marginBottom: 100 }}>
                    {/* Part 1 */}
                    <View style={styles.bigCardUpper}>
                        <View style={styles.smallCardInner}>
                            <Image
                                style={styles.icon1}
                                source={drop}
                            />
                            <View>
                                <Text style={styles.text1}>Humidity</Text>
                                <Text>{weatherDetails.humidity}%</Text>
                            </View>

                        </View>

                        <View style={styles.hrRay} />

                        <View style={styles.smallCardInner}>

                            <Image
                                style={styles.icon1}
                                source={cloud}
                            />
                            <View>
                                <Text style={styles.text1}>Clouds</Text>
                                <Text>{weatherDetails.cloud}%</Text>
                            </View>

                        </View>
                    </View>

                    {/* Part 2 */}
                    <View style={styles.bigCardUpper}>
                        <View style={styles.smallCardInner}>
                            <Image
                                style={styles.icon1}
                                source={wind}
                            />
                            <View>
                                <Text style={styles.text1}>Wind</Text>
                                <Text>{weatherDetails.wind} km/h</Text>
                            </View>

                        </View>

                        <View style={styles.hrRay} />

                        <View style={styles.smallCardInner}>

                            <Image
                                style={styles.icon1}
                                source={pressure}
                            />
                            <View>
                                <Text style={styles.text1}>Pressure</Text>
                                <Text>{weatherDetails.pressure} hPa</Text>
                            </View>

                        </View>
                    </View>

                    {/* Part 3 */}
                    <View style={styles.bigCardUpper}>
                        <View style={styles.smallCardInner}>
                            <Image
                                style={styles.icon1}
                                source={sunrise}
                            />
                            <View>
                                <Text style={styles.text1}>Sunrise</Text>
                                <Text>{weatherDetails.sunrise}</Text>
                            </View>

                        </View>

                        <View style={styles.hrRay} />

                        <View style={styles.smallCardInner}>

                            <Image
                                style={styles.icon1}
                                source={sunset}
                            />
                            <View>
                                <Text style={styles.text1}>Sunset</Text>
                                <Text>{weatherDetails.sunset}</Text>
                            </View>

                        </View>
                    </View>

                    {/* Next 24 hours section */}
                    <View style={styles.space}>
                        <Text style={styles.text1}>24 HOURS</Text>
                        <ScrollView horizontal={true}>
                            {
                                forcastHour.map((val) => {
                                    let time = parseInt(val.time.slice(-5, -3));
                                    return (
                                        <View style={styles.futureCard} key={val.time_epoch}>
                                            <Text style={styles.text2}>{time === 0 ? 12 : time > 12 ? time - 12 : time} {time >= 12 ? "PM" : "AM"}</Text>
                                            <Image
                                                style={styles.icon2}
                                                source={decideIcon(val.condition.text, val.is_day)}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    {/* Forecast Weather */}
                    {/* Part 1 */}
                    <Text style={[styles.text1, styles.space]}>Tommorow Forecast</Text>
                    <View style={styles.bigCardUpper}>
                        <View style={styles.smallCardInner}>
                            <Image
                                style={styles.icon1}
                                source={drop}
                            />
                            <View>
                                <Text style={styles.text1}>Humidity</Text>
                                <Text>{forcastWeather.humidity}%</Text>
                            </View>

                        </View>

                        <View style={styles.hrRay} />

                        <View style={styles.smallCardInner}>

                            <Image
                                style={styles.icon1}
                                source={temp_wth}
                            />
                            <View>
                                <Text style={styles.text1}>Temp</Text>
                                <Text>{forcastWeather.temp}°C</Text>
                            </View>

                        </View>
                    </View>
                    {/* Part 2 */}
                    <View style={styles.bigCardUpper}>
                        <View style={styles.smallCardInner}>
                            <Image
                                style={styles.icon1}
                                source={wind}
                            />
                            <View>
                                <Text style={styles.text1}>Wind</Text>
                                <Text>{forcastWeather.wind} km/h</Text>
                            </View>

                        </View>

                        <View style={styles.hrRay} />

                        <View style={styles.smallCardInner}>

                            <Image
                                style={styles.icon1}
                                source={uv_wth}
                            />
                            <View>
                                <Text style={styles.text1}>UV</Text>
                                <Text>{forcastWeather.uv} mW</Text>
                            </View>

                        </View>
                    </View>

                    <Pressable style={{ flexGrow: 1, backgroundColor: 'red', marginTop: 10 }} onPress={() => navigation.navigate('About')}>
                        <View style={{backgroundColor: '#B0D0D3', alignContent: 'center', justifyContent: 'center', flexDirection: 'row', padding: 5 }}>
                            <Text style={{marginRight: 5, color: 'white', fontWeight: 'bold'}}>About Us</Text>
                            <AntDesign name="rightcircleo" size={24} color="white" />
                        </View>
                    </Pressable>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    text2: {
        fontSize: 20,
    },
    icon2: {
        height: 60,
        width: 60,
    },
    futureCard: {
        margin: 5,
        backgroundColor: '#7FACC7',
        padding: 25,
        borderRadius: 10,
        borderColor: '#6399BB'
    },
    space: {
        margin: 10
    },
    hrRay: {
        borderBottomColor: 'black',
        borderBottomWidth: 80,
        width: 1,
        marginBottom: 10,
    },
    icon1: {
        height: 30,
        width: 30,
        marginRight: 15,
    },
    text1: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    bigCardUpper: {
        flexDirection: 'row',
        backgroundColor: '#7FACC7',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        margin: 10,
    },
    smallCardInner: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        padding: 30,
    }
});


export default HomeNew