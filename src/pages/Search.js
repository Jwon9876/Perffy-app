import React, { useState } from 'react'
import { ScrollView, Text, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components';
import Post from '../components/Post';


function Search({ navigation }) {

    function onChangeSearch(changedText) { setSearchQuery(changedText) };

    const [searchQuery, setSearchQuery] = useState('');

    const arr = [];
    for (let i = 0; i < 100; i++) { arr.push(i); }

    return (
        <SafeAreaView>
            <Searchbar
                placeholder="검색어를 입력해주세요"
                onChangeText={(e) => onChangeSearch(e)}
                value={searchQuery}
            />
            <Container>
                <FlatList
                    keyExtractor={post => post.toString()}
                    data={arr}
                    renderItem={({ item }) => <Post text={item} />}
                    windowSize={5}
                    onScroll={(e) => console.log(e)}
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
    /* align-items: center; */
    padding: 5px 5px;
`;


export default Search; 