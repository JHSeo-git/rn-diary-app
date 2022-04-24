import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigation from '../MainTabNavigation';
import WriteScreen from '../../screens/WriteScreen';
import type { RootStackParamList } from '../navigations.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigation;
