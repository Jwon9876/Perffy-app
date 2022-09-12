import React, { useState } from "react";
import { Image, Text, Dimensions, TextInput } from 'react-native';

import styled from 'styled-components';

import { WithLocalSvg } from "react-native-svg";
import BackArrowIcon from '../components/icons/BackArrowIcon.svg'

import searchIcon from '../components/icons/searchIcon.png'

import { storeRecentSearchWord, getRecentSearchWord } from "../AsyncStorage/AsyncStorage";


function SearchPage({ navigation }) {

    const tempRecentKeywordData = ["조말론", "딥디크", "바이레도"];
    const tempRecommnadationTagData = ["#비 오는 날", "#여름", "#겨울", "#데이트"];

    const [searchWord, setSearchWord] = useState("")

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
                        source={searchIcon}
                    />
                    <TextInput
                        style = {
                            {
                                // borderWidth: 1,
                                height: "100%",
                                minWidth: "30%"
                            }
                        }
                        value={searchWord}
                        onChangeText={(e) => setSearchWord(e)}
                        
                        // TODO
                        autoCapitalize="sentences"
                        autoCorrect

                        onSubmitEditing={() => {
                            storeRecentSearchWord(searchWord)
                            console.log("Submit !")
                            var temp = getRecentSearchWord()
                            console.log(temp)
                            }
                        }
                    />

                </SearchBar>
            </SearchBarView>

            <ScrollView>
                <RecentSearchWordView>

                    <RecentSearchWordViewTitle>
                        최근 검색어
                    </RecentSearchWordViewTitle>
                    {
                        tempRecentKeywordData.map((v, i) => (
                            <RecentSearchWordBtn
                                key={i}
                            >
                                <RecentSearchWord>
                                    {v}
                                </RecentSearchWord>

                                <RecentSearchWordeletedBtn>
                                    <RecentSearchWord
                                        onPress={() => console.log("Delete it !")}
                                    >
                                        X
                                    </RecentSearchWord>
                                </RecentSearchWordeletedBtn>

                            </RecentSearchWordBtn>
                        ))
                    }
                </RecentSearchWordView>

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

const RecentSearchWordView = styled.View`
`;

const RecentSearchWordViewTitle = styled.Text`
    font-size: 18px;
    font-weight: 500;
    margin-top: 30px;
    margin-left: 22px;
`;

const RecentSearchWord = styled.Text`
    font-size: 16px;
    color: #666666;
`;

// TODO Button -> Btn
const RecentSearchWordBtn = styled.TouchableOpacity`
    margin-top: 15px;
    margin-left: 22px;
    margin-right: 22px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const RecentSearchWordeletedBtn = styled.TouchableOpacity`
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