import React, {useState} from 'react';
import { ScrollView, Text, TextInput, Button } from 'react-native';

import firestore from '@react-native-firebase/firestore';


function App(){
    const [ todo, setTodo ] = useState('');
    const ref = firestore().collection('todos');

    async function addTodo() {
      await ref.add({
        title: "789456211651",
        complete: false,
      });
      setTodo('');
      await ref.doc.add("4565789")
    }

    return (
      <>
        <ScrollView style={{flex: 1}}>
          <Text>List of TODOs!</Text>
        </ScrollView>
        <TextInput label={'New Todo'} value={todo} onChangeText={setTodo} />
        <Button onPress={() => {addTodo()}} title = {'456456'}> 

          </Button>
      </>
    );
}

export default App;