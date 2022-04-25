import { useContext } from 'react';
import { View } from 'react-native';
import SearchContext from '../../components/SearchContext';
import LogContext from '../../components/LogContext';
import FeedList from '../../components/FeedList';
import styles from './SearchScreen.styles';
import EmptySearchResult from '../../components/EmptySearchResult';

const SearchScreen = () => {
  const searchContext = useContext(SearchContext);
  const logContext = useContext(LogContext);

  const keyword = searchContext?.keyword ?? '';
  const logs = logContext?.logs ?? [];

  const filtered =
    keyword === ''
      ? []
      : logs.filter(log =>
          [log.title, log.body].some(text => text.includes(keyword)),
        );

  if (keyword === '') {
    return <EmptySearchResult type="EMPTY_KEYWORD" />;
  }

  if (filtered.length === 0) {
    return <EmptySearchResult type="NOT_FOUND" />;
  }

  return (
    <View style={styles.block}>
      <FeedList logs={filtered} />
    </View>
  );
};

export default SearchScreen;
