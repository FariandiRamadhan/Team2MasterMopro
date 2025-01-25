import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { checkAuthStatus, getData } from './Utilities/fetch_functions';

import Home from './screens/Home';
import Login from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import SplashScreen2 from './screens/SplashScreen2';
import NewAgenda from './screens/NewAgenda';
import ViewAgenda from './screens/ViewAgenda';
import EditAgenda from './screens/EditAgenda';
import Notif from './components/Notif';
import LoadingScreen from './components/Loading';
import CustomDrawerContent from './components/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#1C1C1E',
          width: 280,
        },
        headerStyle: {
          backgroundColor: '#1C1C1E',
        },
        headerTintColor: '#fff',
        drawerLabelStyle: {
          color: '#fff',
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ title: 'Meeting Agenda' }} />
      <Drawer.Screen name="NewAgenda" component={NewAgenda} options={{ title: 'New Agenda' }} />
      <Drawer.Screen name="ViewAgenda" component={ViewAgenda} options={{ title: 'Search' }} />
    </Drawer.Navigator>
  );
}


// Main App Navigation
export default function App() {
  // Mengecek status login jika true maka login screen dimunculkan
  const [isLogin, setisLogin] = useState(true);

  // Mengecek loading jika true maka akan ada loading screen yang muncul
  const [loading, setLoading] = useState(true);

  const [isSkipSplash, setIsSkipSplash] = useState(true);

  // Memberikan passing value kepada component SplashScreen untuk menampilkan nama sesuai username login
  const [username, setUsername] = useState("");

  // Melakukan fetch data dan re-render screen karena perubahan state
  useEffect(()=>{
    // console.log(response, isLogin);
    // Skip splash Screen
    getData("haveSplash")
    .then(response => {
      console.log(response);
      response === true ? setIsSkipSplash(true): setIsSkipSplash(false);
    })
    .catch(error => console.log(error));

    // Check jika user sudah login atau belum dengan mengecek cookie
    checkAuthStatus().then(
      response => {
        if(response){
          setisLogin(false);
          setUsername(response.data?.username);
        }
      })
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
  }, [isLogin])

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLogin && (<Stack.Screen name="Login" component={Login} />)}
        {
          !isSkipSplash && (
            <>
              <Stack.Screen name="SplashScreen" component={SplashScreen} initialParams={{ username }}/>
              <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
            </>
          )
        }
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
        <Stack.Screen name="NewAgenda" component={NewAgenda} />
        <Stack.Screen name="ViewAgenda" component={ViewAgenda} />
        <Stack.Screen name="EditAgenda" component={EditAgenda} />
        <Stack.Screen name="Notif" component={Notif} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}