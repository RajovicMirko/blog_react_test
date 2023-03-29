import AddIcon from "@mui/icons-material/Add";
import { Fab, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import CommentCard from "src/components/AppComponents/comment/CommentCard";
import CommentModalForm from "src/components/AppComponents/comment/CommentModalForm";
import GridPagination from "src/components/GridPagination";
import ScrollWrapperPage from "src/components/Layout/PageWrapper/ScrollWrapperPage";
import useLoading from "src/context/LoadingContext";
import useToggle from "src/hooks/useToggle";
import { Comment } from "src/server/api/comments";
import { PostEntity, usePost, usePostComments } from "src/server/api/posts";
import PostDetails from "../../components/AppComponents/post/PostDetails";

const PostPage = () => {
  const {
    state: { id },
  } = useLocation();

  const theme = useTheme();
  const { isAppLoading, handleLoading } = useLoading();

  const [isCommentModalOpen, toggleCommentModalOpen] = useToggle();

  const { data: post, isError: isErrorPost } = usePost({
    id,
  });

  const {
    data: postComments,
    isInitialLoading: isInitialLoadingPostsComments,
    isLoading: isLoadingPostsComments,
    isError: isErrorPostsComments,
    pagination: paginationPostsComments,
    isDataEmpty: isDataEmptyPostsComments,
  } = usePostComments({
    postId: id,
  });

  const CardComment = (comment: Comment) => <CommentCard comment={comment} />;

  handleLoading("post-page", !post && !isErrorPost);

  if (isAppLoading) return null;

  return (
    <ScrollWrapperPage>
      <PostDetails post={post} />

      <GridPagination
        list
        data={postComments}
        card={CardComment}
        pagination={paginationPostsComments}
        isLoading={
          (isInitialLoadingPostsComments || isLoadingPostsComments) &&
          !isErrorPostsComments
        }
        isDataEmpty={isDataEmptyPostsComments || !postComments?.length}
        emptyDataText={`No ${PostEntity.comments} data`}
      />

      <Fab
        color="primary"
        sx={theme.mixins.floatButtonPosition}
        onClick={toggleCommentModalOpen}
        aria-label="Add new comment"
      >
        <AddIcon />
      </Fab>

      <CommentModalForm
        postId={post?.id}
        open={isCommentModalOpen}
        onClose={toggleCommentModalOpen}
      />
    </ScrollWrapperPage>
  );
};

export default PostPage;
