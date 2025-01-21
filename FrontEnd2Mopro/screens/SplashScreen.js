import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showData } from '../Utilities/fetch_functions';

export default function SplashScreen({ route }) {
  const progress = 0.5; 
  const navigation = useNavigation();

  // Splash screen di skip karena sudah dilihat sekali
  // const [isSkipSplash, setisSkipSplash] = useState(false);

  // Mendapatkan username yang dipassing
  const { username } = route.params;

  showData("haveSplash")
  .then(response => {
    response.data ? navigation.navigate('MainDrawer'): null;
  })
  .catch(error => console.log("cookie data not found"));

  const handleSplashScreen1 = () => {
    navigation.navigate('SplashScreen2');
  };
  return (
    <ImageBackground
      source={require('../assets/img/splashscreen.png')}
      style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome Back {username}</Text>
          <Text style={styles.progressText}>Let’s Get Started</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleSplashScreen1}>
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      alignItems: 'center',
    },
    content: {
      width: '90%',
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: '700',
      color: 'white',
      marginBottom: 290,
      marginTop: 200,
    },
    progressText: {
      fontSize: 16,
      color: '#ffffffaa',
      marginBottom: 10,
    },
    progressBarContainer: {
      width: '100%',
      height: 8,
      backgroundColor: '#ccc',
      borderRadius: 4,
      overflow: 'hidden',
      marginBottom: 20,
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#007bff',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#007bff',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '700',
    },
  });
  