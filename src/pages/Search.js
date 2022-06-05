import React, { useState, useEffect } from 'react'
import { ScrollView, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import styled from 'styled-components';
// import Post from '../components/Post';



/*
    TODO:
    초기 데이터 불러오는 쿼리
    쿼리 통해 받아온 데이터 Post 컴포넌트로 전달하여 display
    
    flat list 스크롤 이벤트
    스크롤 이벤트 터지면 쿼리로 받아온 데이터 이후 데이터 받아오기
    Post 컴토넌트로 재전달 

    반복
*/

function Search({ navigation }) {

    let isInit = true;
    let arr = [];

    // 검색어
    const [searchQuery, setSearchQuery] = useState('');

    // firebase로 부터 읽어오는 데이터
    const [queryData, setQueryData] = useState([]);


    function onChangeSearch(changedText) { setSearchQuery(changedText) };

    const reviewCollection = firestore().collection('Reviews');

    async function loadReviewCollection() {
        await firestore().collection('Reviews').get().then((querySnapshot) => {
            querySnapshot.forEach(snapshot => {
                let data = snapshot.data();
                setQueryData(queryData => [...queryData, data])
            })
        })
        // console.log(arr)
    }
    
    async function searchReview(keyword){
        await firestore().collection('Reviews').where('productName', '==', `${keyword}`).get().then(querySnapshot => {
            // console.log(querySnapshot._docs)
            querySnapshot.forEach(doc => {
                let data = doc.data();
                console.log(data)
            })
        });
    }


    useEffect(() => {
        loadReviewCollection()
    }, [])

    const renderItem = ({ item }) => {
        return (
            <Post
                onPress={() => console.log(item)}
            >
                <ProductPicView>
                    <Text>
                        asd
                    </Text>
                </ProductPicView>
                <SummaryView>
                    <Text>
                        {item["dateTime"]}
                    </Text>

                    {/* <Text>
                    {item["tags"]}
                </Text> */}

                    {/* <Text>
                    {item["tags"].length}
                </Text> */}
                    <TagView>
                        {item["tags"].map((element) =>
                        (
                            <Tag key={element}>
                                <Text>
                                    {element}
                                </Text>
                            </Tag>
                        )
                        )}
                    </TagView>


                    <Text>
                        {item["text"]}
                    </Text>

                    {/* <Text>
                    {item["user"]}
                </Text> */}
                </SummaryView>
            </Post>
        );
    };

    return (

        <SafeAreaView>
            <Searchbar
                placeholder="검색어를 입력해주세요"
                onChangeText={(e) => {
                    onChangeSearch(e),
                    searchReview(e)
                }}
            />
            <Container>
                <FlatList
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}

                    data={queryData}
                    renderItem={renderItem}
                    windowSize={5}
                // TODO: Flatlist 최하단 load more 기능 구현
                // onEndReachedThreshold={() => console.log("End Point")}
                />
            </Container>
        </SafeAreaView>
    )
}

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    padding: 5px 5px;
`;

const Post = styled.TouchableOpacity`
    width: 100%;
    height: 150px;
    padding: 0 10px 0 5px;
    margin: 5px 0 5px 0;
    border-radius:12px;
    border: 1px black;
    /* TODO */
    /* border: 1px #8c0485; */
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`;

const Text = styled.Text`
    /* margin-top: 10px; */
`;

const Tag = styled.View`
    border: 1px solid;
    border-radius:5px;
    padding: 2px;
    margin: 2px;
    align-items: center;
    width: auto;
`;

const TagView = styled.View`
    /* width: auto; */
    flex-wrap: wrap;
    flex-direction: row;
`;

const ProductPicView = styled.View`
    width: 30%;
    background-color: red;
`;

const SummaryView = styled.View`
    /* width: 70%; */
    padding: 5px;

`;

export default Search; 