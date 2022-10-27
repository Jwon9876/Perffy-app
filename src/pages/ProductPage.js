import react, { useEffect, useState } from "react";

import { Text, Image } from 'react-native'
import styled from 'styled-components';

import { WithLocalSvg } from "react-native-svg";
import BackArrowIcon from '/Users/choejuwon/Documents/GitHub/Perffy-app/src/components/icons/BackArrowIcon.svg';

import DefaultImg from '../components/icons/DefaultImg.png';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


function ProductPage({ navigation, route }) {

    const [brandName, setBrandName] = useState("");
    const [productName, setProductName] = useState("");
    const [productImgUrl, setProductImgUrl] = useState("");

    useEffect(() => {
        setProductName(route.params.ProductName)
        setProductImgUrl(route.params.ProductImgUrl)
    }, [])


    useEffect(() => {
        getProcuctInfo(route.params.ProductName)
    }, [productName])

    async function getProcuctInfo(productName) {
        await firestore().collection('Products').where('ProductName', '==', productName).get().then(querySnapshot => {
            const result = querySnapshot._docs;
            console.log(result[0]._data)
            setBrandName(result[0]._data.BrandName)
            setBrandName(result[0]._data.BrandName)
        });
    }

    return (
        <SafeAreaView>
            <TopBarView>
                <BackArrowBtn
                    onPress={() => navigation.goBack()}
                >
                    <WithLocalSvg
                        width={24}
                        height={24}
                        asset={BackArrowIcon}
                    />
                </BackArrowBtn>
            </TopBarView>
            <ScrollView>
                <ProductImgView>
                    <Image
                        style={{ width: 358, height: 358 }}
                        source={{ uri: route.params.ProductImgUrl }}

                    // source = {DefaultImg}
                    />
                </ProductImgView>
                <ProductInfoView>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: '#212121',
                            marginTop: 7
                        }}
                    >
                        {productName}
                    </Text>

                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#666666',
                            marginTop: 7
                        }}
                    >
                        {brandName}
                    </Text>
                </ProductInfoView>
            </ScrollView>
        </SafeAreaView>
    )
}

const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

const ScrollView = styled.ScrollView`
    flex: 1;
    background-color: #FFFFFF;
`;

const TopBarView = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 15px;
`;

const BackArrowBtn = styled.TouchableOpacity`
    margin-left: 24px;
`;

const ProductImgView = styled.View`
    margin-top: 12px;
    align-items: center;
`;

const ProductInfoView = styled.View`
    margin-top: 5px;
    padding-left: 17px;
`;

export default ProductPage;