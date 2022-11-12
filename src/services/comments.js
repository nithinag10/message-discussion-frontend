import { makeRequest } from "./makeRequest";

export function createComment({ hexValue, message }) {
    return makeRequest('/comment', {
      method: "POST",
      data: 
      { "hashValue": hexValue,
        "comment":message,
        "name" : localStorage.getItem("username")
      },
    })
  }

export function createCommentReply({message, id}) {
    return makeRequest("/reply-comment", {
        method: "POST",
        data: 
        { "commentID": id,
          "comment":message,
          "name" : localStorage.getItem("username"),
          "hexValue":localStorage.getItem("hexValue")
        },
    })
}