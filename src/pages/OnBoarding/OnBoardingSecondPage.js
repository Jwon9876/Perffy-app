import React, { useState } from "react";

import { Alert, Image, Text } from "react-native";

import styled from "styled-components";

import dayjs from "dayjs"

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import Woody from '../../components/icons/Woody.png'
import Citrus from '../../components/icons/Citrus.png'
import Musk from '../../components/icons/Musk.png'
import Leather from '../../components/icons/Leather.png'
import Floral from '../../components/icons/Floral.png'
import Green from '../../components/icons/Green.png'
import Aqua from '../../components/icons/Aqua.png'
import Oriental from '../../components/icons/Oriental.png'

import { useRecoilValue } from 'recoil';
import { userId, logInType } from "../../store/store"


function OnBoardingSecondPage({ navigation, route }) {

    const sex = route.params.userInformation["sex"]
    const age = route.params.userInformation["age"]
    const nickname = route.params.userInformation["nickname"]
    const userProfilePic = route.params.userInformation["userProfilePic"]
    const id = useRecoilValue(userId)
    const clickedLogInType = useRecoilValue(logInType)


    {/*
        관심 향수 선택할 때, 애초에 눈에 안보이는 border를 그어놓고,
        선택되면 색만 바뀌게 하기 =
    */}
    

    const perfumeTag = ["우디", "시트러스", "머스크", "레더", "플로럴", "그린", "아쿠아", "오리엔탈"];
    const perfumeTagImage = [Woody, Citrus, Musk, Leather, Floral, Green, Aqua, Oriental]
    const perfumeTagDescription = [
        "숲속에 있는 나무향",
        "레몬, 오렌지와 같은 상큼함",
        "살냄새가 나는 달달함과 묵직한 향",
        "고급진 가죽향",
        "달콤한 꽃향",
        "막 베어낸 풀과 나뭇잎의 향",
        "바다를 연상시키는 상쾌하고 시원한 향",
        "따뜻하고 이국적이며 관능적인 느낌의 향",
    ]

    const [selectedTagList, setSelectedTagList] = useState([]);

    const pressdTagStyle = {
        // fontSize: 12,
        // backgroundColor: "#5ABACA",
        // marginTop: 12,
        // marginLeft: 5,
        // padding: 3,
        borderWidth: 1.5,
        borderColor: "#5ABACA",
    }

    const notPressdTagStyle = {
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    }

    const pressdTextStyle = {
        fontSize: 14,
        color: "#5ABACA",
        width: 100,
        height: 20
    }

    const notPressdTextStyle = {
        fontSize: 14,
        width: 100,
        height: 20
    }

    const pressdTagDescriptionStyle = {
        fontSize: 12,
        color: "#5ABACA",
        width: 100,
        height: 50
    }

    const notPressdTagDescriptionStyle = {
        fontSize: 12,
        // color: "#5ABACA",
        width: 100,
        height: 50
    }

    function insertTag(tag) {
        if (selectedTagList.some((v) => v == tag)) {
            setSelectedTagList(selectedTagList.filter(v => v !== tag));
            return
        }
        setSelectedTagList([...selectedTagList, tag])
    }

    async function submitUserInfo() {
        await firestore().collection('Users')
            .doc()
            .set({
                age: age,
                sex: sex,
                userNickname: nickname,
                interest: selectedTagList,
                id: id,
                logInType: clickedLogInType,
            })
            .then(() => {
                console.log('Review registered!');

                navigation.replace('BottomTabBar')
            });
    }

    async function uploadUserProfilePic(){
        const reference = storage().ref('black-t-shirt-sm.png');
        const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
        await reference.putFile(pathToFile);
    }

    function validationCheck() {
        if (selectedTagList.length < 3) {
            Alert.alert("태그를 3개 이상 선택해주세요");
        } else {
            console.log(selectedTagList)
            console.log(sex, age, nickname)
            submitUserInfo()
        }
    }


    return (

        <SafeAreaView>
            <ScrollView>
                <PhaseView>
                    <PhasePoint />
                    <PhaseRectangle />
                </PhaseView>

                <TitleText>
                    관심 향수를 선택해주세요
                </TitleText>

                <DescriptionText
                    style={{ fontSize: 12, marginTop: 30 }}
                >
                    * 3가지 이상 선택해주세요
                </DescriptionText>
                <PerfumeTagView>

                    {
                        perfumeTag.map((v, i) =>
                            <PerfumeTagInnerView key={v}>
                                <PerfumeTag
                                    style={
                                        (
                                            selectedTagList.includes(v)
                                        ) ? (
                                            pressdTagStyle
                                        ) : (
                                            notPressdTagStyle
                                        )
                                    }
                                    onPress={() => insertTag(v)}
                                >

                                    <Image
                                        style={{width: 100, height: 100 }}
                                        source={perfumeTagImage[i]}
                                    />
                                </PerfumeTag>
                                <DescriptionText
                                    style={
                                        (
                                            selectedTagList.includes(v)
                                        ) ? (
                                            pressdTextStyle
                                        ) : (
                                            notPressdTextStyle
                                        )
                                    }
                                >
                                    {v}
                                </DescriptionText>

                                <DescriptionText
                                    style={
                                        (
                                            selectedTagList.includes(v)
                                        ) ? (
                                            pressdTagDescriptionStyle
                                        ) : (
                                            notPressdTagDescriptionStyle
                                        )
                                    }
                                >
                                    {perfumeTagDescription[i]}
                                </DescriptionText>
                            </PerfumeTagInnerView>


                        )
                    }

                </PerfumeTagView>
            </ScrollView>
            <FooterView
            >
                <PreviousBtn
                    onPress={() => navigation.goBack()}
                >
                    <PreviousBtnText>
                        이전으로
                    </PreviousBtnText>
                </PreviousBtn>

                <NextBtn
                    onPress={() => validationCheck()}
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
`;

const ScrollView = styled.ScrollView`
    flex: 1;
    background-color: #FFFFFF;
`;

const TitleText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-left: 16px;
`;

const DescriptionText = styled.Text`
    font-size: 10px;
    /* font-weight: 500; */
    margin-left: 16px;
    margin-top: 1px;
    color: #9E9E9E;
`;

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

const FooterView = styled.View`
    flex-direction: row;
    background-color: #FFFFFF;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const NextBtn = styled.TouchableOpacity`
    width: 60%;
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

const PreviousBtn = styled.TouchableOpacity`
    width: 30%;
    height: 45px;
    background-color: #DADADA;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;

const PreviousBtnText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
`;


const PerfumeTagView = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
`;

const PerfumeTagInnerView = styled.View`
    align-items: center; 
    justify-content: center;
    /* margin-bottom: 15px; */
    margin-top: 10px;
    min-height: 190px;
`;

const PerfumeTag = styled.TouchableOpacity`
    /* border: 1px solid; */
    border-radius:7px;
    /* padding: 2px;s */
    margin-bottom: 10px;
    align-items: center; 
    justify-content: center;
    inline-size: block;
    min-width: 30%;
    margin-right: 5px;
    margin-left: 5px;
`;

export default OnBoardingSecondPage;