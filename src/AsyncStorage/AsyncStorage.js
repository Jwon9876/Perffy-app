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


export const storeRefreshToken = async (value) => {
    try {
        await AsyncStorage.setItem('refreshToken', value)
    } catch (e) {
        // saving error
    }
}

export const getRefreshToken = async () => {
    try {
        const value = await AsyncStorage.getItem('refreshToken')
        if (value !== null) {
            return value
        } else{
            console.log("454687451323548946845000000")
            return "notExists"
        }
    } catch (e) {
        // error reading value
    }
}

export const storeUserId = async (value) => {
    try {
        await AsyncStorage.setItem('userId', value)
    } catch (e) {
        // saving error
    }
}

export const getUserId = async () => {
    try {
        const value = await AsyncStorage.getItem('userId')
        if (value !== null) {
            return value
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

export const storeRecentSearchWord = async (value) => {
    try {
        await AsyncStorage.setItem('RecentSearchKeywordKey', value)
    } catch (e){
        console.log(e)
    }
}

export const getRecentSearchWord = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('RecentSearchKeywordKey')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}
