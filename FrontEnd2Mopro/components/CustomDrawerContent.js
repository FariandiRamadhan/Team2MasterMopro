import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { checkAuthStatus, handleApiRequest } from '../Utilities/fetch_functions';

export default function CustomDrawerContent({ navigation }) {
    const [username, setUsername] = useState('');

    useEffect(()=>{
        checkAuthStatus().then(
              response => {
                if(response){
                  setUsername(response.data?.username);
                }
              }
            ).catch(error => console.error);
    }, [username]);

    const handleCheckout = ()=>{
      handleApiRequest("/users/a", {method: 'DELETE'})
      .then(response => console.log(response))
      .catch(error => console.log(error));
      navigation.navigate('Home', {status: 'logout'});
    }
    return (
      
    <View style={styles.drawerContainer}>
      <View style={styles.sidebarHeader}>
        <Text style={styles.sidebarTitle}>Hi, {username}</Text>
        <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✖</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={24} color="white" />
        <Text style={styles.drawerLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('NewAgenda')}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.drawerLabel}>New Agenda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('ViewAgenda')}>
        <Ionicons name="search-outline" size={24} color="white" />
        <Text style={styles.drawerLabel}>Search Agenda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.drawerItem, { position: 'absolute', bottom: "5%" }]} onPress={handleCheckout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.drawerLabel}>Logout</Text>
      </TouchableOpacity>
    </View>
    );
  }
const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#1C1C1E',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    sidebarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sidebarTitle: {
        color: 'white',
        fontSize: 20, 
        fontWeight: 'bold',
    },  
    closeButtonText: {
        fontSize: 20,  
        color: 'white',
        marginLeft: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    drawerLabel: {
        color: 'white',
        fontSize: 16,
        marginLeft: 15,
    }
});