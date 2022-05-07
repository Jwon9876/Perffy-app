import React from 'react'
import {ScrollView, Text} from 'react-native';
import styled from 'styled-components';

function Search({navigation}) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text>Search</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;


export default Search; 