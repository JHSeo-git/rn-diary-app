import { View } from 'react-native';
import React, { useContext, useState } from 'react';
import LogContext from '../../components/LogContext';
import styles from './FeedsScreen.styles';
import FeedList from '../../components/FeedList';
import FloatingWriteButton from '../../components/FloatingWriteButton';

const FeedsScreen = () => {
  const logContext = useContext(LogContext);
  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = (isBottom: boolean) => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

  return (
    <View style={styles.block}>
      <FeedList
        logs={logContext?.logs ?? []}
        onScrolledToBottom={onScrolledToBottom}
      />
      <FloatingWriteButton hidden={hidden} />
    </View>
  );
};

export default FeedsScreen;
