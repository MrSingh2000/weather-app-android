import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { API_KEY } from "@env";
import axios from 'axios';

export default function SearchBar(props) {
    // get weatherDetails state from the props
    const { setWeatherDetails, setLoading, loading } = { ...props };
    // loading state
    const [city, setCity] = useState("London");

    const getWeather = async () => {
        setLoading(true);
        let url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
        axios({
            method: 'get',
            url
        }).then((res) => {
            setWeatherDetails({
                location: res.data.location.name,
                humidity: res.data.current.humidity,
                temp: res.data.current.temp_c,
                weather: res.data.current.condition.text,
                wind: res.data.current.wind_kph,
                isDay: res.data.current.is_day,
            });
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    return (
        <SafeAreaView style={{ flexDirection: 'row', marginTop: 10 }}>
            <TextInput style={styles.input} />
            <View onTouchStart={getWeather} accessible={true} style={{ width: 50 }}>
                <EvilIcons name="search" size={45} color="black" />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
    },
});