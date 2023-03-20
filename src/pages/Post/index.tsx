import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

import posts, { PostEntity } from "src/server/api/posts";
import comments, { Comment } from "src/server/api/comments";

import useLoading from "src/context/LoadingContext";
import PostDetails from "./PostDetails";
import ScrollWrapperPage from "src/components/Layout/PageWrapper/ScrollWrapperPage";
import GridPagination from "src/components/GridPagination";
import Modal from "src/components/Modal";
import useToggle from "src/hooks/useToggle";
import CommentForm from "src/components/AppComponents/comment/CommentForm";
import CommentCard from "src/components/AppComponents/comment/CommentCard";
import { Fab, useTheme } from "@mui/material";

const PostPage = () => {
  const {
    state: { id },
  } = useLocation();

  const theme = useTheme();
  const { isAppLoading, handleLoading } = useLoading();

  const [isCommentModalOpen, toggleCommentModalOpen] = useToggle();

  const { data: post, isError: isErrorPost } = posts.one({
    id: Number(id),
  });

  const {
    data: postComments,
    isInitialLoading: isInitialLoadingPostsComments,
    isLoading: isLoadingPostsComments,
    isError: isErrorPostsComments,
    pagination: paginationPostsComments,
    isDataEmpty: isDataEmptyPostsComments,
    refetch: refetchPostComments,
  } = posts.oneEntity({
    id: Number(id),
    entity: PostEntity.comments,
  });

  const { create: createComment, isLoadingCreate: isLoadingCreatePost } =
    comments.one();

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
