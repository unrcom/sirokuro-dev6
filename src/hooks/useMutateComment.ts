import { useMutation } from "react-query";
// import useStore from "../store";
import { supabase } from "../utils/supabase";
import { Comment } from "../types";

export const useMutateComment = () => {
  const createCommentMutation = useMutation(
    async (comment: Omit<Comment, "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("comments").insert({
        suki: comment.suki,
        user_id: comment.user_id,
        username: comment.username,
        image_url: comment.image_url,
        text: comment.text,
        delf: comment.delf,
      });
      if (error) throw new Error(error.message);
      return data;
    },
    {
      // onSuccess: () => {
      //   reset();
      // },
      onError: (err: any) => {
        alert(err.message);
        // reset();
      },
    }
  );
  const updateCommentMutation = useMutation(
    async (
      comment: Omit<
        Comment,
        "created_at" | "updated_at" | "username" | "image_url"
      >
    ) => {
      const { data, error } = await supabase
        .from("comments")
        .update({
          text: comment.text,
          delf: comment.delf,
        })
        .eq("id", comment.id)
        .eq("suki", comment.suki)
        .eq("user_id", comment.user_id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      // onSuccess: () => {
      //   reset();
      // },
      onError: (err: any) => {
        alert(err.message);
        // reset();
      },
    }
  );
  const deleteCommentMutation = useMutation(
    async (
      comment: Omit<
        Comment,
        "created_at" | "updated_at" | "username" | "image_url" | "text" | "delf"
      >
    ) => {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", comment.id)
        .eq("suki", comment.suki)
        .eq("user_id", comment.user_id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      // onSuccess: () => {
      //   reset();
      // },
      onError: (err: any) => {
        alert(err.message);
        // reset();
      },
    }
  );
  return {
    deleteCommentMutation,
    createCommentMutation,
    updateCommentMutation,
  };
};
