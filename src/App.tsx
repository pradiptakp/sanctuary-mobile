import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './store';

import {Provider as PaperProvider} from 'react-native-paper';

import {AppContainer} from './navigations/stacks/AppStack';
import {globalStyles} from './constants/globalStyles';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistor}>
        <SafeAreaProvider>
          <PaperProvider theme={globalStyles}>
            <StatusBar backgroundColor={globalStyles.colors.primary} />
            <AppContainer />
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
