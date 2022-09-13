import React, { useEffect, useState } from "react";
import { Image, Text, Dimensions } from 'react-native';

import styled from "styled-components";

import { WithLocalSvg } from "react-native-svg";
import FavoriteFalse from '../components/icons/FavoriteFalse.svg';
import FavoriteTrue from '../components/icons/FavoriteTrue.svg';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useRecoilValue } from "recoil";
import { userNickname } from "../store/store";


function Home({ navigation, route }) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [imageUrl, setImageUrl] = useState();
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

    const storedUserNickname = useRecoilValue(userNickname)

    const zeroToTenArr = [...Array(10)].map((_, i) => i + 1);

    useEffect(() => {
        console.log(storedUserNickname)
    }, [])

    useEffect(() => {

    }, [])

    useEffect(() => {
        storage()
            .ref('/Products/조 말론 피오니 앤 블러쉬 스웨이드 코롱(2).jpeg') //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
                setImageUrl(url);
            })
            .catch((e) => console.log('Errors while downloading => ', e));

        console.log(imageUrl)
    }, [])

    return (
        <SafeAreaView>
            <SearchBarView>
                <SearchBar
                    onPress={() => navigation.navigate('SearchPage')}
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
            <ScrollView>


                {/* TODO: 안드로이드 shadow 적용 */}
                <RecommendationView>
                    <RecommendationViewTitleView>
                        <RecommendationViewTitleText style={{ color: "#212121" }}>
                            <ColoredTitleText color={"#5ABACA"}>{storedUserNickname}</ColoredTitleText>님이 </RecommendationViewTitleText>

                        <RecommendationViewTitleText>
                            님이 좋아하실 만한 향수예요.
                        </RecommendationViewTitleText>

                        <DescriptionText>
                            상큼한 향기로 기분 전환 해보세요.
                        </DescriptionText>
                    </RecommendationViewTitleView>
                    <RecommendationListView
                        style={{ backgroundColor: '#fff', borderRadius: 17, borderColor: 'black' }}
                        shadowOffset={{ width: 5, height: 6 }}
                        shadowColor='black'
                        shadowOpacity={0.25}
                    >

                        <RecommendedPerfume>

                            {/* <PerfumeImg> */}
                            <Image
                                style={{ width: 68, height: 68, borderRadius: 5 }}
                                source={{ url: imageUrl }}
                                resizeMode="cover"

                            />
                            {/* </PerfumeImg> */}
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
                    <MorePerfumeBtn>
                        <DescriptionText
                            style={{ fontSize: 13, color: "#666666" }}
                        >
                            향수 더 찾아보기 {'>'}
                        </DescriptionText>
                    </MorePerfumeBtn>

                </RecommendationView>

                <PerfumeRankingView>
                    <PerfumeRankingViewRecommendationViewTitleText> 20대 여성에게 가장 인기있는 </PerfumeRankingViewRecommendationViewTitleText>
                    <PerfumeRankingViewRecommendationViewTitleText> 향수<ColoredTitleText color={"#5ABACA"}>Top 10</ColoredTitleText> </PerfumeRankingViewRecommendationViewTitleText>
                    <PerfumeRankingListView>
                        <ScrollView horizontal={true}>
                            {
                                zeroToTenArr.map((v, i) =>
                                    <RankedPerfumeCell key={i}>
                                        <RankedNumber>
                                            <RankedNumberText>
                                                TOP {v}
                                            </RankedNumberText>
                                        </RankedNumber>
                                        <RankedPerfumeImg>

                                        </RankedPerfumeImg>

                                        <DescriptionText
                                            style={{ color: '#9E9E9E' }}
                                        >
                                            랑방
                                        </DescriptionText>

                                        <DescriptionText
                                            style={{ color: '#212121', width: 120, textAlign: 'center' }}
                                            numberOfLines={2}
                                            ellipsizeMode={'tail'}

                                        >
                                            에끌라 드 아르페쥬 우먼 오드퍼퓸
                                        </DescriptionText>
                                    </RankedPerfumeCell>
                                )
                            }
                        </ScrollView>

                    </PerfumeRankingListView>
                </PerfumeRankingView>

                <HrBar></HrBar>

                {/* TODO: 안드로이드 shadow 적용 */}
                <PerffyUserReviewView>
                    <PerffyUserReviewTitleView>
                        <PerffyUserReviewViewTitle>
                            퍼피 유저들의 리뷰보기
                        </PerffyUserReviewViewTitle>


                        <MoreReviewBtn>
                            <DescriptionText
                                style={{ fontSize: 13, color: "#666666" }}
                            >
                                더보기 {'>'}
                            </DescriptionText>
                        </MoreReviewBtn>
                    </PerffyUserReviewTitleView>

                    <PerffyUserReviewCardListView
                    // style={{ backgroundColor: '#fff', borderRadius: 17, borderColor: 'black' }}
                    // shadowOffset={{ width: 5, height: 6 }}
                    // shadowColor='black'
                    // shadowOpacity={1}
                    >
                        <ScrollView horizontal={true}
                        >
                            <PerffyUserReviewCardView
                                style={{ backgroundColor: '#fff', borderRadius: 17, borderColor: 'black' }}
                                shadowOffset={{ width: 5, height: 6 }}
                                shadowColor='black'
                                shadowOpacity={0.25}
                            >
                                <PerffyUserReviewCard

                                >
                                    <CardInnerImgView>

                                    </CardInnerImgView>

                                    <CardInnerProfilePicture
                                        style={{ zIndex: 100 }}
                                    ></CardInnerProfilePicture>

                                    <CardInnerTextView>

                                    </CardInnerTextView>

                                </PerffyUserReviewCard>
                            </PerffyUserReviewCardView>

                            <PerffyUserReviewCardView
                                style={{ backgroundColor: '#fff', borderRadius: 17, borderColor: 'black' }}
                                shadowOffset={{ width: 5, height: 6 }}
                                shadowColor='black'
                                shadowOpacity={0.25}
                            >
                                <PerffyUserReviewCard

                                >
                                    <CardInnerImgView>

                                    </CardInnerImgView>

                                    <CardInnerProfilePicture
                                        style={{ zIndex: 100 }}
                                    ></CardInnerProfilePicture>

                                    <CardInnerTextView>

                                    </CardInnerTextView>

                                </PerffyUserReviewCard>
                            </PerffyUserReviewCardView>

                            <PerffyUserReviewCardView
                                style={{ backgroundColor: '#fff', borderRadius: 17, borderColor: 'black' }}
                                shadowOffset={{ width: 5, height: 6 }}
                                shadowColor='black'
                                shadowOpacity={0.25}
                            >
                                <PerffyUserReviewCard

                                >
                                    <CardInnerImgView>

                                    </CardInnerImgView>

                                    <CardInnerProfilePicture
                                        style={{ zIndex: 100 }}
                                    ></CardInnerProfilePicture>

                                    <CardInnerTextView>

                                    </CardInnerTextView>

                                </PerffyUserReviewCard>
                            </PerffyUserReviewCardView>


                        </ScrollView>
                    </PerffyUserReviewCardListView>
                </PerffyUserReviewView>



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


const RecommendationViewTitleView = styled.View`
    margin-top: 30px;
    position: relative;
    right: 50px;
`;


const RecommendationViewTitleText = styled.Text`
    font-size: 22px;
    font-weight: bold;
`;

const ColoredTitleText = (props) => (
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

const MorePerfumeBtn = styled.TouchableOpacity`
    position: relative;
    left: 125px;
    margin-top: 10px;
`;

const PerfumeRankingView = styled.View`
    margin-top: 50px;
    margin-left: 15px;
`;

const PerfumeRankingViewRecommendationViewTitleText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #212121;
`;

const PerfumeRankingListView = styled.View`
    flex-direction: row;
    overflow: scroll;
    /* height: 300px; */
    margin-top: 10px;
`;

const RankedPerfumeCell = styled.TouchableOpacity`
    width: 150px;
    height: 180px;
    /* border: 1px solid; */
    margin-right: 15px;
    justify-content: center;
    align-items: center;
`;

const RankedNumber = styled.View`
    width: 50px;
    height: 25px;
    border-radius: 12px;
    background-color: #FFA1B2;
    position: relative;
    right: 40px;
    top: 0;
    justify-content: center;
    align-items: center;
`;

const RankedNumberText = styled.Text`
    color: #FFFFFF;
`;

const RankedPerfumeImg = styled.View`
    width: 50px;
    height: 60px;
    border-radius: 7px;
    background-color: #D9D9D9;
    margin-top: 7px;
`;

const HrBar = styled.View`
    margin-top: 25px;
    margin-bottom: 50px;
    width: 100%;
    height: 6px;
    background-color: #F8F8F8;
`;

const PerffyUserReviewView = styled.View`
    margin-bottom: 15px;
    padding: 0 15px 0 15px;
`;

const PerffyUserReviewTitleView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
`;

const PerffyUserReviewViewTitle = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #212121;
`;

const PerffyUserReviewCardListView = styled.View`
    margin-top: 15px;
`;

const PerffyUserReviewCardView = styled.View`
    margin-bottom: 20px;
    margin-right: 20px;
`;

const PerffyUserReviewCard = styled.TouchableOpacity`
    flex: 1;
    width: 330px;
    height: 250px;
    border-radius: 15px;
`;

const CardInnerImgView = styled.View`
    flex: .45;
    background-color: #666666;
    border-radius: 14px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;

const CardInnerTextView = styled.View`
    flex: .55;
    background-color: #FFFFFF;
    border-radius: 14px;
`;

const CardInnerProfilePicture = styled.TouchableOpacity`
    position: absolute;
    top: 35%;
    width: 45px;
    height: 45px;
    border: 1px solid;
    border-color: #FFFFFF;
    border-radius: 22.5px;
    background-color: #D9D9D9;
    margin-left: 10px;
`;


const MoreReviewBtn = styled.TouchableOpacity`
`;


export default Home;