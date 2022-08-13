import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { API_KEY } from "@env";
import axios from 'axios';

export default function SearchBar(props) {
    // get weatherDetails state from the props
    const {firstLoad, setFirstLoad, setWeatherDetails, setLoading, city, setCity, location, setForcastWeather } = { ...props };

    const getWeather = () => {
        setLoading(true);
        let url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`;
        axios({
            method: 'get',
            url
        }).then((res) => {
            setWeatherDetails({
                location: res.data.location.name,
                country: res.data.location.country,
                humidity: res.data.current.humidity,
                temp: res.data.current.temp_c,
                weather: res.data.current.condition.text,
                wind: res.data.current.wind_kph,
                isDay: res.data.current.is_day,
            });
            setForcastWeather({
                humidity: res.data.forecast.forecastday[0].day.avghumidity,
                temp: res.data.forecast.forecastday[0].day.avgtemp_c,
                weather: res.data.forecast.forecastday[0].day.condition.text,
                wind: res.data.forecast.forecastday[0].day.maxwind_kph,
            })
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    if(firstLoad === true){
        getWeather();
        setFirstLoad(false);
    }


    return (
        <SafeAreaView style={{ flexDirection: 'row', marginTop: 10 }}>
            <TextInput placeholder="Search a location" onChangeText={setCity} style={styles.input} />
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
        padding: 5,
    },
});