import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import styled from 'styled-components'

import { WithLocalSvg } from 'react-native-svg';
import LoginLogo from '../components/icons/LoginLogo.svg';

import auth from '@react-native-firebase/auth'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import KakaoSDK from '@actbase/react-kakaosdk';

import firestore from '@react-native-firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNickname, userId, logInType } from '../store/store';

import { storeRefreshToken, getRefreshToken, storeUserId } from '../asyncStorage/AsyncStorage';

// TO REMOVE

import dayjs from 'dayjs';
import moment from 'moment';



function Login({navigation}) {

    const init = async () => await KakaoSDK.init('4509f18ebc0576c5883a7032529cb59c');

    const [recoilNickname, setRecoilNickname] = useRecoilState(userNickname);
    const [recoilUserId, setRecoilUserId] = useRecoilState(userId);
    const [recoilLogInType, setRecoilLogInType] = useRecoilState(logInType);

    const [refreshToken, setRefreshToken] = useState("")

    const isExistRefreshToken = async () => {
        var temp = await getRefreshToken()
        setRefreshToken(temp)
    }

    useEffect(() => {
        init();
        isExistRefreshToken()
        console.log(refreshToken)
        // if (isExistRefreshToken !== "notExist"){
        //     return navigation.replace('BottomTabBar')
        // }
    }, [])


    async function isKakaoUser(userId) {
        await firestore().collection('Users').where('id', '==', `kakao${userId}`).get().then(querySnapshot => {
            const result = querySnapshot._docs;

            if (result.length == 0) {
                setRecoilUserId(userId)
                // signInType
                // 토큰 값
                setRecoilLogInType("kakao")
                navigation.navigate('OnBoarding')
            } else {
                const storedUserNickname = querySnapshot._docs[0]._data.userNickname;
                setRecoilNickname(storedUserNickname)
                storeUserId(`kakao${userId}`)
                return navigation.replace('BottomTabBar')

                // 리프레쉬 토큰 비교
                // const isExistRefreshToken = getRefreshToken()
                // if (isExistRefreshToken !== "notExist"){
                //     return navigation.replace('BottomTabBar')
                // }


            }
        });
    }

    // TODO
    async function isKakaoLogined(userId) {
        await firestore().collection('Users').where('id', '==', userId).where('signInType', '==', 'kakao').get().then(querySnapshot => {
            const result = querySnapshot._docs;

            if (result.length == 0) {
                setRecoilUserId(userId)
                navigation.navigate('OnBoarding')
            } else {
                const storedUserNickname = querySnapshot._docs[0]._data.userNickname;
                setRecoilNickname(storedUserNickname)
                
                const isExistRefreshToken = getRefreshToken()
                if (isExistRefreshToken !== "notExist"){}


                // 리프레쉬 토큰 비교

                // return navigation.replace('BottomTabBar')
            }
        });
    }

    const kakaoLogin = async () => {
        try {
            const tokens = await KakaoSDK.login();
            console.log("토큰 시작")
            console.log(tokens);

            let nowTime = moment().unix()
            let refreshTime = tokens.refresh_token_expires_in
            let addedTime = nowTime + refreshTime + 9 * 60 * 60
            
            console.log(nowTime)
            console.log(refreshTime)
            console.log(moment.unix(addedTime))

            await storeRefreshToken(JSON.stringify(moment.unix(addedTime)))
            isExistRefreshToken()
            console.log(refreshToken)

            // 액세스 토큰 비교

            // A 토큰이 존재하고, 익스파이어 되지 않은 경우
            // B 그렇지 않은 경우

            const profile = await KakaoSDK.getProfile();
            
            setRecoilLogInType("kakao")

            console.log(profile);
            isKakaoUser(profile.id)
            
        } catch (e) {
            console.log("카카오에러 ");
            console.log(e);
        }
    }
    
    const googleSigninConfigure = () => {
        GoogleSignin.configure({
            webClientId:
                '956427024713-p7ho1l49issvrjlvag80iubmgt8mu33v.apps.googleusercontent.com',
        })
    }

    const onGoogleButtonPress = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);
        } catch {
            console.log("Google Login is not completed")
        }

    }

    useEffect(() => {
        googleSigninConfigure()
    }, [])


    return (
        <Container>
            <WithLocalSvg
                width={74}
                height={74}
                asset={LoginLogo}
            />

            <TitleText>
                간편로그인으로
            </TitleText>

            <WeightedTitleText>
                Perffy를 즐겨보세요 !
            </WeightedTitleText>



            {/* <GoogleSigninButton onPress={() => onGoogleButtonPress()}/> */}
            <LoginBtn
                onPress={() => kakaoLogin()}
            >
                <Image
                    style={{ marginRight: 5 }}
                    source={require('../components/icons/KakaoLoginBtn.png')}
                />
            </LoginBtn>
        </Container>
    )

}

export default Login;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
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

