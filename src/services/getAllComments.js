import { makeRequest } from "./makeRequest";

export function getAllComments(hexValue) {
    return makeRequest("/panel", {
        params : {hexValue:hexValue}
    })
}