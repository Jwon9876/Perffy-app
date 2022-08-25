import React, {useState} from "react";
import { Alert } from "react-native";

import styled from "styled-components";

import firestore from '@react-native-firebase/firestore';


function OnBoardingSecondPage({navigation, route}){

    // var userInformation = route.params.userInformation

    const [userInformation, setUserInformation] = useState(route.params.userInformation)

    const sex = route.params.userInformation["sex"]        
    const age = route.params.userInformation["age"]
    const nickname = route.params.userInformation["nickname"]


    const perfumeTag = ["우디", "시트러스", "머스크", "레더", "플로럴", "그린", "아쿠아", "오리엔탈"];
    const [selectedTagList, setSelectedTagList] = useState([]);

    const notPressdTagStyle = {
        fontSize:12, 
        backgroundColor: "#EFEFEF",
        marginTop: 12,
        marginLeft:5,
        padding: 3
    }

    const notPressdTextStyle = {
        marginLeft: 0,
        fontSize: 13,
        color: "#666666"
    }

    const pressdTagStyle = {
        fontSize:12, 
        backgroundColor: "#5ABACA",
        marginTop: 12,
        marginLeft:5,
        padding: 3
    }

    const pressdTextStyle = {
        marginLeft: 0,
        fontSize: 13,
        color: "#FFFFFF"
    }

    function insertTag(tag) {
        if (selectedTagList.some((v) => v == tag)) {
            setSelectedTagList(selectedTagList.filter(v => v !== tag));
            return
        }
        setSelectedTagList([...selectedTagList, tag])
        setUserInformation(interest=[...selectedTagList, tag])
    }

    async function submitUserInfo() {
        await firestore().collection('Users')
            .doc()
            .set({
                age: age,
                sex: sex,
                userNickname: nickname,
                interest: selectedTagList
            })
            .then(() => {
                console.log('Review registered!');
                navigation.replace('BottomTabBar')
            });
    }

    function validationCheck(){
        if(selectedTagList.length < 3){
            Alert.alert("태그를 3개 이상 선택해주세요");
        } else{
            console.log(selectedTagList)
            console.log(sex, age, nickname)
            submitUserInfo()
        }
    }

    

    

    return(

        <SafeAreaView>
            <PhaseView>
                <PhasePoint />
                <PhaseRectangle />
            </PhaseView>

            <TitleText>
                관심 향수를 선택해주세요
            </TitleText>

            <DescriptionnText
                style = {{fontSize:12, marginTop: 30}}
            >
                * 3가지 이상 선택해주세요
            </DescriptionnText>
            <PerfumeTagView>

                {
                    perfumeTag.map((v, i) => 
                        <PerfumeTag key={v}
                            // style = {{marginTop: 12, marginLeft:5, padding: 3}}
                            style = {                         
                                (
                                    selectedTagList.includes(v)
                                ) ? (
                                    pressdTagStyle
                                ) : (
                                    notPressdTagStyle
                                )
                            }
                            onPress = {() => insertTag(v)}
                        >
                            <DescriptionnText
                                style = {
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
                            </DescriptionnText>
                        </PerfumeTag>
                    )

                    
                }

            </PerfumeTagView>


            <FooterView
            >
                <PreviousBtn
                    style = {{marginBottom: 5}}
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
`;

const TitleText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-left: 16px;
`;

const DescriptionnText = styled.Text`
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

const PreviousBtn = styled.TouchableOpacity`
    width: 80%;
    height: 45px;
    background-color: #DADADA;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const PreviousBtnText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
`;


const PerfumeTagView = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px 10px;
    justify-content: flex-start;
`;

const PerfumeTag = styled.TouchableOpacity`
    /* border: 1px solid; */
    border-radius:7px;
    padding: 2px;
    margin: 2px;
    align-items: center;
    justify-content: center;
    inline-size: block;
    min-width: 50px;
    width: auto;
    height: 30px;
`;

export default OnBoardingSecondPage;