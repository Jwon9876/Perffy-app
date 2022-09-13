import react from 'react';
import { Text } from 'react-native';

import styled from 'styled-components';

import Modal from 'react-native-modal';


// Alert Modal

export function AlertModal(props) {
    return (
        <ModalView>
            <Modal
                isVisible={props.modalVisible}
                style = {{
                    backgroundColor: 'white'
                }}
            >
                <Text>
                    하이하이
                </Text>
                <ConfirmBtn
                    onPress={() => props.setModalVisible(false)}
                >
                </ConfirmBtn>
            </Modal>
        </ModalView>
    )
}

const ModalView = styled.View`
    /* flex: 1; */
    /* height: 200px; */
    justify-content: center;
    align-items: center;

`;

const ConfirmBtn = styled.TouchableOpacity`
    width: 150px;
    height: 150px;
    background-color: red;
`;