import React, { useState } from "react";
import { Image, Text, Dimensions } from 'react-native';

import styled from "styled-components";

import { WithLocalSvg } from "react-native-svg";
import FavoriteFalse from '../components/icons/FavoriteFalse.svg';
import FavoriteTrue from '../components/icons/FavoriteTrue.svg';

function Home({ navigation }) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [favoriteSelectedList, setFavoriteSelectedList] = useState([false, false, false])

    const [favoriteSelectedFirst, setFavoriteSelectedFirst] = useState(false);
    const [favoriteSelectedSecond, setFavoriteSelectedSecond] = useState(false);
    const [favoriteSelectedThird, setFavoriteSelectedThird] = useState(false);

    const PerfumeTagDummyData = ["우디", "레더", "그린"];
    const PerfumeNameDummyData = [
        "시슬리 오 뒤 스와르 오 드빠르퓸 ansdklnaksdnaldsnalksdnlansdkanlkdsnalksdnlasndakndlsknaldkanldkasndkasnlk",
        "람방 에끌라 드 아르떼쥬 우먼 오드퍼퓸",
        "시슬리 오 뒤 스와르 오 드빠르퓸"
    ];


    return (
        <SafeAreaView>
            <ScrollView>
                <SearchBarView>
                    <SearchBar
                        onPress={() => navigation.navigate('SeachPage')}
                    >
                        <Image
                            style={{ marginRight: 5 }}
                            source={require('../components/icons/searchIcon.png')}
                        />
                        <SearchBarInnerText>
                            향수 이름, 브랜드, 향기 등으로 찾기
                        </SearchBarInnerText>
                    </SearchBar>
                </SearchBarView>

                <TitleView>
                    <TitleText style={{ color: "#212121" }}>
                        <TitleColoredText color={"#5ABACA"}>김퍼피</TitleColoredText>님이 </TitleText>

                    <TitleText>
                        님이 좋아하실 만한 향수예요.
                    </TitleText>

                    <DescriptionText>
                        상큼한 향기로 기분 전환 해보세요.
                    </DescriptionText>
                </TitleView>

                <RecommendationView>
                    <RecommendationListView
                        style={{ backgroundColor: '#fff', borderRadius: 17, borderColor: 'black' }}
                        shadowOffset={{ width: 5, height: 6 }}
                        shadowColor='black'
                        shadowOpacity={0.25}
                    >

                        <RecommendedPerfume>

                            <PerfumeImg>

                            </PerfumeImg>
                            <PerfumeInfoView
                            // TODO
                            >
                                <PerfumeTagText>
                                    우디
                                </PerfumeTagText>

                                <PerfumeNameText>
                                    시슬리 오 뒤 스와르 오 드빠르퓸 ansdklnaksdnaldsnalksdnlansdkanlkdsnalksdnlasndakndlsknaldkanldkasndkasnlk
                                </PerfumeNameText>
                            </PerfumeInfoView>
                            <FavoriteBtn
                                onPress={() => setFavoriteSelectedFirst(!favoriteSelectedFirst)}
                            >
                                <WithLocalSvg
                                    width={20}
                                    height={20}
                                    asset={favoriteSelectedFirst ? FavoriteTrue : FavoriteFalse}
                                />
                            </FavoriteBtn>
                        </RecommendedPerfume>

                        <RecommendedPerfume>

                            <PerfumeImg>

                            </PerfumeImg>
                            <PerfumeInfoView>
                                <PerfumeTagText>
                                    레더
                                </PerfumeTagText>

                                <PerfumeNameText>
                                    람방 에끌라 드 아르떼쥬 우먼 오드퍼퓸
                                </PerfumeNameText>
                            </PerfumeInfoView>
                            <FavoriteBtn
                                onPress={() => setFavoriteSelectedSecond(!favoriteSelectedSecond)}
                            >
                                <WithLocalSvg
                                    width={20}
                                    height={20}
                                    asset={favoriteSelectedSecond ? FavoriteTrue : FavoriteFalse}
                                />
                            </FavoriteBtn>
                        </RecommendedPerfume>

                        <RecommendedPerfume>
                            <PerfumeImg>

                            </PerfumeImg>
                            <PerfumeInfoView>
                                <PerfumeTagText>
                                    그린
                                </PerfumeTagText>

                                <PerfumeNameText>
                                    시슬리 오 뒤 스와르 오 드빠르퓸
                                </PerfumeNameText>
                            </PerfumeInfoView>
                            <FavoriteBtn
                                onPress={() => setFavoriteSelectedThird(!favoriteSelectedThird)}
                            >
                                <WithLocalSvg
                                    width={20}
                                    height={20}
                                    asset={favoriteSelectedThird ? FavoriteTrue : FavoriteFalse}
                                />
                            </FavoriteBtn>
                        </RecommendedPerfume>
                    </RecommendationListView>
                    <MoreBtn>
                        <DescriptionText>
                            향수 더 찾아보기 {'>'}
                        </DescriptionText>
                    </MoreBtn>

                </RecommendationView>

                <PerfumeRankingView>
                    <RankingTitleText> 20대 여성에게 가장 인기있는 </RankingTitleText>
                    <RankingTitleText> 향수<TitleColoredText color={"#5ABACA"}>Top 10</TitleColoredText> </RankingTitleText>
                    <PerfumeRankingListView>

                    </PerfumeRankingListView>
                </PerfumeRankingView>

                <HrBar></HrBar>

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
    
`;

const SearchBarView = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding-top: 15px;
`;

const SearchBar = styled.TouchableOpacity`
    width: 90%;
    height: 42px;
    /* border: 1px solid; */
    /* justify-content: center; */
    align-items: center;
    padding-left: 10px;
    background-color: #F8F8F8;
    flex-direction: row;
`;

const SearchBarInnerText = styled.Text`
    font-size: 14px;
    font-weight: 500;
`;


const RecommendationView = styled.View`
    align-items: center;
`;


const TitleView = styled.View`
    margin-top: 30px;
    margin-left: 15px;
`;


const TitleText = styled.Text`
    font-size: 22px;
    font-weight: bold;
`;

const TitleColoredText = (props) => (
    <Text
        style={{
            color: props.color
        }}
    >
        {props.children}
    </Text>
)


const DescriptionText = styled.Text`
    font-size: 14px;
    margin: 7px 0 7px 0;

`;

const RecommendationListView = styled.View`
    width: 95%;
`;

const RecommendedPerfume = styled.TouchableOpacity`
    width: 60px;
    height: 100px;
    flex-direction: row;
    padding: 0 10px 0 10px;
    align-items: center;
`;

// TODO

const PerfumeInfoView = styled.View`
    padding-left: 10px;
`;

const PerfumeImg = styled.View`
    width: 68px;
    height: 68px;
    border-radius: 5px;
    background-color: #D9D9D9;
`;

const PerfumeTagText = styled.Text`
    color: #5ABACA;
    margin-bottom: 5px;
`;

const PerfumeNameText = (props) => {
    return (
        <Text style={{ color: '#212121', width: 240 }} numberOfLines={2} ellipsizeMode={'tail'}>
            {props.children}
        </Text>
    )
}

const FavoriteBtn = styled.TouchableOpacity`

`;


const MoreBtn = styled.TouchableOpacity`
    position: relative;
    left: 125px;
    margin-top: 10px;
`;

const PerfumeRankingView = styled.View`
    margin-top: 50px;
    margin-left: 15px;
`;

const RankingTitleText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #212121;
`;

const PerfumeRankingListView = styled.View`

`;

const HrBar = styled.View`
    margin-top: 25px;
    width: 100%;
    height: 6px;
    background-color: #F8F8F8;
`;




export default Home;