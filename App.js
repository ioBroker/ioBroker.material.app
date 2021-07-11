import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <WebView
          source={{ uri: 'https://iobroker.net' }}
          style={{ marginTop: 0 }}
      />
      <Button
          title="Right button"
          onPress={() => Alert.alert('Right button pressed')}
      />
    </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
