import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
        // saving error
    }
}

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value !== null) {
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
}

export const storeObjectData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getObjectData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export const storeRecentSearchKeyword = async (value) => {
    try {
        const getJsonValue = await AsyncStorage.getItem('RecentSearchKeywordKey')
        if(getJsonValue != null){
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('RecentSearchKeywordKey', jsonValue)
        }
    } catch (e){
        console.log(e)
    }
}

export const getRecentSearchKeyword = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('RecentSearchKeywordKey')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}
