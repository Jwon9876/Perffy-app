import React from "react";
import { Image } from 'react-native';

import styled from "styled-components";


function Home({navigation}){

    // navigation.setOptions({ tabBarVisible: true })

    return(
        <SafeAreaView>
            <ScrollView>
                <SearchBarView>
                    <SearchBar
                        onPress = {() => navigation.navigate('SeachPage') }
                    >
                        <Image
                            style = {{marginRight: 5}}
                            source={require('../components/icons/searchIcon.png')}
                        />         
                        <SearchBarInnerText>
                            향수 이름, 브랜드, 향기 등으로 찾기
                        </SearchBarInnerText>
                    </SearchBar>
                </SearchBarView>
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







export default Home;