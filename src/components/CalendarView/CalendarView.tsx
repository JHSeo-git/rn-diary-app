import { Calendar } from 'react-native-calendars';
import styles from './CalendarView.styes';

type CalendarViewProps = {
  markedDates?: Record<string, { marked: boolean }>;
  selectedDate: string;
  onSelectDate: React.Dispatch<React.SetStateAction<string>>;
};

const CalendarView = ({
  markedDates,
  selectedDate,
  onSelectDate,
}: CalendarViewProps) => {
  const makredSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates?.[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={makredSelectedDate}
      onDayPress={day => onSelectDate(day.dateString)}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
    />
  );
};

export default CalendarView;
