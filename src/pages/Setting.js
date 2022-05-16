import React from 'react'
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components';

function Setting({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView>
                <ProfileView>
                    <Profile>
                        <ProfilePic>
                            <ProfilePicEdit>

                            </ProfilePicEdit>
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
    border-radius: 5px;
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
`;

const ProfilePicEdit = styled.View`
    background-color: red;
    width: 50px;
    height: 50px;
    overflow: hidden;
`;


export default Setting; 