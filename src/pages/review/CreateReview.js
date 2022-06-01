import React, { useState, createRef } from 'react'
import styled from 'styled-components';
import { Alert, Dimensions, Pressable } from 'react-native';
import { Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';

// TODO: 전체 리뷰 목록 -> Flat List 적용

const screenHeight = Dimensions.get('window').height;

function CreateReview({ navigation }) {

    const ref = firestore();

    const tagInputRef = createRef(null);
    const [tag, setTag] = useState("");
    const [selectedTagList, setSelectedTagList] = useState([]);
    const [recommendTagList, setRecommendTagList] = useState(['지속력', '봄', '여름', '가을', '겨울', '분위기', '상쾌한', '정장']);
    const [text, setText] = useState(``);

    async function registerReview() {
        await firestore().collection('Reviews')
        // doc naming issue
        // 날짜로 넣을까?
        // 다른 방법이 있을까? -> epoch time ?

            .doc(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
            .set({
                tags: selectedTagList,
                dateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                // TODO: User ID -> Login 구현
                user: "CHOI",
                text: text
            })
            .then(() => {
                console.log('Review registered!');
            });
    }

    function insertTag(tag) {
        if (selectedTagList.some((v) => v == tag)) {
            Alert.alert("중복된 태그입니다.", [{ text: "확인" }]);
            return
        }
        setSelectedTagList([...selectedTagList, tag])
    }
    function removeTag(tag) { setSelectedTagList(selectedTagList.filter(v => v !== tag)); }
    function clearTagInput() {
        setTag('');
        tagInputRef.current.clear();
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <ProductSearch
                    onPress={() => console.log("456as")}
                >
                    <Text style={{ color: 'white' }}>
                        제품 검색
                    </Text>
                </ProductSearch>

                <ProductView>
                    {/* TODO Image Fill Condition */}
                    {/* <Image style={{width:'40%', height:'60%'}} source={require('/Users/juwon/Documents/GitHub/Perffy/images/deep.jpeg')}/> */}
                </ProductView>

                <Text style={{ marginLeft: 5 }}>
                    추천태그
                </Text>

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

                {/* 선택된 태그 */}
                <TagView>
                    <ScrollView horizontal={true}>
                        {
                            selectedTagList.map((v) =>
                                <Tag key={v} onPress={() => removeTag(v)}>
                                    <Text>
                                        {v}
                                    </Text>
                                </Tag>
                            )
                        }
                    </ScrollView>
                </TagView>

                <TagInputView>
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

                    <TagAddButton onPress={() => {
                        clearTagInput(),
                        insertTag(tag)
                    }}>
                        <Text style={{fontSize: 15}}>
                            +
                        </Text>
                    </TagAddButton>
                </TagInputView>

                <PostView>
                    <PostInput
                        multiline={true}
                        value={text}
                        onChangeText={text => setText(text)}
                    >
                    </PostInput>
                </PostView>

                <BottomButtonView>
                    <CancelButton onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 25 }}>
                            취소
                        </Text>
                    </CancelButton>
                    <RegisterButton onPress={() => registerReview()}>
                        <Text style={{ fontSize: 25 }}>
                            등록
                        </Text>
                    </RegisterButton>
                </BottomButtonView>
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
    height: 40px;
`;

const TagInputView = styled.View`
    padding: 10px 10px;
    flex-direction: row;
    align-items: center;
`;

const HorizontalScrollView = styled.ScrollView`
    height: 25px;
`

const TagInput = styled.TextInput`
    height: 30px;
    width: 80%;
    border: 1px solid;
    border-radius: 5px;
    padding: 5px 5px;
`;

const TagAddButton = styled.TouchableOpacity`
    height: 30px;
    width: 30px;
    border: 1px solid;
    border-radius: 15px;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
`;

const Tag = styled.TouchableOpacity`
    border: 1px solid;
    border-radius:5px;
    padding: 2px;
    margin: 2px;
    align-items: center;
    width: auto;
`;

const PostView = styled.View`
    padding: 10px;
`;

const PostInput = styled.TextInput`
    height: 300px;
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid;
`;

const RegisterButton = styled.TouchableOpacity`
    width: 50%;
    height: 50px;
    border: 1px solid;
    justify-content: center;
    align-items: center;
`;

const CancelButton = styled.TouchableOpacity`
    width: 50%;
    height: 50px;
    border: 1px solid;
    justify-content: center;
    align-items: center;
`;

const BottomButtonView = styled.View`
    flex-direction: row;
    height: 150px;
    margin: 50px 0px 250px 0px ;
`;



export default CreateReview;