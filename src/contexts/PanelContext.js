import React, { useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
import { getAllComments } from "../services/getAllComments"
import { AssignNames, GetNames } from "../services/getNames"

const Context = React.createContext()

export function usePanel() {
  return useContext(Context)
}



export function PanelProvider({ children }) {
  const { hexValue } = useParams()
  const { loading, error, value: comments } = useAsync(() => getAllComments(hexValue), [hexValue])
  const [localcomments, setLocalComments] = useState([])
  const commentsByParentId = useMemo(() => {
    const group = {}
    localcomments.forEach(comment => {
      group[comment.parentID] ||= []
      group[comment.parentID].push(comment)
    })
    return group
  }, [localcomments])

  useEffect(() => {
    localStorage.setItem("hexValue", hexValue)
  })

  useEffect(() => {
    if (comments == null) return
    setLocalComments(comments)
  }, [comments])

  function getReplies(parentId) {
    return commentsByParentId[parentId]
  }

  function createLocalComment(comment) {
    setLocalComments(prevComments => {
      return [comment, ...prevComments]
    })
  }


//   function updateLocalComment(id, message) {
//     setComments(prevComments => {
//       return prevComments.map(comment => {
//         if (comment.id === id) {
//           return { ...comment, message }
//         } else {
//           return comment
//         }
//       })
//     })
//   }

//   function deleteLocalComment(id) {
//     setComments(prevComments => {
//       return prevComments.filter(comment => comment.id !== id)
//     })
//   }

//   function toggleLocalCommentLike(id, addLike) {
//     setComments(prevComments => {
//       return prevComments.map(comment => {
//         if (id === comment.id) {
//           if (addLike) {
//             return {
//               ...comment,
//               likeCount: comment.likeCount + 1,
//               likedByMe: true,
//             }
//           } else {
//             return {
//               ...comment,
//               likeCount: comment.likeCount - 1,
//               likedByMe: false,
//             }
//           }
//         } else {
//           return comment
//         }
//       })
//     })
//   }

  return (
    <Context.Provider
      value={{
        rootComments : commentsByParentId[null],  
        getReplies,
        hexValue,
        createLocalComment,
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  )
}
  