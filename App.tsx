import { NavigationContainer } from '@react-navigation/native';
import { LogContextProvider } from './src/components/LogContext';
import { SearchContextProvider } from './src/components/SearchContext';
import RootStackNavigation from './src/navigations/RootStackNavigation';

function App() {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <LogContextProvider>
          <RootStackNavigation />
        </LogContextProvider>
      </SearchContextProvider>
    </NavigationContainer>
  );
}

export default App;
