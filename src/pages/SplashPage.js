import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import styled from 'styled-components'

import SplashIcon from '../components/icons/SplashIcon.png'

import firestore from '@react-native-firebase/firestore';

import { storeRefreshToken, getRefreshToken, getUserId } from '../asyncStorage/AsyncStorage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNickname, userId, logInType } from '../store/store';

import AsyncStorage from '@react-native-async-storage/async-storage';


function SplashPage({ navigation }) {

    const [recoilNickname, setRecoilNickname] = useRecoilState(userNickname);

    async function getKakaoUserInfo() {

        var temp = await getUserId()
        // TODO
        // 해당 아이디와 서버에 등록된 토큰을 갖고 있는 아이디의 일치성 여부 확인 필요함 반드시 !!

        await firestore().collection('Users').where('id', '==', `${temp}`).get().then(querySnapshot => {
            const result = querySnapshot._docs;
            const storedUserNickname = querySnapshot._docs[0]._data.userNickname;
            setRecoilNickname(storedUserNickname)
            console.log(result)
        });
    }


    const [refreshToken, setRefreshToken] = useState("")

    const isExistRefreshToken = async () => {
        var temp = await AsyncStorage.getItem('refreshToken')
        getKakaoUserInfo()
        setRefreshToken(temp)
        console.log("456165115")
        console.log(refreshToken)

        if (temp != "notExist" && temp !== undefined && temp !== null && temp != "") {
            return navigation.replace('BottomTabBar')
        } else {
            navigation.replace('Login')
        }
    }

    useEffect(() => {
        isExistRefreshToken()
    }, [])

    return (
        <Container>
            <Image
                source={SplashIcon}
                style={{ width: 77, height: 88 }}
            />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #5ABACA;
`;


const TitleText = styled.Text`
    font-size: 19px;
    margin: 12px 0 6px 0;
`

const WeightedTitleText = (props) => (
    <Text
        style={{
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 15
        }}
    >
        {props.children}
    </Text>
)

const LoginBtn = styled.TouchableOpacity`
`



export default SplashPage;