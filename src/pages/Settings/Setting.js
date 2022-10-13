import React, { useEffect, useState } from 'react'

import { Text, Image, Alert } from 'react-native';

import styled from 'styled-components';

import MyReviewIcon from '../../components/icons/Setting/MyReviewIcon.png';
import FavoritePerfumeIcon from '../../components/icons/Setting/FavoritePerfumeIcon.png';
import EditInterestIcon from '../../components/icons/Setting/EditInterestIcon.png';
import EditProfileIcon from '../../components/icons/Setting/EditProfileIcon.png';
import AppSettingIcon from '../../components/icons/Setting/AppSettingIcon.png';
import QnAIcon from '../../components/icons/Setting/QnAIcon.png';
import LogOutIcon from '../../components/icons/Setting/LogOutIcon.png';
import DeleteAccountIcon from '../../components/icons/Setting/DeleteAccountIcon.png';
import DefaultProfilePic from '../../components/icons/Setting/DefaultProfilePic.png';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeRefreshToken } from '../../asyncStorage/AsyncStorage';

import storage from '@react-native-firebase/storage';

import { useRecoilValue } from "recoil";
import { userNickname } from "../../store/store";

function Setting({ navigation }) {

    const storedUserNickname = useRecoilValue(userNickname)

    const [profilePicUrl, setProfilePicUrl] = useState("")

    async function getProfilePicUrl() {
        // await storage().ref(`/UserProfilePics/${}.jpeg`).getDownloadURL()
        await storage().ref(`/UserProfilePics/8:31.jpeg`).getDownloadURL()
            .then((url) => {
                // console.log(url)
                setProfilePicUrl(url)
                return url
            })
            .catch((e) => console.log('Errors while downloading => ', e));
    }

    const doLogout=()=>{
        Alert.alert(
            "로그아웃",
            "로그아웃 하시겠습니까?",
            [
              { 
                text: "로그아웃",
                onPress: () => { 
                    AsyncStorage.removeItem('refreshToken');
                    navigation.replace('Login')
                    } 
                },
              {
                text: "취소",
                onPress: () => console.log("취소")
              }
            ]
        );
    }
    
    useEffect(() => {
        getProfilePicUrl()
    }, [])




    return (
        <SafeAreaView>
            <HeaderView>
                <HeaderText>
                    마이 퍼피
                </HeaderText>
            </HeaderView>

            <ProfileView>
                <ProfileImg>
                    <Image 
                        style={{ 
                            width: 64,
                            height: 64,
                            borderRadius: 32
                         }} 
                        
                        source={profilePicUrl != "" ? {uri: profilePicUrl} : DefaultProfilePic}
                    />
                </ProfileImg>
                <UserNickname>
                    {storedUserNickname}
                </UserNickname>
                <DescriptionText>
                    작성한 리뷰
                    <ColoredText
                        color="#FFA1B2"
                    >
                        0
                    </ColoredText>
                    개
                </DescriptionText>
            </ProfileView>
            <ScrollView>

                {/* TO REMOVE */}

                {/*  TODO fony size 14 */}
                <Cell>
                    <Image style={{ width: 20, height: 20 }} source={MyReviewIcon}/>
                    <Text style = {{fontSize: 16, fontWeight: '500', marginLeft: 10}}> 내 리뷰 </Text>
                </Cell>

                <Cell>
                    <Image style={{ width: 20, height: 20 }} source={FavoritePerfumeIcon}/>
                    <Text style = {{fontSize: 16, fontWeight: '500', marginLeft: 10}}> 찜한 향수 </Text>
                </Cell>

                <Cell
                    onPress = {() => navigation.navigate('EditInterest')}
                >
                    <Image style={{ width: 20, height: 20 }} source={EditInterestIcon}/>
                    <Text style = {{fontSize: 16, fontWeight: '500', marginLeft: 10}}> 관심 향기 설정 </Text>
                </Cell>

                <Cell
                    onPress = {() => navigation.navigate('EditProfile')}
                >
                    <Image style={{ width: 20, height: 20 }} source={EditProfileIcon}/>
                    <Text style = {{fontSize: 16, fontWeight: '500', marginLeft: 10}}> 프로필 수정 </Text>
                </Cell>

                <HrBar></HrBar>

                <Cell>
                    <Image style={{ width: 20, height: 20 }} source={AppSettingIcon}/>
                    <Text style = {{fontSize: 16, fontWeight: '500', marginLeft: 10}}> 앱 설정 </Text>
                </Cell>

                <Cell>
                    <Image style={{ width: 20, height: 20 }} source={QnAIcon}/>
                    <Text style = {{fontSize: 16, fontWeight: '500', marginLeft: 10}}> 문의하기 </Text>
                </Cell>

                <Cell
                    onPress = {() => doLogout() }
                >
                    <Image style={{ width: 20, height: 20 }} source={LogOutIcon}/>
                    <Text style = {{fontSize: 16, fontWeight: '500', marginLeft: 10}}> 로그아웃 </Text>
                </Cell>

                <Cell>
                    <Image style={{ width: 20, height: 20 }} source={DeleteAccountIcon}/>
                    <Text style = {{fontSize: 16, fontWeight: '500', marginLeft: 10}}> 계정 삭제 </Text>
                </Cell>

            </ScrollView>
        </SafeAreaView>
    )
}

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

const ScrollView = styled.ScrollView`
    flex: 1;
`;

const HeaderView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 20px 0 20px;
`;

const HeaderText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const ProfileView = styled.View`
    align-items: center;
`;

const ProfileImg = styled.View`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background-color: #D9D9D9;
    margin-top: 25px;
`;

const UserNickname = styled.Text`
    color: #212121;
    font-size: 16px;
    font-weight: 500;
    margin-top: 15px;
`;

const DescriptionText = styled.Text`
    color: #666666;
    font-size: 12px;
    font-weight: 500;
    margin-top: 5px;
`;

const ColoredText = (props) => (
    <Text
        style={{
            color: props.color
        }}
    >
        {props.children}
    </Text>
)

const Cell = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding-left: 12px;
    height: 48px;
`;

const HrBar = styled.View`
    width: 100%;
    height: 7px;
    background-color: #F8F8F8;
`;

export default Setting; 