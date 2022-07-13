import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import { Comment } from "../types/";

export const useQueryCommentMine = (id: string, user_id: string) => {
  const getCommentMine = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("id", id)
      .eq("user_id", user_id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Comment, Error>({
    queryKey: ["comments"],
    queryFn: getCommentMine,
    staleTime: Infinity,
  });
};
