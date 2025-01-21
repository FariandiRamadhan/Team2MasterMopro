import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MeetingResult() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Record Meeting Results</Text>
        
        <Text style={styles.subtitle}>
          Recording results for: Weekly Team Sync - 2024-03-25 10:00
        </Text>

        <View style={styles.formSection}>
          <View style={styles.labelContainer}>
            <Image 
              source={require('../assets/icon-true.png')}
              style={styles.icon}
            />
            <Text style={styles.label}>Conclusions</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter meeting conclusions and action items"
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <View style={styles.formSection}>
          <View style={styles.labelContainer}>
            <Image 
              source={require('../assets/icon-true.png')}
              style={styles.icon}
            />
            <Text style={styles.label}>Follow-up Actions</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter any follow-up actions and responsible parties"
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.buttonText}>Save Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contentContainer: {
    width: '80%',
    maxWidth: 500,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 30,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
    tintColor: '#0066FF',
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#0066FF',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 