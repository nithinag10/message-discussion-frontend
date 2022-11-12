import { useAsync, useAsyncFn } from "../hooks/useAsync"
import { usePanel } from "../contexts/PanelContext"
import { CommentList } from "./CommentList"
import { CommentForm } from "./CommentForm"
import { createComment } from "../services/comments"


export function Panel() {
    const {hexValue, rootComments ,createLocalComment} = usePanel()
    const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

    function onCommentCreate(message) {
      return createCommentFn({ hexValue, message}).then(createLocalComment)
    }

    return  <>
    <h3 className="comments-title">Comments</h3>
    <section>
    <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
      {rootComments != null && rootComments.length > 0 && (
        <div className="mt-4">
          <CommentList comments={rootComments} hexValue />
        </div>
      )}
    </section>
  </>
    
  
}