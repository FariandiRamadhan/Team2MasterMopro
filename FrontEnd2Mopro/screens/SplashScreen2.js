import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeData } from '../Utilities/fetch_functions';

export default function SplashScreen2() {
  const navigation = useNavigation();

  const handleSplashScreen2 = () => {
    storeData("haveSplash", true);
    navigation.replace('MainDrawer'); // Navigasi ke Drawer
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Meeting Agenda</Text>
        <Text style={styles.subText}>"Manage Your Meetings easier"</Text>
        <Text style={styles.progressText}>Ready</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '100%' }]} />
        </View>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleSplashScreen2}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#493e85',
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
    marginBottom: 5,
    marginTop: 200,
  },
  subText: {
    fontSize: 16,
    color: '#ffffffaa',
    marginBottom: 265,
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
