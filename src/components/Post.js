import React from "react";
import { Text } from "react-native";
import styled from 'styled-components'

export default function Post({text}){

    return(
        <PostComponent
            onPress={() => console.log(text)}
        >
            <Text>
                {text}
            </Text>
        </PostComponent>
        
    )
}


const PostComponent = styled.TouchableOpacity`
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