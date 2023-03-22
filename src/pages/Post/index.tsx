import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { Comment, useComment } from "src/server/api/comments";
import { PostEntity, usePost, usePostComments } from "src/server/api/posts";

import { Fab, useTheme } from "@mui/material";
import CommentCard from "src/components/AppComponents/comment/CommentCard";
import CommentForm from "src/components/AppComponents/comment/CommentForm";
import GridPagination from "src/components/GridPagination";
import ScrollWrapperPage from "src/components/Layout/PageWrapper/ScrollWrapperPage";
import Modal from "src/components/Modal";
import useLoading from "src/context/LoadingContext";
import useToggle from "src/hooks/useToggle";
import PostDetails from "./PostDetails";

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
    refetch: refetchPostComments,
  } = usePostComments({
    postId: id,
  });

  const { create: createComment, isLoadingCreate: isLoadingCreatePost } =
    useComment({});

  const handleEditComment = () => {
    refetchPostComments();
  };

  const handleDeleteComment = () => {
    refetchPostComments();
    toast.success("Comment successfully deleted");
  };

  const handleCreateComment = (formData: Comment) => {
    createComment(formData, {
      onSuccess: () => {
        refetchPostComments();
        toggleCommentModalOpen();
        toast.success("Comment successfully added");
      },
    });
  };

  const CardComment = (comment: Comment) => (
    <CommentCard
      comment={comment}
      onEditSuccess={handleEditComment}
      onDeleteSuccess={handleDeleteComment}
    />
  );

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

      <Modal
        title="Add new comment"
        open={isCommentModalOpen}
        onClose={toggleCommentModalOpen}
        persistent={isLoadingPostsComments}
      >
        <CommentForm
          postId={post?.id}
          onSubmit={handleCreateComment}
          isLoading={isLoadingCreatePost}
        />
      </Modal>
    </ScrollWrapperPage>
  );
};

export default PostPage;
