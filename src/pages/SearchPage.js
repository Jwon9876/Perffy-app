import React, { useEffect, useState } from "react";
import { Image, Text, Dimensions, TextInput } from 'react-native';

import styled from 'styled-components';

import { WithLocalSvg } from "react-native-svg";
import BackArrowIcon from '../components/icons/BackArrowIcon.svg'

import searchIcon from '../components/icons/searchIcon.png'
import TextInputClearIcon from '../components/icons/TextInputClearIcon.png'

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ExampleStarRating from '/Users/choejuwon/Documents/GitHub/Perffy-app/src/components/icons/ExampleStarRating.png';

import { storeRecentSearchWord, getRecentSearchWord } from "../asyncStorage/AsyncStorage";


function SearchPage({ navigation }) {

    const tempRecentKeywordData = ["조말론", "딥디크", "바이레도"];
    const tempRecommnadationTagData = ["#비 오는 날", "#여름", "#겨울", "#데이트"];
    const tempKeyValueData = [
        { "_data": { "ImageName": "WoodSageSeaSaltCologne", "ProductName": "조 말론 런던 우드 세이지 앤 씨 솔트 코롱", "ProductType": "오리엔탈" } },
        { "_data": { "ImageName": "PeonyBlushSuedeCologne", "ProductName": "조 말론 런던 피오니 앤 블러시 스웨이드", "ProductType": "레드애플" } }
    ]

    const [searchWord, setSearchWord] = useState("")

    const [searchResultList, setSearchResultList] = useState([]);
    const [searchResultImageNameList, setSearchResultImageNameList] = useState([]);
    const [searchResultImageUrlList, setSearchResultImageUrlList] = useState([]);

    async function getSearchResultList(word) {

        try {
            const db = firestore().collection('Products');
            const docs = await db.where('ProductName', '>=', word).where('ProductName', '<=', word + '~').get();
            // console.log(docs._docs)
            setSearchResultList(docs._docs)
            // return docs._docs
        }
        catch (e) {
            console.log(e)
        }
    }


    const getProductImageUrl = async () => {

        let temp = []

        for (let ImageName of searchResultImageNameList) {
            await storage().ref(`/Products/${ImageName}.jpeg`).getDownloadURL().then((url) => {
                temp.push(url)
            })
        }

        setSearchResultImageUrlList(temp)
    }



    // TODO : rename
    const getSampleImage = async () => {
        let imageNameList = []

        searchResultList.map((v, i, a) => {
            imageNameList.push(v._data.ImageName)
        })

        setSearchResultImageNameList(imageNameList)
    }

    useEffect(() => {
        getSampleImage()
        getProductImageUrl()
    }, [searchResultList])

    useEffect(() => {
        console.log(searchResultImageUrlList)
    }, [searchResultImageUrlList])


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
                        style={
                            {
                                // borderWidth: 1,
                                height: "100%",
                                width: "95%"
                            }
                        }
                        value={searchWord}
                        onChangeText={async (e) => {
                            setSearchWord(e)
                            getSearchResultList(e)
                        }
                        }

                        // TODO
                        autoCapitalize="sentences"
                        autoCorrect

                        onSubmitEditing={() => {
                            // TODO
                            // storeRecentSearchWord(searchWord)
                            console.log("Submit !")

                            // TODO
                            // var temp = getRecentSearchWord()
                            // console.log(temp)
                        }
                        }
                    />
                    {
                        (
                            searchWord.length == 0
                        ) ? (
                            <></>
                        ) : (
                            <TextInputClearBtn
                                onPress={() => setSearchWord("")}
                            >
                                <Image
                                    style={{ width: 18, height: 18 }}
                                    source={TextInputClearIcon}
                                />
                            </TextInputClearBtn>
                        )
                    }
                </SearchBar>
            </SearchBarView>

            <ScrollView>
                {
                    (
                        searchWord.length == 0
                    ) ? (
                        <>
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
                        </>

                    ) : (
                        <>
                            <FilterView
                                horizontal={true}
                                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                                style={{ height: 40 }}
                            >
                                <FilterBtn
                                    onPress={() => console.log("456")}
                                >
                                    <FilterBtnText>
                                        가격
                                    </FilterBtnText>
                                </FilterBtn>

                                <FilterBtn
                                    onPress={() => console.log("456")}
                                >
                                    <FilterBtnText>
                                        계절
                                    </FilterBtnText>
                                </FilterBtn>

                                <FilterBtn
                                    onPress={() => console.log("456")}
                                >
                                    <FilterBtnText>
                                        지속력
                                    </FilterBtnText>
                                </FilterBtn>

                                <FilterBtn
                                    onPress={() => console.log("456")}
                                >
                                    <FilterBtnText>
                                        향
                                    </FilterBtnText>
                                </FilterBtn>
                            </FilterView>


                            {
                                (
                                    searchResultList.length == 0
                                ) ? (
                                    <>
                                        <SearchResultCell
                                            disabled={true}
                                        >
                                            <Text>
                                                검색 결과가 없습니다.
                                            </Text>
                                        </SearchResultCell>
                                    </>
                                ) : (
                                    searchResultList.map((v, i) =>
                                        <>
                                            <SearchResultCell
                                                onPress = {() => (navigation.navigate('ProductPage', 
                                                    {
                                                        ProductName: v._data.ProductName,
                                                        ProductImgUrl: searchResultImageUrlList[i]
                                                    }
                                                    ))
                                                }
                                            >
                                                <Image
                                                    style={{ width: 100, height: 100, borderRadius: 5, resizeMode: 'contain' }}
                                                    source={{ uri: searchResultImageUrlList[i] }}
                                                />
                                                <SearchResultProductInfoView>
                                                    <Text
                                                        style={{
                                                            marginTop: 10,
                                                            fontSize: 12,
                                                            fontWeight: '500',
                                                            color: '#9E9E9E'
                                                        }}
                                                    >
                                                        {v._data.BrandName}
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            marginTop: 5,
                                                            fontSize: 14,
                                                            fontWeight: '500',
                                                            color: '#212121'
                                                        }}
                                                    >
                                                        {v._data.ProductName}
                                                    </Text>
                                                    <Image
                                                        source={ExampleStarRating}
                                                    />
                                                </SearchResultProductInfoView>
                                            </SearchResultCell>

                                        </>

                                    )
                                )
                            }
                        </>
                    )
                }
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
    width: 81%;
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

const TextInputClearBtn = styled.TouchableOpacity`

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

const FilterView = styled.ScrollView`
`;

const FilterBtn = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;  
    border: 1px;
    margin-left: 5px;
    width: auto;
    min-width: 50px;
    height: 32px;
    padding: 5px;
    border-radius: 16px;
    border-color: #5ABACA;
`;

const FilterBtnText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: #5ABACA;
`;

const SearchResultCell = styled.TouchableOpacity`
    /* border: 1px; */
    /* height: 35px; */
    min-width: 85%;
    margin: 3px 0 3px 0;
    padding-left: 5px;
    margin-top: 5px;
    align-items: center;
    border-radius: 12px;
    flex-direction: row;
    border: 1px;
    height: 135px;
`

const SearchResultProductInfoView = styled.View`
    position: relative;
    top: -25px;
    left: 7px;
`;

export default SearchPage; 