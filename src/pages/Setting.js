import React from 'react'
import { ScrollView, Text, Image } from 'react-native';
import styled from 'styled-components';

function Setting({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView>
                <ProfileView>
                    <Profile>
                        <ProfilePic onPress={() => console.log("Picture")}>
                            {/* TODO: Image License Checking */}
                            {/* <Image style={{width:120, height:120, borderRadius: 75}} source={require('/Users/juwon/Documents/GitHub/Perffy-app/images/ProfileDafault.jpeg')}/> */}
                        </ProfilePic>
                    </Profile>
                </ProfileView>
            </ScrollView>
        </SafeAreaView>
    )
}

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

const ProfileView = styled.View`
    flex: 1;
    padding: 5px;
`;

const Profile = styled.TouchableOpacity`
    width: 100%;
    height: 150px;
    border-radius: 15px;
    border: 1px solid;
    justify-content: center;
`;

const ProfilePic = styled.TouchableOpacity`
    width: 120px;
    height: 120px;
    padding-left:10px;
    border-radius:75px;
    border: 1px solid;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    padding: 0px;
`;

const ProfilePicEdit = styled.View`
    background-color: red;
    width: 50px;
    height: 50px;
    overflow: hidden;
`;


export default Setting; 