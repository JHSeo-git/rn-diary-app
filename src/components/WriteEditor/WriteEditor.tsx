import { View, TextInput } from 'react-native';
import React from 'react';
import styles from './WriteEditor.styles';

type WriteEditorProps = {
  title: string;
  body: string;
  onChangeTitle: React.Dispatch<React.SetStateAction<string>>;
  onChangeBody: React.Dispatch<React.SetStateAction<string>>;
};

const WriteEditor = ({
  title,
  body,
  onChangeTitle,
  onChangeBody,
}: WriteEditorProps) => {
  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleInput}
        returnKeyType="next"
        value={title}
        onChangeText={onChangeTitle}
      />
      <TextInput
        placeholder="당신의 오늘을 기록해보세요"
        style={styles.bodyInput}
        multiline
        textAlignVertical="top"
        value={body}
        onChangeText={onChangeBody}
      />
    </View>
  );
};

export default WriteEditor;
