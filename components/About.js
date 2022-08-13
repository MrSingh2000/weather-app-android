import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { cloudy, haze, sunny, rainy, day, night } from "../assets/weather";
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const data = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Github',
        url: 'https://github.com/MrSingh2000',
        name: 'github',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/in/anshuman-singh-856991201/',
        name: 'linkedin-square',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Instagram',
        url: 'https://www.instagram.com/mr_singh2000/',
        name: 'instagram',
    },
];


function About() {

    const handleOnPress = (name, url) => {
        switch (name) {
            case "Github":
                Linking.openURL(url);
                break;
            case "LinkedIn":
                Linking.openURL(url);
                break;
            case "Instagram":
                Linking.openURL(url);
                break;

            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground style={{ height: '100%' }} source={sunny} resizeMode="cover">
                <ScrollView>
                    <View style={styles.container}>

                        {/* <Text style={{fontSize: 30}}>
                            About The Application
                        </Text> */}
                        <Text style={{ fontSize: 15, padding: 20 }}>
                            Weather-Hop is a weather application which serves the latest weather directly on to your handset.
                        </Text>
                        <Text style={{ fontSize: 15, padding: 20 }}>
                            Please accept the location permissions to help the application get your current location and give you the
                            weather details with full ease.
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 50 }}>
                            This application is made using React Native.
                        </Text>
                        <Text style={{ fontSize: 20 }}>
                            Contact:
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {data.map((val) => {
                                return (
                                    <View style={{ margin: 10, paddingLeft: 20, paddingRight: 20 }} key={val.id} onTouchStart={() => handleOnPress(val.title, val.url)}>
                                        <AntDesign name={val.name} size={34} color={val.title === 'Github' ? "black" : val.title === 'LinkedIn' ? 'blue' : 'purple'} />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 30
    },
    miniText: {
        flex: 1,
        textAlign: 'center',
        padding: 20,
        textShadowRadius: 2,
        shadowColor: '#210F04'
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

export default About