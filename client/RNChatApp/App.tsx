import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSocket} from './src/hooks/useSocket';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {onPressSubmit, onChangeText, messages} = useSocket();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TextInput style={styles.textInput} onChangeText={onChangeText} />

        <Button title="Submit" onPress={onPressSubmit} />

        <View>
          {messages.map(data => {
            return <Text style={styles.textRow}>{data}</Text>;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textRow: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  textInput: {
    height: 50,
    width: '100%',
  },
});

export default App;
