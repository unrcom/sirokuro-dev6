import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import { Profile } from "../types/";

export const useQueryProfileOther = (id: string | undefined) => {
  const getProfileOther = async () => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Profile, Error>({
    queryKey: ["profile"],
    queryFn: getProfileOther,
    staleTime: Infinity,
    // onSuccess: (data) => {
    // },
  });
};
