import React, { useState } from "react";

import styled from 'styled-components';
import SelectDropdown from 'react-native-select-dropdown'


function OnBoardingFirstPage({ navigation }) {

    const sex = ["남성", "여성"]
    const age = [...Array(100)].map((_, i) => i + 1 + "세");

    const [selectedSex, setSelectedSex] = useState("")
    const [selectedAge, setSelectedAge] = useState("")

    return (
        <SafeAreaView>
            <PhaseView>
                <PhaseRectangle />
                <PhasePoint />
                <PhasePoint />
            </PhaseView>

            <TitleText>
                정보를 입력해주세요.
            </TitleText>

            <ContentView>
                <ContentText>
                    성별 및 나이
                </ContentText>

                <DescriptionnText>
                    본 응답은 통계 목적으로만 사용됩니다.
                </DescriptionnText>

                <DetailView>
                    <DetailCell
                        style={{ marginLeft: 12 }}
                    >
                        <DetailText>
                            성별
                        </DetailText>

                        <SelectDropdown
                            buttonStyle={{ width: "85%", height: 40, borderRadius: 10, marginTop: 7, paddingLeft: 20, }}
                            defaultButtonText={"선택해주세요."}
                            buttonTextStyle={{ fontSize: 14 }}
                            dropdownStyle={{ borderRadius: 7 }}
                            rowStyle={{ height: 40 }}
                            selectedRowStyle={{ backgroundColor: "#c4c4c4" }}
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
                        <DetailText>
                            나이
                        </DetailText>


                        <SelectDropdown
                            buttonStyle={{ width: "85%", height: 40, borderRadius: 10, marginTop: 7, paddingLeft: 20 }}
                            defaultButtonText={"선택해주세요."}
                            buttonTextStyle={{ fontSize: 14 }}
                            dropdownStyle={{ borderRadius: 7 }}
                            rowStyle={{ height: 40 }}
                            selectedRowStyle={{ backgroundColor: "#c4c4c4" }}
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

                <DetailText>
                    닉네임
                </DetailText>

                <DetailView
                    style={{ alignItems: "center", marginTop: 10, justifyContent: "space-evenly" }}
                >
                    <NickNameTextInput
                        placeholder="3~8자리의 숫자, 영어, 한글만 가능합니다."
                        placeholderTextColor="#000"
                        style={{ paddingLeft: 5 }}
                        onChangeText={(e) => console.log(e)}
                    >
                    </NickNameTextInput>

                    <NickNameRedundancyCheckBtn
                        onPress={() => console.log("TODO")}
                    >
                        <FreeFormText
                            style={{ fontSize: 14, color: "#3D969C" }}
                        >
                            중복 확인
                        </FreeFormText>
                    </NickNameRedundancyCheckBtn>


                </DetailView>


                <ContentText>
                    프로필 사진 등록
                </ContentText>

                <DescriptionnText>
                    필수 선택사항이 아니며, 기본 프로필 사진이 등록됩니다.
                </DescriptionnText>

                <AddProfileImg>
                    <Add>
                        <PlusX></PlusX>
                        <PlusY></PlusY>

                    </Add>
                </AddProfileImg>
            </ContentView>

            <FooterView
            >
                <NextBtn
                    onPress={() => navigation.navigate('OnBoardingSecondPage')}
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

const DescriptionnText = styled.Text`
    font-size: 10px;
    /* font-weight: 500; */
    margin-left: 16px;
    margin-top: 1px;
    color: #9E9E9E;
`;

const NickNameTextInput = styled.TextInput`
    width: 70%;
    height: 33px;
    border: 1px;
    border-radius: 7px;
`;

const NickNameRedundancyCheckBtn = styled.TouchableOpacity`
    height: 33px;
    width: 70px;
    border-width: 1.5px;
    border-color: #3D969C;
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
    width: 80%;
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
`;

const PlusX = styled.View`
    background-color: #F5F5F5;
    width: 3px;
    height: 6px;
`;

const PlusY = styled.View`
    background-color: #F5F5F5;
    width: 6px;
    height: 3px;
`;

const FreeFormText = styled.Text`
`;



export default OnBoardingFirstPage
