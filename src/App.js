import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './pages/Home';
import Search from './pages/Search';
import Setting from './pages/Setting'

import Review from './pages/review/Review';
import ReviewDetail from './pages/review/ReviewDetail';
import CreateReview from './pages/review/CreateReview';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
    return (
        <Tab.Navigator initialRouteName="HomeScreen"
            screenOptions={
                {
                    // "tabBarActiveTintColor": "#cb3bff",
                    "tabBarActiveTintColor": "#8c0485",
                    "tabBarLabelStyle": {
                        "fontSize": 12
                    },
                    "tabBarItemStyle": {
                        "height": 60
                    },
                    "tabBarStyle": [
                        {
                            "display": "flex",
                            "backgroundColor": "white"
                        },
                    ],
                }
            }
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    title: '홈',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    headerShown: false
                }}

            />
            <Tab.Screen name="검색" component={Search}
                options={{
                    title: '검색',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen name="설정" component={Setting}
                options={{
                    title: '설정',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="settings" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            // screenOptions={{
            //   headerStyle: {
            //     backgroundColor: 'black',
            //   },
            //   headerTintColor: '#fff',
            //   headerTitleStyle: {
            //     fontWeight: 'bold',
            //   },
            // }}
            >
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="Review" component={Review} options={{ title: "리뷰", headerShown: true }} />
                <Stack.Screen name="ReviewDetail" component={ReviewDetail} options={{ title: "리뷰", headerShown: true }} />
                <Stack.Screen name="CreateReview" component={CreateReview} options={{ title: "리뷰 작성", headerShown: false, }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}