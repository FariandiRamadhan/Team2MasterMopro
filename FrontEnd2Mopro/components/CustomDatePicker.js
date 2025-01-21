import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDatePicker({ value, onChange, onClose }) {
  const [selectedDate, setSelectedDate] = useState(value);
  const [viewMode, setViewMode] = useState('date'); // 'date', 'month', 'year'
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
    onChange(newDate);
  };

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
    setViewMode('date');
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
    setViewMode('month');
  };

  const renderDateView = () => {
    const daysInMonth = getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear());
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const blanks = Array(firstDayOfMonth).fill(null);

    return (
      <ScrollView style={styles.calendarContainer}>
        <View style={styles.weekDays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Text key={day} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysGrid}>
          {blanks.map((_, index) => (
            <View key={`blank-${index}`} style={styles.dayCell} />
          ))}
          {days.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayCell,
                selectedDate.getDate() === day && styles.selectedDay
              ]}
              onPress={() => handleDateSelect(day)}
            >
              <Text style={[
                styles.dayText,
                selectedDate.getDate() === day && styles.selectedDayText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderMonthView = () => (
    <ScrollView style={styles.monthContainer}>
      {months.map((month, index) => (
        <TouchableOpacity
          key={month}
          style={[
            styles.monthItem,
            selectedDate.getMonth() === index && styles.selectedMonth
          ]}
          onPress={() => handleMonthSelect(index)}
        >
          <Text style={styles.monthText}>{month}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderYearView = () => (
    <ScrollView style={styles.yearContainer}>
      {generateYears().map(year => (
        <TouchableOpacity
          key={year}
          style={[
            styles.yearItem,
            selectedDate.getFullYear() === year && styles.selectedYear
          ]}
          onPress={() => handleYearSelect(year)}
        >
          <Text style={styles.yearText}>{year}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setViewMode('month')}
        >
          <Text style={styles.headerText}>
            {months[selectedDate.getMonth()]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setViewMode('year')}
        >
          <Text style={styles.headerText}>
            {selectedDate.getFullYear()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
        {viewMode === 'date' && renderDateView()}
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'year' && renderYearView()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 280,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
    alignItems: 'center',
  },
  pickerContainer: {
    height: 250,
  },
  calendarContainer: {
    flex: 1,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#2C2C2E',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  monthContainer: {
    flex: 1,
  },
  yearContainer: {
    flex: 1,
  },
  headerButton: {
    marginRight: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    marginLeft: 'auto',
  },
  weekDayText: {
    color: '#808080',
    fontSize: 12,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  selectedDay: {
    backgroundColor: '#0A84FF',
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  monthItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
  },
  monthText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  selectedMonth: {
    backgroundColor: '#0A84FF',
  },
  yearItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
  },
  yearText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  selectedYear: {
    backgroundColor: '#0A84FF',
  },
}); 