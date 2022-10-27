import React, { useEffect, useState } from "react";

import { Alert, Image, Text, TextInput } from "react-native";

import styled from "styled-components";

import { WithLocalSvg } from "react-native-svg";
import BackArrowIcon from '../../components/icons/BackArrowIcon.svg'

import DefaultProfilePic from '../../components/icons/Setting/DefaultProfilePic.png';


import { useRecoilValue } from "recoil";
import { userNickname } from "../../store/store";

import storage from '@react-native-firebase/storage';


function EditProfile({ navigation }) {

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

    useEffect(() => {
        getProfilePicUrl()
    }, [])


    return (

        <SafeAreaView>
            <HeaderView>
                <BackArrowBtn
                    onPress={() => navigation.goBack()}
                >
                    <WithLocalSvg
                        width={24}
                        height={24}
                        asset={BackArrowIcon}
                    />
                </BackArrowBtn>

                <HeaderText>
                    프로필 수정
                </HeaderText>

                <BackArrowBtn
                    style={{ width: 24, height: 24 }}
                    disabled={true}
                    onPress={() => navigation.goBack()}
                >
                </BackArrowBtn>
            </HeaderView>

            <ProfileImgEditView>
                <ProfileImg>
                    <Image
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 32
                        }}
                        source={profilePicUrl != "" ? { uri: profilePicUrl } : DefaultProfilePic}
                    />
                </ProfileImg>
            </ProfileImgEditView>
            <NicknameEditView>
                <Text
                    style={{ fontSize: 14, fontWeight: '500', marginLeft: 23, marginTop: 15 }}
                >
                    닉네임
                </Text>

                <TextInput
                    style={{ 
                        height: 34,
                        width: "90%",
                        backgroundColor: '#F8F8F8',
                        marginLeft: 16,
                        marginTop: 10,
                        paddingLeft: 10,
                        borderRadius: 5
                    }}
                    placeholder = {storedUserNickname}
                    onChangeText={(e) => {
                        console.log(e)
                    }
                    }
                    // TODO
                    autoCapitalize="sentences"
                    autoCorrect
                    onSubmitEditing={() => {console.log("Submit !")}}
                />
            </NicknameEditView>
        </SafeAreaView>
    )
}

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

const ScrollView = styled.ScrollView`
    flex: 1;
    background-color: #FFFFFF;
`;

const HeaderView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 0 20px;
`;

const HeaderText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const BackArrowBtn = styled.TouchableOpacity`
`;

const ProfileImgEditView = styled.View`
    align-items: center;
`;

const ProfileImg = styled.View`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background-color: #D9D9D9;
    margin-top: 25px;
`;

const NicknameEditView = styled.View`
`;



const UserNickname = styled.Text`
    color: #212121;
    font-size: 16px;
    font-weight: 500;
    margin-top: 15px;
`;


export default EditProfile;