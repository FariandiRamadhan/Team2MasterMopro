import React, { useState} from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../Utilities/fetch_functions';
import { statusColors } from '../components/statusColors';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [errorLogin, setErrorLogin] = useState("");

  const navigation = useNavigation();

  const handleSignIn = () => {
    if(form.username == "" || form.password == ""){
      setErrorLogin("Password atau Username harus diisi");
    }else{
      loginUser(form.username, form.password).then(
        response => {
          console.log(response);
          if (response.success) {
            navigation.navigate('SplashScreen');
          } else {
            setErrorLogin("Password dan Username tidak ditemukan");
            console.error('Error', data.message || 'Login failed');
          }
        }
      ).catch(error => {
        setErrorLogin("Password dan Username tidak ditemukan")
        console.error(error); 
      });
    }
    setTimeout(() => {
      setErrorLogin("");
    }, 2000);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.66)', alignItems: 'center' }}>
      <View style={styles.header}>
        <Image
          alt="App Logo"
          style={styles.headerImg}
          source={require('../assets/img/logo-login.png')}
        />
        <Text style={styles.title}>Meeting App</Text>
      </View>
      {errorLogin != ''? (
      <View style={[styles.error, statusColors.bgDanger]}>
        <Text style={[styles.errorText, statusColors.danger]}>{errorLogin}</Text>
      </View>  
      ) : null}

      <View style={styles.container}>
        <Text style={styles.title2}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={form.username}
          onChangeText={(text) => setForm({ ...form, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 6,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.71)',
    alignItems: 'center',
    width: '90%',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    maxHeight: 300,
    maxWidth: 500,
  },
  title2: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 5,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    position: 'absolute',
    top: 30, 
    left: 20,
    right: 20,
    paddingBlock: 8,
    paddingInline: 6,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center'
  }
});
