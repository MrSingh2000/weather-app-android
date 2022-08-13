import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ActivityIndicator } from 'react-native';
import { API_KEY } from "@env";
import Home from './components/Home';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from './components/About';
import logo from './assets/logo.png';
import HomeNew from './components/HomeNew';

const Stack = createNativeStackNavigator();


export default function App() {
  const [location, setLocation] = useState("London");
  const [firstLoad, setFirstLoad] = useState(true);


  function LogoTitle() {
    return (<>
      <Image
        style={{ width: 40, height: 40 }}
        source={require('./assets/logo.png')}
      />
      <Text style={{ fontSize: 20, marginLeft: 10 }}>Weather-Hop</Text>
    </>
    );
  }


  // get user location when the app is started
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== 'granted') {
  //         setErrorMsg('Permission to access location was denied');
  //         return;
  //       }
  //       let location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //     } catch (error) {
  //       console.log("Permission Denied");
  //       setLocation("London");
  //     }
  //   })();
  // }, [])

  return !location ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Home"
            options={{
              title: 'Home Section',
              headerStyle: {
                backgroundColor: '#B0D0D3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitle: (props) => <LogoTitle {...props} />
            }}>
            {(props) => <HomeNew {...props}
              location={location}
              firstLoad={firstLoad}
              setFirstLoad={setFirstLoad}
            />}
          </Stack.Screen>
          {/* <Home location={location} /> */}
          <Stack.Screen
            name="About"
            component={About}
            options={{
              title: 'About',
              headerStyle: {
                backgroundColor: '#B0D0D3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
