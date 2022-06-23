import React, {useState} from 'react'
import { ScrollView, Text, Image} from 'react-native';
import styled from 'styled-components';
import defaultImage from '../../images/ProfileDafault.jpeg'

function Setting({ navigation }) {
 
    // 서버에서 사용자 프로필 불러오고 저장된 이미지 없으면, defualt 이미지 삽입
    const [userImage, setUserImage] = useState('/Users/choejuwon/Documents/GitHub/Perffy-app/images/ProfileDafault.jpeg');



    // db에 사진 저장 후
    // useEffect 사용해서


    return (
        <SafeAreaView>
            <ScrollView>
                <ProfileView>
                    <Profile>
                        <ProfilePic onPress={() => console.log(userImage)}>
                            {/* TODO: Image License Checking */}
                            <Image 
                                style={{width:120, height:120, borderRadius: 75}}
                                // TODO
                                // source={require({userImage})}
                            />
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