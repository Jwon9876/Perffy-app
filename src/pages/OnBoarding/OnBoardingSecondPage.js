import React from "react";

import styled from "styled-components";

function OnBoardingSecondPage({navigation}){

    return(
        <SafeAreaView>
            <PhaseView>
                <PhasePoint />
                <PhaseRectangle />
                <PhasePoint />
            </PhaseView>

            <FooterView
            >
                <PreviousBtn
                    style = {{marginBottom: 3}}
                    onPress={() => navigation.goBack()}
                >
                    <PreviousBtnText>
                        이전으로
                    </PreviousBtnText>
                </PreviousBtn>

                <NextBtn
                    onPress={() => console.log("TODO")}
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

export default OnBoardingSecondPage;