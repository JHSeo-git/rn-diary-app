import { View, Pressable, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './TransparentCircleButton.styles';

type TransparentCircleButtonProps = {
  name: string;
  color: string;
  hasMarginRight?: boolean;
  onPress: () => void;
};

const TransparentCircleButton = ({
  name,
  color,
  hasMarginRight,
  onPress,
}: TransparentCircleButtonProps) => {
  return (
    <View
      style={[styles.iconButtonWrapper, hasMarginRight && styles.rightMargin]}>
      <Pressable
        style={({ pressed }) => [
          styles.iconButton,
          Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' },
        ]}
        onPress={onPress}
        android_ripple={{ color: '$ededed' }}>
        <Icon name={name} size={24} color={color} />
      </Pressable>
    </View>
  );
};

export default TransparentCircleButton;
