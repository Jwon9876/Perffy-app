import React from 'react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

import { Image } from 'react-native';

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SplashPage from './pages/SplashPage';

import Login from './pages/Login'

import OnBoardingFirstPage from './pages/OnBoarding/OnBoardingFirstPage';
import OnBoardingSecondPage from './pages/OnBoarding/OnBoardingSecondPage';

import Home from './pages/Home';

import ReviewWritingPage from './pages/Review/ReviewWritingPage';

import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage'


import Search from './pages/Search';

import Setting from './pages/Settings/Setting'
import EditInterest from './pages/Settings/EditInterest'
import EditProfile from './pages/Settings/EditProfile'

import Review from './pages/Review/Review';
import ReviewDetail from './pages/Review/ReviewDetail';
import CreateReview from './pages/Review/CreateReview';

import HomeIcon from '../src/components/icons/HomeIcon.png';
import EditReviewIcon from '../src/components/icons/EditReviewIcon.png';
import MyPerffyIcon from '../src/components/icons/MyPerffyIcon.png'


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
                    tabBarIcon: () => (
                        (<Image source={HomeIcon} style={{width: 20, height: 20}} />)
                    ),
                    headerShown: false,
                   
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'SearchPage') {
                            return { 
                                display: "none"
                                }
                        }
                        return {
                            display: 'flex',
                            backgroundColor: "#FFFFFF",
                            paddingBottom: "20%",
                        }
                    })(route),
                })}
            />

            {/* TODO */}
            {/* 리뷰쓰기 */}
            <Tab.Screen name="리뷰 쓰기" component={ReviewWritingPage}
                options={{
                    title: '리뷰 쓰기',
                    tabBarIcon: () => (
                        (<Image source={EditReviewIcon} style={{width: 20, height: 20}} />)
                    ),
                    tabBarStyle: {
                        // display: "none"
                    },
                    headerShown: false
                }}
            />
            <Tab.Screen name="마이 퍼피" component={SettingStack}
                options={{
                    title: '마이 퍼피',
                    tabBarIcon: () => (
                        (<Image source={MyPerffyIcon} style={{width: 20, height: 20}} />)
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
            <Stack.Screen name={'ProductPage'} component={ProductPage}/>
        </Stack.Navigator>
    );
};

const SettingStack = ({ navigation, route }) => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={'Setting'} component={Setting} />
            <Stack.Screen name={'EditInterest'} component={EditInterest}/>
            <Stack.Screen name={'EditProfile'} component={EditProfile}/>
        </Stack.Navigator>
    );
};


export default function App() {


    return (
        // 하위 페이지를 여기에 계속 추가할 게 아니라, 하나의 탭바 안에 하나의 스택 단위로 묶어서 탭바안에다가 넣기
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="SplashPage" component={SplashPage} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="OnBoarding" component={OnBoardingStack} options = {{headerShown: false}}/>
                    <Stack.Screen name="BottomTabBar" component={BottomTabBar} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </RecoilRoot>

    );
}