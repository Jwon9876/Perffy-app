import React, { useEffect } from 'react';
import { Image, Text } from 'react-native';
import styled from 'styled-components'

import { WithLocalSvg } from 'react-native-svg';
import LoginLogo from '../components/icons/LoginLogo.svg';

import auth from '@react-native-firebase/auth'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import KakaoSDK from '@actbase/react-kakaosdk';

import firestore from '@react-native-firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNickname, userId } from '../store/store';
import { getData } from '../asyncStorage/AsyncStorage';



function Login({navigation}) {

    const [recoilNickname, setRecoilNickname] = useRecoilState(userNickname);
    const [recoilUserId, serRecoilUserId] = useRecoilState(userId);

    const init = async () => await KakaoSDK.init('4509f18ebc0576c5883a7032529cb59c');

    useEffect(() => {
        init()
    }, [])

    // TODO
    async function isUser(userId) {
        await firestore().collection('Users').where('id', '==', userId).get().then(querySnapshot => {
            const result = querySnapshot._docs;

            if (result.length == 0) {
                serRecoilUserId(userId)
                navigation.navigate('OnBoarding')
            } else {
                const storedUserNickname = querySnapshot._docs[0]._data.userNickname;
                setRecoilNickname(storedUserNickname)
                return navigation.replace('BottomTabBar')
            }
        });
    }

    const kakaoLogin = async () => {
        try {
            const tokens = await KakaoSDK.login();
            console.log("토큰 시작")
            console.log(tokens);
            console.log("access token is" + tokens.access_token)

            // DB에 KAKAO 표시 붙이기

            const profile = await KakaoSDK.getProfile();
            console.log(profile);
            isUser(profile.id)
            

            if (tokens.access_token) {
                // return setSns({
                //     type : "kakao",
                //     token : tokens.access_token
                // });
            }

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

