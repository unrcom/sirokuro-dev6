import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import useStore from "../store";
import { Cat } from "../types/";

export const useQueryCatsAll = () => {
  const session = useStore((state) => state.session);
  const getCatsAll = async () => {
    const { data, error } = await supabase
      .from("cats")
      .select("*")
      .eq("del_f", false)
      .order("com_cnt", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Cat[], Error>({
    queryKey: ["catsall"],
    queryFn: getCatsAll,
    staleTime: Infinity,
  });
};
