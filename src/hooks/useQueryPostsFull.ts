import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import { Post } from "../types/";

export const useQueryPostsFull = () => {
  const now = new Date();
  const str_now = JSON.parse(JSON.stringify(now));
  const getPostsFull = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("post_flg", "1")
      .lt("started_at", str_now)
      .order("started_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Post[], Error>({
    queryKey: ["postsfull"],
    queryFn: getPostsFull,
    staleTime: Infinity,
  });
};
