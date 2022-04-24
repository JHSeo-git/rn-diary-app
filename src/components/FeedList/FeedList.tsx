import { View, FlatList } from 'react-native';
import { LogT } from '../../helpers/types';
import styles from './FeedList.styles';
import FeedListItem from './FeedListItem';

type FlatListProps = React.ComponentProps<typeof FlatList>;
type FeedListProps = {
  logs: LogT[];
  onScrolledToBottom?: (isBottom: boolean) => void;
  ListHeaderComponent?: FlatListProps['ListHeaderComponent'];
};

const FeedList = ({
  logs,
  onScrolledToBottom,
  ListHeaderComponent,
}: FeedListProps) => {
  console.log({ logs });

  const onScroll: FlatListProps['onScroll'] = e => {
    if (!onScrolledToBottom) {
      return;
    }

    const { contentSize, layoutMeasurement, contentOffset } = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (
      contentSize.height > layoutMeasurement.height &&
      distanceFromBottom < 72
    ) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({ item }) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default FeedList;
