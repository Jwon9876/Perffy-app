import React, { useEffect, useState } from "react";
import { Image } from "react-native";


import styled from 'styled-components';
import SelectDropdown from 'react-native-select-dropdown'
import { Alert, TouchableOpacity } from "react-native";

import { launchImageLibrary } from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userId, userNickname } from '../../store/store';




function OnBoardingFirstPage({ navigation }) {

    const storedUserId = useRecoilValue(userId)
    const [recoilNickname, setRecoilNickname] = useRecoilState(userNickname);

    const [userInformation, setUserInformation] = useState({
        sex: selectedSex,
        age: selectedAge,
        nickname: nickname,
        userId: storedUserId,
        userProfilePic: userProfilePic
    })

    const sex = ["남성", "여성"];
    // const age = [...Array(100)].map((_, i) => i + 1 + "세");
    const age = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];

    const [selectedSex, setSelectedSex] = useState("");
    const [selectedAge, setSelectedAge] = useState("");

    const [nickname, setNickname] = useState("");
    const [nicknameRedundancy, setNicknameRedundancy] = useState(false);

    const [userProfilePic, setUserProfilePic] = useState("");

    const nicknameRedundancyCheckEnalbleStyle = {
        height: 33,
        width: 70,
        borderWidth: 1.5,
        borderColor: "#3D969C",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    }

    const nicknameRedundancyCheckDisalbleStyle = {
        height: 33,
        width: 70,
        borderWidth: 1.5,
        borderColor: "#ECECEC",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    }

    const nicknameRedundancyCheckEnalbleTextStyle = {
        fontSize: 14,
        color: "#3D969C"
    }

    const nicknameRedundancyCheckDisalbleTextStyle = {
        fontSize: 14,
        color: "#ECECEC"
    }


    function validationCheck({ selectedSex, selectedAge, nickname }) {

        // TODO
        // 특수문자 제외
        // 공백 제외


        if (selectedSex == "") {
            Alert.alert("성별을 입력해주세요.");
        } else if (selectedAge == "") {
            Alert.alert("나이를 입력해주세요.");
        } else if (nickname == "") {
            Alert.alert("닉네임 입력해주세요.");
        } else if (nicknameRedundancy == false) {
            Alert.alert("닉네임 중복확인을 해주세요.")
        }
        else {
            return navigation.navigate('OnBoardingSecondPage', { userInformation })
        }
    }

    async function nicknameRedundancyCheck(nickname) {
        await firestore().collection('Users').where('userNickname', '==', nickname).get().then(querySnapshot => {
            const result = querySnapshot._docs;
            if (result.length == 0) {
                setNicknameRedundancy(true)
                setRecoilNickname(nickname)
                Alert.alert("사용가능한 닉네임입니다.")
            } else {
                Alert.alert("이미 사용 중인 닉네임입니다.")
            }
            // querySnapshot.forEach(doc => {
            //     let data = doc.data();
            //     console.log(data)
            // })
        });
    }

    const ShowPicker = () => {
          launchImageLibrary({}, (res)=>{
            try{
                console.log(res.assets[0].uri)
                setUserProfilePic(res.assets[0].uri)
                const formdata = new FormData()
                formdata.append('file', res.assets[0].uri);
                console.log(res);
            } catch{
                console.log("not selected")
            }

          })
      }

    useEffect(() => {
        setUserInformation({
            sex: selectedSex,
            age: selectedAge,
            nickname: nickname,
            userId: storedUserId,
            userProfilePic: userProfilePic
        })
    }, [selectedSex, selectedAge, nickname, userProfilePic]);

    return (
        <SafeAreaView>
            <PhaseView>
                <PhaseRectangle />
                <PhasePoint />
            </PhaseView>

            <TitleText>
                정보를 입력해주세요.
            </TitleText>

            <ContentView>
                <ContentText>
                    성별 및 나이
                </ContentText>

                <DescriptionText>
                    본 응답은 통계 목적으로만 사용됩니다.
                </DescriptionText>

                <DetailView>
                    <DetailCell
                        style={{ marginLeft: 12 }}
                    >
                        <SelectDropdown
                            buttonStyle={{ width: "85%", height: 40, borderRadius: 10, marginTop: 15, paddingLeft: 20, backgroundColor: "#F8F8F8" }}
                            defaultButtonText={"선택해주세요."}
                            buttonTextStyle={{ fontSize: 14 }}
                            dropdownStyle={{ borderRadius: 7 }}
                            rowStyle={{ height: 40 }}
                            selectedRowStyle={{ backgroundColor: "#F8F8F8" }}
                            data={sex}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setSelectedSex(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />

                    </DetailCell>
                    <DetailCell
                        style={{ marginLeft: 12 }}
                    >
                        <SelectDropdown
                            buttonStyle={{ width: "85%", height: 40, borderRadius: 10, marginTop: 15, paddingLeft: 20, backgroundColor: "#F8F8F8" }}
                            defaultButtonText={"선택해주세요."}
                            buttonTextStyle={{ fontSize: 14 }}
                            dropdownStyle={{ borderRadius: 7 }}
                            rowStyle={{ height: 40 }}
                            selectedRowStyle={{ backgroundColor: "#F8F8F8" }}

                            data={age}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setSelectedAge(selectedItem)

                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </DetailCell>
                </DetailView>


                <ContentText>
                    닉네임 설정
                </ContentText>
                <DetailView
                    style={{ alignItems: "center", marginTop: 10, justifyContent: "space-evenly" }}
                >
                    <NicknameTextInput
                        placeholder="3~8자리의 숫자, 영어, 한글만 가능합니다."
                        placeholderTextColor="#9E9E9E"
                        style={{ paddingLeft: 5 }}
                        onChangeText={(e) => {
                            setNicknameRedundancy(false)
                            setNickname(e)
                        }
                        }
                    >
                    </NicknameTextInput>

                    <TouchableOpacity
                        style={
                            (
                                nicknameRedundancy
                            ) ? (
                                nicknameRedundancyCheckDisalbleStyle
                            ) : (
                                nicknameRedundancyCheckEnalbleStyle
                            )
                        }
                        onPress={() => {
                            console.log(nickname)
                            if (nickname == "") {
                                Alert.alert("닉네임을 입력해주세요")
                            } else {
                                nicknameRedundancyCheck(nickname)
                            }
                        }
                        }
                    >
                        <FreeFormText
                            style={
                                (
                                    nicknameRedundancy
                                ) ? (
                                    nicknameRedundancyCheckDisalbleTextStyle
                                ) : (
                                    nicknameRedundancyCheckEnalbleTextStyle
                                )
                            }
                        >
                            중복 확인
                        </FreeFormText>
                    </TouchableOpacity>


                </DetailView>


                <ContentText>
                    프로필 사진 등록
                </ContentText>

                <DescriptionText>
                    필수 선택사항이 아니며, 기본 프로필 사진이 등록됩니다.
                </DescriptionText>

                <AddProfileImg
                    onPress = {() => ShowPicker()}
                >
                    {
                        (
                            userProfilePic == ""
                        ) ? (
                            <Add>
                                <PlusY></PlusY>
                                <PlusX></PlusX>
                                <PlusY></PlusY>
                            </Add>
                        ) : (
                            <Image
                                style={{ width: 108, height: 108, borderRadius: 54}}
                                source={{uri: userProfilePic}}
                            />
                        )
                    }



                    {/* 
                    
                    */}


                </AddProfileImg>
            </ContentView>

            <FooterView
            >
                <NextBtn
                    onPress={() => validationCheck({ selectedSex, selectedAge, nickname })}
                >
                    <NextBtnText>
                        다음 단계
                    </NextBtnText>
                </NextBtn>
            </FooterView>
        </SafeAreaView>
    )
}


