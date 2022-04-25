import { useContext } from 'react';
import { View, useWindowDimensions, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchContext from '../SearchContext';
import styles from './SearchHeader.styles';

const SearchHeader = () => {
  const { width } = useWindowDimensions();
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    return null;
  }

  const { keyword, onChangeText } = searchContext;

  return (
    <View style={[styles.block, { width: width - 32 }]}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요."
        value={keyword}
        onChangeText={onChangeText}
        autoFocus
      />
      <Pressable
        onPress={() => onChangeText('')}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}>
        <Icon name="cancel" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
};

export default SearchHeader;
