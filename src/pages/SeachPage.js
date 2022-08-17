import React from 'react'

import styled from 'styled-components';

function SeachPage({ navigation }) {
    return (

        <SafeAreaView>
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

export default SeachPage; 