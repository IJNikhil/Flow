import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Navigation from './src/navigation/Navigation';

const App: React.FC = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </SafeAreaView>
    </Provider>
  </SafeAreaProvider>
);

export default App;
