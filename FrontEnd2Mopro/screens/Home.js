import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MeetingCards from '../components/MeetingCards';

const Icon = ({ name, size, color }) => {
  if (Platform.OS === 'web') {
    return <Text style={{ fontSize: size, color: color }}>\u2022</Text>;
  }
  return <Ionicons name={name} size={size} color={color} />;
};

export default function Home() {
  const navigation = useNavigation();

  const handleNewAgenda = () => {
    navigation.navigate('NewAgenda');
  };

  const handleViewAgenda = () => {
    navigation.navigate('ViewAgenda');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}></View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuCard} onPress={handleNewAgenda}>
            <View style={styles.menuContent}>
              <View style={styles.titleContainer}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.menuTitle}>New Agenda</Text>
              </View>
              <Text style={styles.menuSubtitle}>Create a new meeting agenda</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard} onPress={handleViewAgenda}>
            <View style={styles.menuContent}>
              <View style={styles.titleContainer}>
                <Ionicons name="calendar" size={24} color="white" />
                <Text style={styles.menuTitle}>View Agenda</Text>
              </View>
              <Text style={styles.menuSubtitle}>View, filter and edit meeting agenda</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
          <View style={styles.meetingsSection}>
            <MeetingCards/>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuSection: {
    alignItems: 'center',
  },
  menuCard: {
    backgroundColor: '#2C2C2E',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    maxWidth: 500,
  },
  menuContent: {
    alignItems: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 34,
  },
  sectionTitle: {
    width: '100%',
    maxWidth: 500,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'start',
  },
  upcomingSection: {
    alignItems: 'center',
    width: '100%',
    // paddingHorizontal: 20,
  },
  meetingsSection: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  }
});
