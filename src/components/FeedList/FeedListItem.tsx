import { Platform, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './FeedListItem.styles';
import { LogT } from '../../helpers/types';
import { formatDate, truncate } from './FeedListitem.helpers';

type FeedListItemProps = {
  log: LogT;
};

const FeedListItem = ({ log }: FeedListItemProps) => {
  const { title, body, date } = log;
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Write', {
      log,
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.block,
        Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' },
      ]}
      android_ripple={{ color: '$ededed' }}
      onPress={onPress}>
      <Text style={styles.date}>{formatDate(date)}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{truncate(body)}</Text>
    </Pressable>
  );
};

export default FeedListItem;
