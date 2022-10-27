import { atom } from "recoil";

export const userNickname = atom({
    key: "userNickname",
    default: ""
})

export const userId = atom({
    key: "userId",
    default: ""
})

export const logInType = atom({
    key: "logInType",
    default: ""
})

export const refreshToken = atom({
    key: "refreshToken",
    default: ""
})
