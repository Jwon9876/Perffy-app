import react, { useCallback, useState } from "react";

import { Text, Alert, Image, TextInput } from "react-native";

import styled from "styled-components";

import searchIcon from '../../components/icons/searchIcon.png'

import { AlertModal } from "../../components/AlertModal";



function ReviewWritingPage({ navigation }) {

    function uploadReview() {
        // TODO
        // api 연결 해야함

        Alert.alert("리뷰가 작성되었습니다.")
        // 확인 취소 버튼 추가
        navigation.goBack()
    }

    const [modal, setModal] = useState(false)
    const setModalVisible = (visible) => {
        setModal(visible)
    }
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

                    <Text
                        style={{
                            fontSize: 150
                        }}
                    >
                        별점 주기
                    </Text>

                    <Text

                        style={{
                            fontSize: 150
                        }}>
                        사진 등록하기
                    </Text>

                    <Text

                        style={{
                            fontSize: 150
                        }}>
                        태그 추가하기
                    </Text>

                    <Text

                        style={{
                            fontSize: 150
                        }}>
                        사용후기
                    </Text>
                    <AlertModal
                        modalVisible={modal}
                        setModalVisible={setModalVisible}
                    >
                    </AlertModal>
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

export default ReviewWritingPage;