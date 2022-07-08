import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import useStore from "../store";
import { Post } from "../types/";

export const useQueryPostsNow = () => {
  const session = useStore((state) => state.session);
  const now = new Date();
  const str_now = JSON.parse(JSON.stringify(now));
  const getPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("post_flg", "1")
      .lt("started_at", str_now)
      .gt("expire", str_now)
      .order("started_at", { ascending: false });
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
