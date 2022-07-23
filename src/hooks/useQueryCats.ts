import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import useStore from "../store";
import { Cat } from "../types/";

export const useQueryCats = () => {
  const session = useStore((state) => state.session);
  const getCats = async () => {
    const { data, error } = await supabase
      .from("cats")
      .select("*")
      .eq("user_id", session?.user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Cat[], Error>({
    queryKey: ["cats"],
    queryFn: getCats,
    staleTime: Infinity,
  });
};
