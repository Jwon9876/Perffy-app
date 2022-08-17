import React, { useState } from "react";
import { Image, Text, Dimensions } from 'react-native';

import styled from 'styled-components';

import { WithLocalSvg } from "react-native-svg";
import BackArrowIcon from '../components/icons/BackArrowIcon.svg'




function SearchPage({ navigation }) {
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
                <Text>
                    asdaasdasdasd
                </Text>
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

const SearchBarView = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
`;

const SearchBar = styled.TouchableOpacity`
    width: 85%;
    height: 42px;
    /* border: 1px solid; */
    /* justify-content: center; */
    align-items: center;
    margin-left: 15px;
    padding-left: 10px;
    background-color: #F8F8F8;
    flex-direction: row;
`;

const SearchBarInnerText = styled.Text`
    font-size: 14px;
    font-weight: 500;
`;

const BackArrowBtn = styled.TouchableOpacity`

`;


export default SearchPage; 