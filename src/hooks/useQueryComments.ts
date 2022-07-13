import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import { Comment } from "../types/";

export const useQueryComments = (id: string | string[] | undefined) => {
  const getComment = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("id", id)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Comment[], Error>({
    queryKey: ["comments"],
    queryFn: getComment,
    staleTime: Infinity,
  });
};
