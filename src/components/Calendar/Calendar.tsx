// components/Calendar.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";

const Calendar: React.FC<CalendarProps> = ({ onDateChange, selectedDate }) => {
  return (
    <RNCalendar
      onDayPress={(day: { dateString: string }) => onDateChange(day.dateString)}
      markedDates={{
        [selectedDate]: { selected: true, selectedColor: "#007BFF" },
      }}
      theme={{
        selectedDayBackgroundColor: "#007BFF",
        todayTextColor: "#007BFF",
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Calendar;
