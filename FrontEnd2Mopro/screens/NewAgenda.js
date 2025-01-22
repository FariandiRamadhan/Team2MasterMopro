import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { handleApiRequest } from '../Utilities/fetch_functions';
import { statusColors } from '../components/statusColors';
import { dateHandler, timeHandler } from '../Utilities/datetime_functions';

export default function NewAgenda({ route }) {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    judul           : '',
    meeting_time    : {tanggal: "", jam: ""},
    lokasi          : '',
    participants    : '',
    deskripsi_rapat : ''
  });
  const [errorForm, setErrorForm] = useState({
    judul           : '',
    meeting_time    : "",
    lokasi          : '',
    participants    : '',
    deskripsi_rapat : ''
  });
  const [errorAlert, setErrorAlert] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = ()=> {
    console.log(JSON.stringify(form));
    handleApiRequest('/agendas', {
      method  : 'POST',
      body    : JSON.stringify(form)
    }).then(response => {
      if(response.success){
        setForm({
          judul           : '',
          meeting_time    : {tanggal: "", jam: ""},
          lokasi          : '',
          participants    : '',
          deskripsi_rapat : ''
        })
        navigation.navigate('Home', {action: true});
      }
    }).catch(error => {
      if(typeof error[2]?.errors === "undefined"){
        setErrorAlert("Silahkan coba lagi nanti");
      }else{
        setErrorForm({
          judul           : error[2].errors.reason?.judul,
          meeting_time    : error[2].errors.reason?.meeting_time,
          lokasi          : error[2].errors.reason?.lokasi,
          participants    : error[2].errors.reason?.participants,
          deskripsi_rapat : error[2].errors.reason?.deskripsi_rapat,
        })
      }
    });
  }

  const handleDate = (date) => {
    const formattedDate = dateHandler(date);
    const [day, month, year] = formattedDate.split('/');
    setDate(formattedDate);
    setForm({...form, meeting_time: {...form.meeting_time, tanggal: `${year}-${month}-${day}`}});
  }

  const handleTime = (time) => {
    const formattedTime = timeHandler(time);
    setTime(formattedTime);
    setForm({...form, meeting_time:{...form.meeting_time, jam: formattedTime}});
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>New Agenda</Text>
        {errorAlert != ''? (
          <View style={[styles.error, statusColors.bgDanger]}>
            <Text style={[styles.errorMessage, statusColors.danger]}>{errorAlert}</Text>
          </View>  
        ) : null}

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="book-outline" size={20} color="#0066FF" />
            <Text style={styles.label}>Title</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter meeting title"
            placeholderTextColor="#666"
            onChangeText={(title)=> setForm({...form, judul: title})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.judul}</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10, flexBasis: "40%" }]}>
            <View style={styles.labelContainer}>
              <Ionicons name="calendar-outline" size={20} color="#0066FF" />
              <Text style={styles.label}>Date</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="dd/mm/yyyy"
              placeholderTextColor="#666"
              value={date}
              onChangeText={handleDate}
            />
          </View>

          <View style={[styles.formGroup, { flex: 1, marginLeft: 10, flexBasis: "40%" }]}>
            <View style={styles.labelContainer}>
              <Ionicons name="time-outline" size={20} color="#0066FF" />
              <Text style={styles.label}>Time</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="--:--"
              placeholderTextColor="#666"
              value={time}
              onChangeText={handleTime}
            />
          </View>
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.meeting_time}</Text>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="location-outline" size={20} color="#0066FF" />
            <Text style={styles.label}>Location</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter meeting location"
            placeholderTextColor="#666"
            onChangeText={(location)=> setForm({...form, lokasi: location})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.lokasi}</Text>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="people-outline" size={20} color="#0066FF" />
            <Text style={styles.label}>Participants</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter participant names (separated by comma)"
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
            onChangeText={(participants)=> setForm({...form, participants: participants})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.participants}</Text>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="document-text-outline" size={20} color="#0066FF" />
            <Text style={styles.label}>Description</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter meeting description and agenda items"
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
            onChangeText={(deskripsi)=> setForm({...form, deskripsi_rapat: deskripsi})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.deskripsi_rapat}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Create Agenda</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 20 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  content: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#0066FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textError: {
    fontSize: 16,
    paddingTop: 4,
    paddingStart: 8
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
  errorMessage: {
    fontSize: 18,
    textAlign: 'center'
  }
}); 