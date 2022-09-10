import React, { useState } from "react";
import { Image, Text, Dimensions } from 'react-native';

import styled from 'styled-components';

import { WithLocalSvg } from "react-native-svg";
import BackArrowIcon from '../components/icons/BackArrowIcon.svg'




function SearchPage({ navigation }) {

    const tempRecentKeywordData = ["조말론", "딥디크", "바이레도"];
    const tempRecommnadationTagData = ["#비 오는 날", "#여름", "#겨울", "#데이트"];

    return (

        <SafeAreaView>
            <SearchBarView>
                <BackArrowBtn
                    onPress={() => navigation.goBack()}
                >
                    <WithLocalSvg
                        width={24}
                        height={24}
                        asset={BackArrowIcon}
                    />
                </BackArrowBtn>

                <SearchBar>
                    <Image
                        style={{ marginRight: 5 }}
                        source={require('../components/icons/searchIcon.png')}
                    />
                    <SearchTextInput
                        placeholder = "향수 이름, 브랜드, 향기 등으로 찾기"
                        placeholderTextColor = '#9E9E9E'
                        onChangeText = {(e) => console.log(e)}
                        onSubmitEditting = {(e) => console.log("Submit !")}
                    />
                    {/* <SearchBarInnerText>
                        향수 이름, 브랜드, 향기 등으로 찾기
                    </SearchBarInnerText> */}
                </SearchBar>
            </SearchBarView>

            <ScrollView>
                <RecentSearchKeywordView>

                    <RecentSearchKeywordViewTitle>
                        최근 검색어
                    </RecentSearchKeywordViewTitle>
                    {
                        tempRecentKeywordData.map((v, i) => (
                            <RecentSearchKeywordBtn
                                key={i}
                            >
                                <RecentSearchKeyword>
                                    {v}
                                </RecentSearchKeyword>

                                <RecentSearchKeyworDeletedBtn>
                                    <RecentSearchKeyword
                                        onPress={() => console.log("Delete it !")}
                                    >
                                        X
                                    </RecentSearchKeyword>
                                </RecentSearchKeyworDeletedBtn>

                            </RecentSearchKeywordBtn>
                        ))
                    }
                </RecentSearchKeywordView>

                <RecommendationTagView>
                    <RecommendationTagViewTitle>
                        추천 태그
                    </RecommendationTagViewTitle>
                    <RecommendationEnumView>
                        {
                            tempRecommnadationTagData.map((v, i) => (
                                <RecommendationTagBtn
                                    key={i}
                                >
                                    <RecommendationTag>
                                        {v}
                                    </RecommendationTag>
                                </RecommendationTagBtn>
                            ))
                        }
                    </RecommendationEnumView>
                </RecommendationTagView>
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
    background-color: #FFFFFF;
`;

const SearchBarView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
`;

const SearchBar = styled.View`
    width: 85%;
    height: 42px;
    /* border: 1px solid; */
    /* justify-content: center; */
    align-items: center;
    margin-left: 15px;
    padding-left: 10px;
    background-color: #F8F8F8;
    flex-direction: row;
    padding-right: 30px;
`;

const SearchTextInput = styled.TextInput`
    
`;

const SearchBarInnerText = styled.Text`
    font-size: 14px;
    font-weight: 500;
`;

const BackArrowBtn = styled.TouchableOpacity`
`;

const RecentSearchKeywordView = styled.View`
`;

const RecentSearchKeywordViewTitle = styled.Text`
    font-size: 18px;
    font-weight: 500;
    margin-top: 30px;
    margin-left: 22px;
`;

const RecentSearchKeyword = styled.Text`
    font-size: 16px;
    color: #666666;
`;

// TODO Button -> Btn
const RecentSearchKeywordBtn = styled.TouchableOpacity`
    margin-top: 15px;
    margin-left: 22px;
    margin-right: 22px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const RecentSearchKeyworDeletedBtn = styled.TouchableOpacity`
`;

const RecommendationTagView = styled.View`
`;

const RecommendationEnumView = styled.View`
    padding-left: 22px;
    padding-top: 15px;
    flex-direction: row;
    flex-wrap: wrap;
`;

const RecommendationTagViewTitle = styled.Text`
    font-size: 18px;
    font-weight: 500;
    margin-top: 30px;
    margin-left: 22px;
`;

const RecommendationTag = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: #FFA1B2;
    margin: 0 8px 0 8px;
`;

const RecommendationTagBtn = styled.TouchableOpacity`
    min-width: 50px;
    height: 32px;
    border: 1px solid;
    border-color: #FFA1B2;
    border-radius: 16px;
    margin-right: 7px;
    align-items: center;
    justify-content: center;
    
`;

export default SearchPage; 