import { useMutation } from "react-query";
import useStore from "../store";
import { supabase } from "../utils/supabase";
import { Post, EditedPost } from "../types";

// import { v4 as uuidv4 } from "uuid";

export const useMutatePost = () => {
  const reset = useStore((state) => state.resetEditedPost);
  const createPostMutation = useMutation(
    async (
      post: Omit<Post, "id" | "created_at" | "updated_at" | "stoped_at">
    ) => {
      const { data, error } = await supabase.from("posts").insert({
        // id: uuidv4(),
        user_id: post.user_id,
        title1: post.title1,
        title2: post.title2,
        stitle: post.stitle,
        expire: post.expire,
        guide: post.guide,
        cat: post.cat,
        image_url: post.image_url,
        started_at: post.started_at,
        post_flg: post.post_flg,
        username: post.username,
        avatar_url: post.avatar_url,
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
  const updatePostMutation = useMutation(
    async (post: EditedPost) => {
      const { data, error } = await supabase
        .from("posts")
        .update({
          user_id: post.user_id,
          title1: post.title1,
          title2: post.title2,
          stitle: post.stitle,
          expire: post.expire,
          guide: post.guide,
          cat: post.cat,
          image_url: post.image_url,
          started_at: post.started_at,
          post_flg: post.post_flg,
          username: post.username,
          avatar_url: post.avatar_url,
        })
        .eq("id", post.id);
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
  const deletePostMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);
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
  return { deletePostMutation, createPostMutation, updatePostMutation };
};
