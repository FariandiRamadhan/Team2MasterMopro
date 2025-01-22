import { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { handleWarna } from '../components/statusColors';
import Delete from './Delete';
import { handleApiRequest } from '../Utilities/fetch_functions';

export default function Notif({ isVisible, onClose, meeting }) {
  const navigation = useNavigation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEditAgenda = () => {
    navigation.navigate('EditAgenda', {agenda_id: meeting?.agenda_id});
    onClose();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    handleApiRequest(`/agendas/${meeting?.agenda_id}`, {method: 'DELETE'})
    .then(response => {
      console.dir(response);
      navigation.setParams({action: true})
    })
    .catch(error => console.error(error));
    onClose();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalTitleContainer}>
                  <Ionicons name="document-text-outline" size={24} color="white" />
                  <Text style={styles.modalTitle}>Meeting Details</Text>
                </View>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalMeetingTitle}>{meeting?.title}</Text>
              
              {/* Secara otomatis memilih warna sesuai status */}
              <View style={[styles.statusBadge, handleWarna(meeting?.status)?.bgColor]}>
                <Text style={[styles.statusText, handleWarna(meeting?.status)?.color]}>{meeting?.status}</Text>
              </View>
            <ScrollView style={{height: 300}}>
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                  {meeting?.deskripsi_rapat}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={20} color="#808080" />
                <Text style={styles.detailText}>{meeting?.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={20} color="#808080" />
                <Text style={styles.detailText}>{meeting?.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={20} color="#808080" />
                <Text style={styles.detailText}>{meeting?.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="person-outline" size={20} color="#808080" />
                <Text style={styles.detailText}>Organized by {meeting?.username}</Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Participants</Text>
                <View style={styles.participantsList}>
                  {
                  meeting?.participants.map((participant, index) =>{
                    return (
                      <View style={styles.participantBadge} key={index}>
                        <Text style={styles.participantText}>{participant}</Text>
                      </View>                    
                    );
                  })
                }
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Kesimpulan Rapat</Text>
                <View style={styles.detailRow}>
                  <Ionicons name="document-attach-outline" size={20} color="#808080" />
                  <Text style={styles.detailText}>{meeting?.kesimpulan == null? "Tidak ada": meeting?.kesimpulan}</Text>
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Follow Up Actions</Text>
                <View style={styles.detailRow}>
                  <Ionicons name="documents-outline" size={20} color="#808080" />
                  <Text style={styles.detailText}>{meeting?.followUpActions == null? "Tidak ada": meeting?.followUpActions}</Text>
                </View>
              </View>  
              
            </ScrollView>
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={handleEditAgenda}
                >
                  <Text style={styles.editButtonText}>Edit Agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => setShowDeleteConfirm(true)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>

      <Delete 
        isVisible={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalMeetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 14,
  },
  modalSection: {
    marginVertical: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#808080',
    fontSize: 14,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 10,
  },
  detailText: {
    color: '#808080',
    fontSize: 14,
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantBadge: {
    backgroundColor: '#2C2C2E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  participantText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FFB800',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 