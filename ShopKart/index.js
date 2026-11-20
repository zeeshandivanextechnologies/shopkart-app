/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Standard React Native CLI registration
AppRegistry.registerComponent(appName, () => App);

// Expo Go registration ('main' is required by Expo Go)
AppRegistry.registerComponent('main', () => App);
