import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import useStore from "../store";
import { Post } from "../types/";

export const useQueryPosts = () => {
  const session = useStore((state) => state.session);
  const getPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", session?.user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: Infinity,
  });
};
