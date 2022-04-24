import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './FloatingWriteButton.styles';

type FloatingWriteButtonProps = {
  hidden?: boolean;
};

const FloatingWriteButton = ({ hidden }: FloatingWriteButtonProps) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    navigation.navigate('Write', {});
  };

  useEffect(() => {
    Animated.spring(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
      tension: 45,
      friction: 5,
    }).start();
  }, [animation, hidden]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 88],
              }),
            },
          ],
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          Platform.OS === 'ios' && {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        android_ripple={{ color: 'white' }}
        onPress={onPress}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
};

export default FloatingWriteButton;
