import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigations.types';
import FeedsScreen from '../../screens/FeedsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#009688',
      }}>
      <Tab.Screen
        name="Feeds"
        component={FeedsScreen}
        options={{
          title: '피드',
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-stream" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={() => <></>}
        options={{
          title: '달력',
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={() => <></>}
        options={{
          title: '검색',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigation;
