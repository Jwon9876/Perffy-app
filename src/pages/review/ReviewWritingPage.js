import react, { useCallback, useEffect, useState, createRef } from "react";

import { Text, Alert, Image, TextInput } from "react-native";

import styled from "styled-components";

import searchIcon from '../../components/icons/searchIcon.png'

import { AlertModal } from "../../components/AlertModal";

import { launchImageLibrary } from 'react-native-image-picker';

import StarRating from 'react-native-star-rating-widget';



function ReviewWritingPage({ navigation }) {

    const [rating, setRating] = useState(0);
    const [selectedTagList, setSelectedTagList] = useState([]);
    const [tag, setTag] = useState("");
    const [productReviewImg, setProductReviewImg] = useState("")

    const [modal, setModal] = useState(false)
    const tagInputRef = createRef(null);

    function uploadReview() {
        // TODO
        // api 연결 해야함

        Alert.alert("리뷰가 작성되었습니다.")
        // 확인 취소 버튼 추가
        navigation.goBack()
    }

    function insertTag(tag) {
        const pattern = /\s/g;
        if (selectedTagList.some((v) => v == tag)) {
            Alert.alert("중복된 태그입니다.", [{ text: "확인" }]);
            return
        } else if ((tag == "") || tag.match(pattern)) {
            Alert.alert("정확한 태그를 입력해주세요.", [{ text: "확인" }]);
            return
        }
        setSelectedTagList([...selectedTagList, tag])
    }
    function removeTag(tag) { setSelectedTagList(selectedTagList.filter(v => v !== tag)); }
    function clearTagInput() {
        setTag('');
        tagInputRef.current.clear();
    }

    const setModalVisible = (visible) => {
        setModal(visible)
    }



    const ShowPicker = () => {
        launchImageLibrary({}, (res) => {
            try {
                console.log(res.assets[0].uri)
                setProductReviewImg(res.assets[0].uri)
                const formdata = new FormData()
                formdata.append('file', res.assets[0].uri);
                console.log(res);
            } catch {
                console.log("not selected")
            }

        })
    }

    useEffect(() => {
        console.log(rating)
    }, [rating])

    useEffect(() => {
        console.log(productReviewImg)
    }, [productReviewImg])

    return (
        <>
            <SafeAreaView>
                <HeaderView>
                    <CloseBtn
                        onPress={() => navigation.goBack()}
                    >
                        <Text
                            style={{
                                color: '#9E9E9E'
                            }}
                        >
                            X
                        </Text>
                    </CloseBtn>
                    <HeaderText>
                        리뷰 쓰기
                    </HeaderText>

                    <CompleteBtn
                        onPress={() =>
                            setModalVisible(true)
                            // uploadReview()
                        }
                    >
                        <Text
                            style={{
                                color: '#5ABACA',
                                fontWeight: 'bold'
                            }}
                        >
                            완료
                        </Text>
                    </CompleteBtn>
                </HeaderView>
                <ScrollView>
                    <SearchBarView>
                        <SearchBar>
                            <Image
                                style={{ marginRight: 5 }}
                                source={searchIcon}
                            />
                            <TextInput
                                style={{ minWidth: 30, minHeight: "100%" }}
                                placeholder="향수 이름 검색"
                            />
                        </SearchBar>
                    </SearchBarView>

                    <WritingView>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '500',
                                marginTop: 30
                            }}
                        >
                            별점 주기
                        </Text>
                        <StarRating
                            rating={rating}
                            onChange={setRating}
                            color="#5ABACA"
                            starSize={25}
                            starStyle={{ marginLeft: -2, marginRight: -1, marginTop: 2 }}
                            animationConfig={{ scale: 1 }}
                        />

                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '500',
                                marginTop: 20
                            }}
                        >
                            사진 등록하기
                        </Text>

                        <>
                            <AddProductReviewImg
                                onPress={() => {
                                    ShowPicker()
                                }}
                                onLongPress = {() => setProductReviewImg("")}
                            >

                                {
                                    (
                                        productReviewImg == ""
                                    ) ? (
                                        <Add>
                                            <PlusY></PlusY>
                                            <PlusX></PlusX>
                                            <PlusY></PlusY>
                                        </Add>
                                    ) : (
                                        <Image
                                            style={{ width: 108, height: 108, borderRadius: 5 }}
                                            source={{ uri: productReviewImg }}
                                        />
                                    )
                                }

                            </AddProductReviewImg>
                        </>

                        {/* {
                            productReviewImg.map((v) =>


                            )
                        } */}

                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '500',
                                marginTop: 25
                            }}
                        >
                            태그 추가하기
                        </Text>

                        <TagInputView>
                            {/* TODO: TagView 내 컴포넌트 재구성 */}
                            <TagInput
                                placeholder="향수를 설명하는 키워드를 적어주세요 !"
                                placeholderTextColor='#9E9E9E'
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
                                <Add>
                                    <PlusY></PlusY>
                                    <PlusX></PlusX>
                                    <PlusY></PlusY>
                                </Add>
                            </TagAddButton>
                        </TagInputView>

                        <TagView>
                            <ScrollView horizontal={true}>
                                {
                                    selectedTagList.map((v) =>
                                        <Tag key={v} onPress={() => removeTag(v)}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#FFFFFF',
                                                    marginLeft: 10,
                                                    marginRight: 10,
                                                    marginTop: 3,
                                                    marginBottom: 3,
                                                }}
                                            >
                                                {`#${v}`}
                                            </Text>
                                        </Tag>
                                    )
                                }
                            </ScrollView>
                        </TagView>

                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '500',
                                marginTop: 20
                            }}
                        >
                            사용후기
                        </Text>

                        <ReviewInputView>
                            <TextInput
                                style={{
                                    width: '100%',
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                }}
                                multiline={true}
                                placeholder="특별히 좋았던 점, 예상과 달랐던 점 등을 들려주세요!"
                                placeholderTextColor='#9E9E9E'
                            >
                            </TextInput>
                        </ReviewInputView>
                    </WritingView>

                </ScrollView>
                <AlertModal
                    modalVisible={modal}
                    setModalVisible={setModalVisible}
                >
                </AlertModal>
            </SafeAreaView >

        </>
    )
}

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

