import { createContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import logsStorage from '../../utils/logsStorage';
import type { LogT } from '../../helpers/types';

type LogContextType = {
  logs: LogT[];
  onCreate: ({ title, body, date }: Omit<LogT, 'id'>) => void;
  onModify: (modifed: LogT) => void;
  onRemove: (id: string) => void;
};

const LogContext = createContext<LogContextType | null>(null);

type LogContextProviderProps = {
  children: React.ReactNode;
};

export function LogContextProvider({ children }: LogContextProviderProps) {
  const initialLogRef = useRef<LogT[] | null>(null);
  const [logs, setLogs] = useState<LogT[]>([]);

  const onCreate = ({ title, body, date }: Omit<LogT, 'id'>) => {
    const log: LogT = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  const onModify = (modified: LogT) => {
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  };

  const onRemove = (id: string) => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  };

  useEffect(() => {
    (async () => {
      const savedLogs = await logsStorage.get<LogT[]>();
      if (savedLogs) {
        initialLogRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogRef?.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

  return (
    <LogContext.Provider value={{ logs, onCreate, onModify, onRemove }}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
