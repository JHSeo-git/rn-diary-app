import { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LogContext from '../../components/LogContext';

import styles from './WriteScreen.styles';
import type { RootStackScreenProps } from '../../navigations/navigations.types';
import WriteHeader from '../../components/WriteHeader/WriteHeader';
import WriteEditor from '../../components/WriteEditor';

type WriteScreenProps = RootStackScreenProps<'Write'>;

function WriteScreen({ route }: WriteScreenProps) {
  const log = route.params?.log;

  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());
  const navigation = useNavigation();

  const logContext = useContext(LogContext);

  if (!logContext) {
    return null;
  }

  const { onCreate, onModify, onRemove } = logContext;

  const onAskRemove = () => {
    Alert.alert('삭제', '정말로 삭제하시겠어요?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => {
          if (!log?.id) {
            return;
          }

          onRemove(log.id);
          navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  };

  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        title,
        body,
        date: date.toISOString(),
      });
    } else {
      onCreate({
        title,
        body,
        date: date.toISOString(),
      });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default WriteScreen;
