import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { handleWarna } from '../components/statusColors';
import Notif from '../components/Notif';
import Search from '../components/Search';
import Filter from '../components/Filter';
import { handleApiRequest } from '../Utilities/fetch_functions';

export default function ViewAgenda({ route }) {
  let data = "";
  if(typeof route.params !== "undefined"){
    data = route.params;
    console.log(data);
  }
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const { filterMeetings } = Filter();

  // Menyimpan data Fetch
  const [dataAgenda, setDataAgenda] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);

  useEffect(()=>{
    handleApiRequest("/agendas")
    .then(response => {
      setFilteredMeetings(response?.data);
      setDataAgenda(response?.data);
    })
      .catch(error => console.error(error));
  }, [data]);

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setDetailModalVisible(true);
  };

  // Memfilter dan mengembalikan datanya
  const handleSearch = (searchParams) => {
    const filtered = filterMeetings(dataAgenda, searchParams);  
    setFilteredMeetings(filtered);
  };

  return (
    <View style={styles.container}>
      <Notif
        isVisible={isDetailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        meeting={selectedMeeting}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Meeting Agenda</Text>
      </View>

      <View style={styles.searchSection}>
        <Search onSearch={handleSearch} />
      </View>

      <ScrollView style={styles.meetingList}>
        
        {filteredMeetings.map(meeting => (
          <View key={meeting?.agenda_id} style={styles.meetingItem}>
            <Text style={styles.meetingTitle}>{meeting?.judul}</Text>
            <View style={styles.meetingDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color="#0066FF" />
                <Text style={styles.detailText}>{meeting?.meeting_time.tanggal} {meeting?.meeting_time.jam}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color="#0066FF" />
                <Text style={styles.detailText}>{meeting?.lokasi}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={16} color="#0066FF" />
                <Text style={styles.detailText}>{meeting?.participants.length} participants</Text>
              </View>
              <View style={[styles.statusContainer, handleWarna(meeting?.status)?.bgColor]}>
                <Text style={[styles.statusText, handleWarna(meeting?.status)?.color]}>{meeting?.status}</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => handleViewDetails({
                  agenda_id       : meeting?.agenda_id,
                  title           : meeting?.judul,
                  deskripsi_rapat : meeting?.deskripsi_rapat,
                  participants    : meeting?.participants,
                  status          : meeting?.status,
                  username        : meeting?.username,
                  date            : meeting?.meeting_time.tanggal,
                  time            : meeting?.meeting_time.jam,
                  location        : meeting?.lokasi,
                  kesimpulan      : meeting?.kesimpulan_rapat,
                  followUpActions : meeting?.follow_up_actions
              })}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E'
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C2C2E',
    margin: 20,
    padding: 10,
    borderRadius: 8,
  },
  filterButton: {
    padding: 5,
  },
  searchText: {
    color: '#808080',
    fontSize: 16,
  },
  searchButton: {
    padding: 5,
  },
  meetingList: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 20,
  },
  meetingItem: {
    marginBottom: 20,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  meetingDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#808080',
    fontSize: 14,
  },
  statusContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
  },
  viewButton: {
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#2C2C2E',
    marginTop: 20,
  },
  searchSection: {
    zIndex: 1000,
  }
}); 