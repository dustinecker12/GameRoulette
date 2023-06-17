import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const IdHelpScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC',
        }}
      />
    </View>
  );
};

export default IdHelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
