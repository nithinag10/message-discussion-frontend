import { IconBtn } from "./IconBtn"
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa"
import { usePanel } from "../contexts/PanelContext"
import { CommentList } from "./CommentList"
import { useState } from "react"
import { useAsyncFn } from "../hooks/useAsync"
import { createCommentReply } from "../services/comments"
import { CommentForm } from "./CommentForm"

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })

export function Comment({id , comment, date, name}) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const {getReplies, createLocalComment} = usePanel()
  const childComments = getReplies(id)
  const createCommentFn = useAsyncFn(createCommentReply)

  function onCommentReply(message) {
    return createCommentFn
      .execute({ message, id})
      .then(comment => {
        setIsReplying(false)
        createLocalComment(comment)
      })
  }

    return <>
         <div className="comment">
        <div className="header">
          <span className="name">{name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(date))}
          </span>
        </div>
        <div>
            {comment}
        </div>
        <div className="footer">
        <IconBtn
            onClick={() => setIsReplying(prev => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-3 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
}