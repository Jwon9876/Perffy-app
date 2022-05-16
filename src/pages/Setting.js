import React from 'react'
import {ScrollView, Text} from 'react-native';
import styled from 'styled-components';

function Settings({navigation}) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text>Settings</Text>
          <Text>Email : Example@Example.com</Text>
          <Text>Tel : 02-***-***</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

const ProfileView = styled.TouchableOpacity`
`;


export default Settings; 