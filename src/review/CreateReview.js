import React, {useState, createRef} from 'react'
import styled from 'styled-components';
import { Alert, Dimensions, Pressable } from 'react-native';
import { Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

// TODO: 전체 리뷰 목록 -> Flat List 적용

const screenHeight = Dimensions.get('window').height;

function CreateReview() {

    const ref = firestore().collection('todos');

    async function addTodo() {
      await ref.add({
        tags: selectedTagList,
        dateTime: new Date(),
        // TODO: User ID -> Login 구현
        user: "CHOI",
        text: text
      });
    }

    const tagInputRef = createRef(null);
    const [tag, setTag] = useState("");
    const [selectedTagList, setSelectedTagList] = useState([]);
    const [recommendTagList, setRecommendTagList] = useState(['지속력', '봄', '여름', '가을', '겨울', '분위기', '상쾌한', '정장']);
    const [tagList, setTagList] = useState(['지속력', '봄', '여름', '가을', '겨울', '분위기', '상쾌한', '정장']);
    const [text, setText] = useState(``);

    function insertTag(tag){
        if(selectedTagList.some((v) => v == tag)){
            Alert.alert("중복된 태그입니다.", [{ text: "확인"}]);
            return
        }
        setSelectedTagList([...selectedTagList, tag])
    }
    function removeTag(tag){ setSelectedTagList(selectedTagList.filter(v => v !== tag)); }
    function clearTagInput(){
        setTag('');
        tagInputRef.current.clear();
    }
    
    return (
        <SafeAreaView style={{ Height: "auto", maxHeight: screenHeight}}>
            <ScrollView>
                <Pressable>
                <ProductSearch
                    onPress={() => addTodo()}
                >
                    <Text style={{color: 'white'}}>
                        제품 검색
                    </Text>
                </ProductSearch>

                <ProductView>
                    {/* TODO Image Fill Condition */}
                    {/* <Image style={{width:'40%', height:'60%'}} source={require('/Users/juwon/Documents/GitHub/Perffy/images/deep.jpeg')}/> */}
                </ProductView>

                <Text>
                    추천태그
                </Text>

{/*
                <TagView>
                    <ScrollView horizontal={true}>
                    {
                        recommendTagList.map((v) =>
                            <Tag key={v}
                                onPress={() => insertTag(v)}
                            >
                                <Text>
                                    {v}
                                </Text>
                            </Tag>
                        )
                    }
                    </ScrollView>
                </TagView>
/*}
                

                {/* TODO: TagView 내 컴포넌트 재구성 */}
                <TagInput
                        placeholder="태그를 입력해주세요."
                        onChangeText={(tag) => setTag(tag)}
                        onSubmitEditing={() => {
                            clearTagInput(),
                            insertTag(tag)
                            }
                        }
                        ref={tagInputRef}
                    >                    
                    </TagInput>

                {/* 선택된 태그 */}
                <TagView>
                    {
                        selectedTagList.map((v) =>
                            <Tag key={v} onPress={() => removeTag(v)}>
                                <Text>
                                    {v}
                                </Text>
                            </Tag>
                        )
                    }
                </TagView>

                <PostView>
                    <PostInput
                        multiline={true}
                        value={text}
                        onChangeText={text => setText(text)}
                    >
                    </PostInput>
                </PostView>

                <CancelButton></CancelButton>
                <RegisterButton></RegisterButton>
                </Pressable>
                
            </ScrollView>
        </SafeAreaView>
    )
}

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

const ScrollView = styled.ScrollView`
    flex: 1;
`

const ProductSearch = styled.TouchableOpacity`
    height: 40px;
    width: 100%;
    border-radius: 5px;
    justify-content: center;
    padding-left: 10px;
    background-color: black;
`

const ProductView = styled.View`
    margin-top: 10px;
    margin-bottom: 10px;
    height: 30%;
`;

const Text = styled.Text`
    /* font-size: 100px; */
`

const TagView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5px;
    overflow: scroll;
`;

const HorizontalScrollView = styled.ScrollView`
    height: 25px;
`

const TagInput = styled.TextInput`
    height: 40px;
    width: 100%;
    margin-bottom: 10px;
    background-color: yellow;
`;

const Tag = styled.TouchableOpacity`
    border-radius:5px;
    background-color: red;
    padding: 2px;
    margin: 2px;
    align-items: center;
    width: 50px;
`;

const PostView = styled.View`
    padding: 10px;
`;

const PostInput = styled.TextInput`
    height: 300px;
    width: 100%;
    padding: 5px;
    background-color: yellow;
`;

const RegisterButton = styled.TouchableOpacity`
    width: 50%;
    height: 150px;
    background-color: blue;
`;

const CancelButton = styled.TouchableOpacity`
    width: 50%;
    height: 70px;
`;



export default CreateReview;