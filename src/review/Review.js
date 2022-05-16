import React, {useState} from 'react'
import styled from 'styled-components';
import { ScrollView } from 'react-native';


function Review() {
    return (
        <SafeAreaView>
            <ScrollView>

            </ScrollView>
        </SafeAreaView>

    )
}

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: black;
`;

const Text = styled.Text`
    font-size: 100px;
`



export default Review;