import { useContext, useMemo, useState } from 'react';
import { format } from 'date-fns';
import FeedList from '../../components/FeedList';
import LogContext from '../../components/LogContext';
import CalendarView from '../../components/CalendarView';

const CalendarScreen = () => {
  const logContext = useContext(LogContext);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedDates = useMemo(() => {
    if (!logContext) {
      return;
    }
    return logContext.logs.reduce<Record<string, { marked: boolean }>>(
      (acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = { marked: true };
        return acc;
      },
      {},
    );
  }, [logContext]);

  const filteredLogs = logContext?.logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );

  return (
    <FeedList
      logs={filteredLogs ?? []}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      }
    />
  );
};

export default CalendarScreen;
