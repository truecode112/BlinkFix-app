/**
 * @format
 */
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store, {persistor} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {AppRegistry, LogBox, Text} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {linking} from './linking';
import {PersistGate} from 'redux-persist/integration/react';

const MainComponent = () => {
  SystemNavigationBar.setNavigationColor('transparent');
  SystemNavigationBar.stickyImmersive();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Text>waiting to presist</Text>}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => MainComponent);
