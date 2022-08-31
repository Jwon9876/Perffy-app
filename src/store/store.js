import { atom } from "recoil";

// 컴포넌트에서 아톰을 사용하기 위해 export를 사용해 내보냅니다.
export const userNickname = atom({
    key: "userNickname",
    default: ""
})

export const userId = atom({
    key: "userId",
    default: ""
})

