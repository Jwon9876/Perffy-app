import React from 'react';

import Image from 'react-native'


import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from './pages/Login'

import OnBoardingFirstPage from './pages/OnBoarding/OnBoardingFirstPage';
import OnBoardingSecondPage from './pages/OnBoarding/OnBoardingSecondPage';

import Home from './pages/Home';
import SearchPage from './pages/SearchPage';


import Search from './pages/Search';
import Setting from './pages/Setting'

import Review from './pages/review/Review';
import ReviewDetail from './pages/review/ReviewDetail';
import CreateReview from './pages/review/CreateReview';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
    tabBarActiveTintColor: "#5ABACA",
    tabBarLabelStyle: {
        fontSize: 12
    },
    tabBarItemStyle: {
        height: 60
    },
    tabBarStyle: [
        {
            display: 'flex',
            backgroundColor: "#FFFFFF",
            paddingBottom: "20%",
        },
    ]
}


function BottomTabBar() {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={screenOptions}
        >
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={({ route }) => ({
                    title: '홈',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'SearchPage') {
                            return { display: "none" }
                        }
                        return
                    })(route),
                })}
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


const OnBoardingStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={'OnBoardingFirstPage'} component={OnBoardingFirstPage} />
            <Stack.Screen name={'OnBoardingSecondPage'} component={OnBoardingSecondPage} />
        </Stack.Navigator>
    );
};

const HomeStack = ({ navigation, route }) => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={'Home'} component={Home} />
            <Stack.Screen name={'SearchPage'} component={SearchPage}/>
        </Stack.Navigator>
    );
};


export default function App() {
    return (
        // 하위 페이지를 여기에 계속 추가할 게 아니라, 하나의 탭바 안에 하나의 스택 단위로 묶어서 탭바안에다가 넣기
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name="OnBoarding" component={OnBoardingStack} options = {{headerShown: false}}/> */}
                <Stack.Screen name="BottomTabBar" component={BottomTabBar} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}