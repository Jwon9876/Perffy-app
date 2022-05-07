import React from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';

function HomeScreen({navigation}) {

    const categoryArray = ['지속력', '봄', '여름', '가을', '겨울', '분위기', '상쾌한'];

    return (
            <SafeAreaView>
                <ScrollView>
                    <CreateReviewBtn
                        onPress={() => console.log('createReview')}
                    >
                        <Text
                            style={{color: 'white', fontSize: 15}}
                        >
                            당신의 향기를 공유해주세요 !
                        </Text>
                    </CreateReviewBtn>

                    <TopView>
                        <Category>
                            <PostText>
                                추천 향수 아이콘 추가
                            </PostText>
                        </Category>
                        <Category>
                            <PostText>
                                Review 아이콘 추가
                            </PostText>
                        </Category>

                        <Category>
                            <PostText>
                                ??? 아이콘 추가
                            </PostText>
                        </Category>
                    </TopView>

                    <PostBox>
                        <PostBoxTopView>

                            <HidePostBtn>

                            </HidePostBtn>

                            <Title>
                                최근 리뷰
                            </Title>

                            <MorePostBtn>
                                <PostText>
                                    더보기
                                </PostText>
                            </MorePostBtn>
                            
                        </PostBoxTopView>
                        
                        <Post
                            onPress={() => console.log('review')}
                        >
                            {/* 
                                TODO: Image File 통일
                             */}
                            {/* <Image style={{width:'30%', height:'80%'}} source={require('/Users/juwon/Documents/GitHub/Perffy/images/deep.jpeg')}/> */}
                            <PostView>
                                <PostProductTitle>
                                    <Text style={{color: 'black', fontSize: 17}}>
                                        딥디크 오데썽 오 드 뚜왈렛 50ml
                                    </Text>
                                </PostProductTitle>
                                <PostTagView>
                                    {
                                        categoryArray.map((v) => 
                                            <Tag key={v}>
                                                <Text
                                                    style={{fontSize: 15}}
                                                >
                                                    {v}
                                                </Text>
                                            </Tag>
                                        )
                                    }
                                </PostTagView>
                            </PostView>
                        </Post>
                        <Post>
                            {/* <Image style={{width:'30%', height:'80%'}} source={require('/Users/juwon/Documents/GitHub/Perffy/images/jo.jpeg')}/> */}
                        </Post>
                        <Post
                            // TODO: Scroll Size Checking
                            style={{marginBottom: 100}}
                        >
                            {/* <Image style={{width:'30%', height:'80%'}} source={require('/Users/juwon/Documents/GitHub/Perffy/images/jo.jpeg')}/> */}
                        </Post>
                    </PostBox> 
                </ScrollView>
            </SafeAreaView>
    )
}

export default HomeScreen;


const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: white;
`;

const CreateReviewBtn = styled.TouchableOpacity`
    height: 5%;
    width: 100%;
    background-color: #8c0485;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
    justify-content: center;
    align-items: flex-start;
`;

const TopView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    background-color: #8c0485;
    height: 25%;
    margin-bottom: 30%;
    border-radius: 10px;
`;

const Category = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    padding-left:10px;
    border-radius:75px;
    border: 1px white;
`;

const Title = styled.Text`
    font-size: 20px;
    color: black;
`;

const HidePostBtn  = styled.View`
    width: 10%;
`;

const MorePostBtn  = styled.TouchableOpacity`
    width: 10%;
    justify-content: flex-end;
`;

const PostBox = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 5px;
`;

const PostBoxTopView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const Post = styled.TouchableOpacity`
    width: 100%;
    height: 150px;
    margin: 10px;
    padding-left:10px;
    border-radius:12px;
    border: 1px black;
    /* TODO */
    /* border: 1px #8c0485; */
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`;

const PostView = styled.View`
    width: 70%;
    padding: 10px;
`;

const PostTagView = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
`;

const PostProductTitle = styled.View`
    margin-top: 5px;
    margin-bottom: 20px;
`;

const PostImage = styled.View`
    width: 30%;
    height: 80%;
    /* margin: 10px; */
    justify-content: center;
    align-items: center;
    border-radius:12px;
    border: 1px white;
`;

const PostText = styled.Text`
    font-size: 10px;
    color: black;
`;

const Text = styled.Text``;

const Tag = styled.View`
    border-radius:5px;
    background-color: red;
    padding: 2px;
    margin: 2px;
    align-items: center;
    width: 50px;
`;

