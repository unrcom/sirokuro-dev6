import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
// import { Post } from "../types/";

export type Post = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string | undefined;
  title1: string | undefined;
  title2: string | undefined;
  stitle: string | undefined;
  expire: string | undefined;
  guide: string | undefined;
  cat: string | undefined;
  image_url: string | undefined;
  started_at: string | undefined;
  post_flg: string | undefined;
  stoped_at: string | undefined;
  username: string | undefined;
  avatar_url: string | undefined;
};

export const useQueryPost = (id: string | string[] | undefined) => {
  const getPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Post, Error>({
    queryKey: ["posts"],
    queryFn: getPost,
    staleTime: Infinity,
  });
};
