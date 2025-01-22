import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';

export default function Search({ onSearch }) {
  const [searchTitle, setSearchTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchMode, setSearchMode] = useState('title');
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedPicker, setExpandedPicker] = useState(null);

  const handleSearch = () => {
    if (searchMode === 'date') {
      onSearch({
        title: '',
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      });
    } else {
      onSearch({
        title: searchTitle,
        startDate: '',
        endDate: ''
      });
    }
  };

  const handleTitleChange = (text) => {
    setSearchTitle(text);
    onSearch({
      title: text,
      startDate: '',
      endDate: ''
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    }).replace(/\//g, '/');
  };

  const SearchModeDropdown = () => (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity 
        style={[styles.dropdownItem, searchMode === 'title' && styles.selectedMode]}
        onPress={() => {
          setSearchMode('title');
          setShowDropdown(false);
        }}
      >
        <Text style={styles.dropdownText}>Search by Title</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.dropdownItem, searchMode === 'date' && styles.selectedMode]}
        onPress={() => {
          setSearchMode('date');
          setShowDropdown(false);
        }}
      >
        <Text style={styles.dropdownText}>Search by Date</Text>
      </TouchableOpacity>
    </View>
  );

  const toggleDatePicker = (type) => {
    if (expandedPicker === type) {
      setExpandedPicker(null);
    } else {
      setExpandedPicker(type);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.modeSelector}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.modeSelectorText}>
          {searchMode === 'title' ? 'Search by Title' : 'Search by Date'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#fff" />
      </TouchableOpacity>

      {showDropdown && <SearchModeDropdown />}

      {searchMode === 'title' ? (
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search meeting title..."
            placeholderTextColor="#666"
            value={searchTitle}
            onChangeText={handleTitleChange}
          />
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.dateContainer}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>From:</Text>
            <TouchableOpacity 
              style={[
                styles.dateInput,
                expandedPicker === 'start' && styles.dateInputExpanded
              ]}
              onPress={() => toggleDatePicker('start')}
            >
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
              <Ionicons 
                name={expandedPicker === 'start' ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
            {expandedPicker === 'start' && (
              <CustomDatePicker
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setExpandedPicker(null);
                  onSearch({
                    title: '',
                    startDate: formatDate(date),
                    endDate: formatDate(endDate)
                  });
                }}
                onClose={() => setExpandedPicker(null)}
              />
            )}
          </View>

          <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>To:</Text>
            <TouchableOpacity 
              style={[
                styles.dateInput,
                expandedPicker === 'end' && styles.dateInputExpanded
              ]}
              onPress={() => toggleDatePicker('end')}
            >
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
              <Ionicons 
                name={expandedPicker === 'end' ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
            {expandedPicker === 'end' && (
              <CustomDatePicker
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setExpandedPicker(null);
                  onSearch({
                    title: '',
                    startDate: formatDate(startDate),
                    endDate: formatDate(date)
                  });
                }}
                onClose={() => setExpandedPicker(null)}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    zIndex: 1000,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  modeSelectorText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
    maxHeight: 100,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
  },
  selectedMode: {
    backgroundColor: '#3A3A3C',
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 10,
  },
  searchButton: {
    padding: 5,
  },
  dateContainer: {
    marginTop: 10,
    gap: 10,
  },
  datePickerContainer: {
    width: '100%',
  },
  dateLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  dateInput: {
    backgroundColor: '#1C1C1E',
    borderRadius: 6,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInputExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  expandedPicker: {
    backgroundColor: '#1C1C1E',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: '100%',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
}); 
; 