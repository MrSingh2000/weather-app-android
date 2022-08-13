import React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
import { cloudy, haze, sunny, rainy, day, night } from "../assets/weather";
import SearchBar from './SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { drop, cloud, pressure, sunrise, sunset, wind } from '../assets/icons/index';

function HomeNew(props) {
    let d = new Date();
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
        cloud: 0,
        pressure: 0,
        sunrise: 0,
        sunset: 0,
    });

    const [forcastWeather, setForcastWeather] = useState(
        {
            temp: "20",
            weather: "sunny",
            humidity: 0,
            wind: 0,
        });

    const [forcastHour, setForcastHour] = useState([{
        "time_epoch": 1660118400,
        "time": "2022-08-10 09:00",
        "temp_c": 23.4,
        "temp_f": 74.1,
        "is_day": 1,
        "condition": {
            "text": "Sunny",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
            "code": 1000
        },
        "wind_mph": 7.2,
        "wind_kph": 11.5,
        "wind_degree": 64,
        "wind_dir": "ENE",
        "pressure_mb": 1026.0,
        "pressure_in": 30.3,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 52,
        "cloud": 7,
        "feelslike_c": 24.9,
        "feelslike_f": 76.8,
        "windchill_c": 23.4,
        "windchill_f": 74.1,
        "heatindex_c": 24.9,
        "heatindex_f": 76.8,
        "dewpoint_c": 13.1,
        "dewpoint_f": 55.6,
        "will_it_rain": 0,
        "chance_of_rain": 0,
        "will_it_snow": 0,
        "chance_of_snow": 0,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "gust_mph": 8.3,
        "gust_kph": 13.3,
        "uv": 6.0
    },
    {
        "time_epoch": 1660122000,
        "time": "2022-08-10 10:00",
        "temp_c": 25.4,
        "temp_f": 77.7,
        "is_day": 1,
        "condition": {
            "text": "Sunny",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
            "code": 1000
        },
        "wind_mph": 6.9,
        "wind_kph": 11.2,
        "wind_degree": 72,
        "wind_dir": "ENE",
        "pressure_mb": 1026.0,
        "pressure_in": 30.29,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 43,
        "cloud": 6,
        "feelslike_c": 25.8,
        "feelslike_f": 78.4,
        "windchill_c": 25.4,
        "windchill_f": 77.7,
        "heatindex_c": 25.8,
        "heatindex_f": 78.4,
        "dewpoint_c": 12.0,
        "dewpoint_f": 53.6,
        "will_it_rain": 0,
        "chance_of_rain": 0,
        "will_it_snow": 0,
        "chance_of_snow": 0,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "gust_mph": 8.1,
        "gust_kph": 13.0,
        "uv": 7.0
    },]);

    console.log(d.getHours());
    console.log(forcastHour[0].time.slice(-5, -3) > d.getHours);

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

    const decideIcon = (weather) => {
        switch (weatherDetails.weather) {
            case "sunny":
                sunny
                break;
            case "haze":
                haze
                break;
            case "cloudy":
                cloudy
                break;
            case "rainy":
                rainy
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        // console.log(forcastHour);
        setBg();
    }, [weatherDetails])

    return (
        <View>
            <SearchBar setForcastHour={setForcastHour} firstLoad={firstLoad} setFirstLoad={setFirstLoad} city={city} setCity={setCity} location={location} setWeatherDetails={setWeatherDetails} setForcastWeather={setForcastWeather} loading={loading} setLoading={setLoading} />

            <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 20 }}>{weatherDetails.location}, {weatherDetails.country}</Text>

            <ScrollView horizontal={false}>
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
                            source={drop}
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
                            source={cloud}
                        />
                        <View>
                            <Text style={styles.text1}>Sunset</Text>
                            <Text>{weatherDetails.sunset}</Text>
                        </View>

                    </View>
                </View>

                {/* Next 24 hours section */}
                <View style={styles.space}>
                    <Text style={styles.text1}>NEXT 24 HOURS</Text>
                    <ScrollView horizontal={true}>
                        {
                            forcastHour.map((val) => {
                                let time = parseInt(val.time.slice(-5, -3));
                                return (
                                    <View style={styles.futureCard}>
                                        <Text style={styles.text2}>{time === 0 ? 12 : time} {time >= 12 ? "PM" : "AM"}</Text>
                                        <Image
                                            style={styles.icon2}
                                            source={cloud}
                                        />
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>

            </ScrollView>
        </View>

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
        backgroundColor: 'red',
        padding: 25,
        borderRadius: 10,
    },
    space: {
        margin: 10
    },
    hrRay: {
        borderBottomColor: 'black',
        borderBottomWidth: 80,
        width: 2,
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
        backgroundColor: 'green',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        margin: 10,
    },
    smallCardInner: {
        flexDirection: 'row',
        backgroundColor: 'red',
        padding: 30,
    }
});


export default HomeNew