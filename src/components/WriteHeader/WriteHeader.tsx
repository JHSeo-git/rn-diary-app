import { useReducer } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import TransparentCircleButton from '../TransparentCircleButton';
import styles from './WriteHeader.styles';

type State = {
  mode: 'date' | 'time';
  visible: boolean;
};

type Action = { type: 'open'; mode: State['mode'] } | { type: 'close' };

const initialState: State = { mode: 'date', visible: false };
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'open':
      return {
        mode: action.mode,
        visible: true,
      };
    case 'close':
      return {
        ...state,
        visible: false,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

export type WriteHeaderProps = {
  onSave: () => void;
  onAskRemove: () => void;
  isEditing: boolean;
  date: Date;
  onChangeDate: React.Dispatch<React.SetStateAction<Date>>;
};

function WriteHeader({
  onSave,
  onAskRemove,
  isEditing,
  date,
  onChangeDate,
}: WriteHeaderProps) {
  const navigation = useNavigation();
  const onGoBack = () => {
    navigation.goBack();
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const open = (mode: State['mode']) => dispatch({ type: 'open', mode });
  const close = () => dispatch({ type: 'close' });

  const onConfirm = (selectedDate: Date) => {
    close();
    onChangeDate(selectedDate);
  };

  return (
    <View style={styles.block}>
      <View>
        <TransparentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>
      <View style={styles.buttons}>
        {isEditing && (
          <TransparentCircleButton
            name="delete-forever"
            color="#ef5350"
            hasMarginRight
            onPress={onAskRemove}
          />
        )}
        <TransparentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>
      <View style={styles.center}>
        <Pressable onPress={() => open('date')}>
          <Text>{format(new Date(date), 'PPP', { locale: ko })}</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => open('time')}>
          <Text>{format(new Date(date), 'p', { locale: ko })}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={state.visible}
        mode={state.mode}
        onConfirm={onConfirm}
        onCancel={close}
        date={date}
      />
    </View>
  );
}

export default WriteHeader;
