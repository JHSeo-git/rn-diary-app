import { Text, View } from 'react-native';
import styles from './EmptySearchResult.styles';

const messages = {
  NOT_FOUND: '검색 결과가 없습니다.',
  EMPTY_KEYWORD: '검색어를 입력하세요.',
} as const;

export type EmptySearchResultProps = {
  type: keyof typeof messages;
};

function EmptySearchResult({ type }: EmptySearchResultProps) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>{messages[type]}</Text>
    </View>
  );
}

export default EmptySearchResult;