const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`

const PhaseView = styled.View`
    width: 100%;
    height: 40px;
    flex-direction: row;
    margin-top: 40px;
    padding-left: 16px;
`

const PhaseRectangle = styled.View`
    width: 20px;
    height: 7px;
    background-color: #3D969C;
    margin-right: 5px;
    border-radius: 3.5px;
`

const PhasePoint = styled.View`
    width: 7px;
    height: 7px;
    background-color: #D9D9D9;
    margin-right: 5px;
    border-radius: 3.5px;
`

const TitleText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-left: 16px;
`;

const ContentView = styled.View``;

const DetailView = styled.View`
    flex-direction: row;
    justify-content: flex-start;
`;

const DetailCell = styled.View`
    width: 40%;
`;

const ContentText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    margin-left: 16px;
    margin-top: 35px;
`;

const DescriptionText = styled.Text`
    font-size: 10px;
    /* font-weight: 500; */
    margin-left: 16px;
    margin-top: 1px;
    color: #9E9E9E;
`;

const NicknameTextInput = styled.TextInput`
    width: 70%;
    height: 33px;
    border-radius: 7px;
    background-color: #F8F8F8;
`;

const NicknameRedundancyCheckEnalbleBtn = styled.TouchableOpacity`
    height: 33px;
    width: 70px;
    border-width: 1.5px;
    border-color: #3D969C;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
`;

const NicknameRedundancyCheckDisalbleBtn = styled.TouchableOpacity`
    height: 33px;
    width: 70px;
    border-width: 1.5px;
    /* border-color: #3D969C; */
    border-radius: 7px;
    justify-content: center;
    align-items: center;
`;


// TODO
const FooterView = styled.View`
    justify-content: center;
    align-items: center;
    /* bottom: 30px; */
    width: 100%;
    /* position: absolute; */

    flex: 1;
    justify-content: flex-end;
`;

const NextBtn = styled.TouchableOpacity`
    width: 85%;
    height: 45px;
    background-color: #3D969C;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const NextBtnText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
`;

const DetailText = styled.Text`
    font-size: 12px;
    margin-left: 16px;
    margin-top: 20px;
    color: #666666;
`;

const AddProfileImg = styled.TouchableOpacity`
    width: 108px;
    height: 108px;
    border-radius: 54px;
    background-color: #F5F5F5;
    margin-left: 16px;
    margin-top: 18px;
    justify-content: center;
    align-items: center;
`;

const Add = styled.View`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: #DCDCDC;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: row;
`;

const PlusX = styled.View`
    background-color: #F5F5F5;
    width: 3px;
    height: 8px;
`;

const PlusY = styled.View`
    background-color: #F5F5F5;
    width: 3px;
    height: 3px;
`;

const FreeFormText = styled.Text`
`;



export default OnBoardingFirstPage
