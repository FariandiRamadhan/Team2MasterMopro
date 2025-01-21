import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Notif from "../components/Notif";
import { handleApiRequest } from "../Utilities/fetch_functions";

export default function MeetingCards(){
    const [isDetailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [dataAgenda, setDataAgenda] = useState([]);
    const handleViewDetails = (meeting) => {
        setSelectedMeeting(meeting);
        setDetailModalVisible(true);
    };

    useEffect(()=>{
        handleApiRequest("/agendas?status=pending&limit=3")
        .then(response => setDataAgenda(response?.data))
        .catch(error => console.error(error));
    }, []);
    
    return (
        <>
        {/* POP UP Notifikasi */}
        <Notif
            isVisible={isDetailModalVisible}
            onClose={() => setDetailModalVisible(false)}
            meeting={selectedMeeting}
        />

        {/* Informasi Meeting */}
        {/* {console.log(dataAgenda)} */}
        {dataAgenda?.length === 0? <View style={styles.meetingCard}><Text style={styles.meetingTitle}>There's no upcoming meeting</Text></View>: null}
        {dataAgenda.map((data, index) => {
            if(data?.status.toLowerCase() == "pending"){

            return (
            <View style={styles.meetingCard} key={data?.agenda_id}>
                <View style={styles.meetingInfo}>
                    <View style={styles.meetingHeader}>
                        <Text style={styles.meetingTitle}>{data?.judul}</Text>
                        <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={() => handleViewDetails({
                            agenda_id       : data?.agenda_id,
                            title           : data?.judul,
                            deskripsi_rapat : data?.deskripsi_rapat,
                            participants    : data?.participants,
                            status          : data?.status,
                            username        : data?.username,
                            date            : data?.meeting_time.tanggal,
                            time            : data?.meeting_time.jam,
                            location        : data?.lokasi
                        })}
                        >
                        <Text style={styles.detailsButtonText}>View Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.meetingDetails}>
                        <Ionicons name="calendar-outline" size={14} color="#808080" />
                        <Text style={styles.meetingDate}>{data?.meeting_time.tanggal}</Text>
                    </View>
                    <View style={styles.meetingDetails}>
                        <Ionicons name="time-outline" size={14} color="#808080" />
                        <Text style={styles.meetingTime}>{data?.meeting_time.jam}</Text>
                    </View>
                    <View style={styles.meetingDetails}>
                        <Ionicons name="location-outline" size={14} color="#808080" />
                        <Text style={styles.meetingLocation}>{data?.lokasi}</Text>
                    </View>
                    <View style={styles.meetingDetails}>
                        <Ionicons name="people-outline" size={14} color="#808080" />
                        <Text style={styles.meetingParticipants}>{data?.participants.length} Participants</Text>
                    </View>
                </View>
            </View>
            )}else if(dataAgenda.length-1 == index){
                return <View style={styles.meetingCard} key={index}><Text style={styles.meetingTitle}>There's no upcoming meeting</Text></View>
            }
        })}
    </>
)}
const styles = StyleSheet.create({
    meetingCard: {
        backgroundColor: '#2C2C2E',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        width: '100%',
    },
    meetingInfo: {
        flex: 1,
    },
    meetingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    meetingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    detailsButton: {
        borderWidth: 1,
        borderColor: '#3A3A3C',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    detailsButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    meetingDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    meetingDate: {
        fontSize: 14,
        color: '#808080',
        marginLeft: 8,
    },
    meetingTime: {
        fontSize: 14,
        color: '#808080',
        marginLeft: 8,
    },
    meetingLocation: {
        fontSize: 14,
        color: '#808080',
        marginLeft: 8,
    },
    meetingParticipants: {
        fontSize: 14,
        color: '#808080',
        marginLeft: 8,
    }
})