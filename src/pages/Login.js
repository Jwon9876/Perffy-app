import React, {useEffect} from 'react';
import styled from 'styled-components'

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'


function Login(){


    const googleSigninConfigure = () => {
        GoogleSignin.configure({
          webClientId:
            '956427024713-p7ho1l49issvrjlvag80iubmgt8mu33v.apps.googleusercontent.com',
        })
      }

      const onGoogleButtonPress = async () => {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

      useEffect(() => {
        googleSigninConfigure()
      }, [])


    return(
        <Wrapper>
            
            <LoginBtn
                onPress={() => onGoogleButtonPress()}
            >

            </LoginBtn>

        </Wrapper>
    )

}

export default Login;

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const LoginBtn = styled.TouchableOpacity`
    width: 150px;
    height: 50px;
    border: 1px solid;
`   

const InnerText = styled.Text`
    font-size: 25px;
`