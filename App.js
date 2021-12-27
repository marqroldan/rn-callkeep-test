/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppRegistry,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const _requestAudioPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: 'Need permission to access microphone',
      message: 'To run this demo we need permission to access your microphone',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
};

const _requestCameraPermission = () => {
  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    title: 'Need permission to access camera',
    message: 'To run this demo we need permission to access your camera',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  });
};

const App: () => React$Node = () => {
  useEffect(() => {
    const settings = notifee.requestPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging()
      .getToken()
      .then((token) => {
        console.log('Device Token', token);
      })
      .catch((err) => {
        console.log('Device Token::Error', err);
      });

    _requestAudioPermission();

    _requestCameraPermission();

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

function FullScreenComponent(): any {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>FullScreen Launch Activity ???? </Text>
    </View>
  );
}

AppRegistry.registerComponent('application', () => FullScreenComponent);

AppRegistry.registerComponent('custom', () => FullScreenComponent);
