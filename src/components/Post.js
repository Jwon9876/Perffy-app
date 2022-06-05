import React from "react";
import { Text } from "react-native";
import styled from 'styled-components'

export default function Post({data}){

    return(
        <PostComponent
            onPress={() => console.log(data)}
        >
            <Text>
                {data}
            </Text>
        </PostComponent>
        
    )
}


const PostComponent = styled.TouchableOpacity`
    width: 100%;
    height: 150px;
    padding-left:10px;
    margin: 5px 0 5px 0;
    border-radius:12px;
    border: 1px black;
    /* TODO */
    /* border: 1px #8c0485; */
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`;