import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { handleApiRequest } from '../Utilities/fetch_functions';
import { statusColors } from '../components/statusColors';
import { dateHandler, timeHandler } from '../Utilities/datetime_functions';

export default function EditAgenda({ route }) {
  const navigation = useNavigation();
  let data = "";
  
  if(typeof route.params !== "undefined"){
    data = route.params?.agenda_id;
  }

  const [form, setForm] = useState({
    agenda_id         : '',
    judul             : '',
    meeting_time      : {tanggal: "", jam: ""},
    lokasi            : '',
    participants      : '',
    deskripsi_rapat   : '',
    status            : 'pending',
    kesimpulan_rapat  : '',
    follow_up_actions : ''
  });

  const [errorForm, setErrorForm] = useState({
    agenda_id         : '',
    judul             : '',
    meeting_time      : '',
    lokasi            : '',
    participants      : '',
    deskripsi_rapat   : '',
    status            : 'pending',
    kesimpulan_rapat  : '',
    follow_up_actions : ''
  });
  const [errorAlert, setErrorAlert] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isShowAdditional, setIsShowAdditional] = useState(false);
  
  const statuses = [
    { id: 'cancelled', label: 'Cancelled', style: {color: statusColors.cancelled, border: statusColors.cancelledBorder, fill: statusColors.cancelledSelected} },
    { id: 'pending', label: 'Pending', style: {color: statusColors.pending, border: statusColors.pendingBorder, fill: statusColors.pendingSelected} },
    { id: 'succeed', label: 'Succeed', style: {color: statusColors.succeed, border: statusColors.succeedBorder, fill: statusColors.succeedSelected} },
  ];
  
  useEffect(() => {
    handleApiRequest(`/agendas/${data}`)
    .then(response => {
        console.log(response);
        const data = response.data[0];

        setForm({
          agenda_id         : data.agenda_id,
          judul             : data.judul,
          meeting_time      : {tanggal: data.meeting_time.tanggal, jam: data.meeting_time.jam},
          lokasi            : data.lokasi,
          participants      : data.participants.toString(),
          deskripsi_rapat   : data.deskripsi_rapat,
          status            : data.status,
          kesimpulan_rapat  : data.kesimpulan_rapat,
          follow_up_actions : data.follow_up_actions
        });
        if(data.status === "succeed"){
          setIsShowAdditional(true);
        }
        setTime(data.meeting_time.jam);
        setDate(data.meeting_time.tanggal);
    }).catch(error => console.error(error));
  }, [route]);

  const handleSubmit = ()=> {
    const formattedDate       = dateHandler(form.meeting_time.tanggal);
    const [day, month, year]  = formattedDate.split('/');
    const formattedTime       = timeHandler(form.meeting_time.jam);
    
    handleApiRequest(`/agendas/${form.agenda_id}`, {
      method  : 'PUT',
      body    : JSON.stringify({
        agenda_id         : form.agenda_id,
        judul             : form.judul,
        meeting_time      : {tanggal: `${year}-${month}-${day}`, jam: formattedTime},
        lokasi            : form.lokasi,
        participants      : form.participants.toString(),
        deskripsi_rapat   : form.deskripsi_rapat,
        status            : form.status,
        kesimpulan_rapat  : form.kesimpulan_rapat,
        follow_up_actions : form.follow_up_actions
      })
    }).then(response => {
      if(response.success){
        navigation.navigate('MainDrawer', {action: true});
      }
    }).catch(error => {
      if(typeof error[2]?.errors === "undefined"){
        setErrorAlert("Silahkan coba lagi nanti");
      }else{
        setErrorForm({
          judul             : error[2].errors.reason?.judul,
          meeting_time      : error[2].errors.reason?.meeting_time,
          lokasi            : error[2].errors.reason?.lokasi,
          participants      : error[2].errors.reason?.participants,
          deskripsi_rapat   : error[2].errors.reason?.deskripsi_rapat,
          status            : error[2].errors.reason?.status,
          kesimpulan_rapat  : error[2].errors.reason?.kesimpulan_rapat,
          follow_up_actions : error[2].errors.reason?.follow_up_actions
        });
      }
    });
  }

  const handleDate = (date) => {
    const formattedDate = dateHandler(date);
    setDate(formattedDate);
    setForm({...form, meeting_time: {...form.meeting_time, tanggal: formattedDate}});
  }

  const handleTime = (time) => {
    const formattedTime = timeHandler(time);
    setTime(formattedTime);
    setForm({...form, meeting_time:{...form.meeting_time, jam: formattedTime}});
  }

  return (
    <View style={styles.container}>
    <ScrollView style={{height: 500}}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Agenda</Text>
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
            value={form.judul}
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
            value={form.lokasi}
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
            value={form.participants}
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
            value={form.deskripsi_rapat}
            onChangeText={(deskripsi)=> setForm({...form, deskripsi_rapat: deskripsi})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.deskripsi_rapat}</Text>
        </View>

        {/* Radio button untuk pilihan status rapat */}
        <View style={[styles.formGroup, styles.radioContainer]}>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status.id}
              style={styles.radioButton}
              onPress={() => {
                setForm({...form, status: status.id});
                if(status.id == "succeed"){
                  setIsShowAdditional(true);
                }else{
                  setIsShowAdditional(false);
                  
                }
              }}
            >
              <View style={[styles.radioCircle, status.style.border]}>
                {form.status === status.id && (
                  <View style={[styles.selectedRb, status.style.fill]} />
                )}
              </View>
              <Text style={[styles.radioText, status.style.color]}>{status.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* kesimpulan rapat dan follow up action hanya bisa dilakukan jika rapat sudah dilaksanakan (succeed) */}
        {isShowAdditional && (
          <>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="document-text-outline" size={20} color="#0066FF" />
              <Text style={styles.label}>Meeting Results</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter Meeting Results"
              placeholderTextColor="#666"
              multiline={true}
              numberOfLines={4}
              value={form.kesimpulan_rapat}
              onChangeText={(deskripsi)=> setForm({...form, kesimpulan_rapat: deskripsi})}
            />
            <Text style={[styles.textError, statusColors.errorText]}>{errorForm.kesimpulan_rapat}</Text>
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Ionicons name="document-text-outline" size={20} color="#0066FF" />
              <Text style={styles.label}>Follow Up Actions</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter meeting description and agenda items"
              placeholderTextColor="#666"
              multiline={true}
              numberOfLines={4}
              value={form.follow_up_actions}
              onChangeText={(deskripsi)=> setForm({...form, follow_up_actions: deskripsi})}
            />
            <Text style={[styles.textError, statusColors.errorText]}>{errorForm.follow_up_actions}</Text>
          </View>
        </>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Edit Agenda</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.navigate("MainDrawer")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 20 }} />
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    flexGrow: 1
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
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
  },
}); 