const ScrollView = styled.ScrollView`
    flex: 1;
`;

const HeaderView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 0 20px;
`;

const HeaderText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const SearchBarView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
`;

const SearchTextInput = styled.TextInput`

`;

const SearchBar = styled.View`
    width: 85%;
    height: 42px;
    /* border: 1px solid; */
    /* justify-content: center; */
    align-items: center;
    margin-left: 15px;
    padding-left: 10px;
    background-color: #F8F8F8;
    flex-direction: row;
    padding-right: 30px;
`;

const CloseBtn = styled.TouchableOpacity`
`;

const CompleteBtn = styled.TouchableOpacity`
`;

const WritingView = styled.View`
    padding-left: 20px;
`;

const AddProductReviewImg = styled.TouchableOpacity`
    width: 108px;
    height: 108px;
    border-radius: 5px;
    background-color: #F5F5F5;
    margin-top: 5px;
    justify-content: center;
    align-items: center;
`;

const Add = styled.View`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: #5ABACA;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: row;
`;

const PlusX = styled.View`
    background-color: #F5F5F5;
    width: 2px;
    height: 12px;
`;

const PlusY = styled.View`
    background-color: #F5F5F5;
    width: 6px;
    height: 2px;
`;

const TagView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5px;
    overflow: scroll;
    height: 40px;
`;

const TagInputView = styled.View`
    background-color: #F8F8F8;
    margin-top: 7px;
    padding: 10px 10px;
    flex-direction: row;
    align-items: center;
    width: 95%;
    height: 42px;
`;

const HorizontalScrollView = styled.ScrollView`
    height: 25px;
`

const TagInput = styled.TextInput`
    height: 30px;
    width: 80%;
    padding: 5px 5px;
`;

const TagAddButton = styled.TouchableOpacity`
    height: 30px;
    width: 30px;
    position: absolute;
    right: 3px;
    justify-content: center;
    align-items: center;
`;

const Tag = styled.TouchableOpacity`
    border-radius:20px;
    margin: 2px;
    align-items: center;
    width: auto;
    background-color: #FFA1B2;
`;

const ReviewInputView = styled.View`
    background-color: #F8F8F8;
    margin-top: 10px;
    padding: 10px 10px;
    flex-direction: row;
    align-items: center;
    width: 95%;
    height: 220px;
`;

const ReviewInput = styled.TextInput`
    height: 300px;
    width: 100%;
    padding: 5px 5px;
`;




export default ReviewWritingPage;