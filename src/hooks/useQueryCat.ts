import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import useStore from "../store";
import { Cat } from "../types/";
import { useMutateCat } from "../hooks/useMutateCat";

export const useQueryCat = (id: string | string[] | undefined) => {
  const session = useStore((state) => state.session);
  const editedCat = useStore((state) => state.editedCat);
  const update = useStore((state) => state.updateEditedCat);
  // const { createCatMutation } = useMutateCat();
  const getCat = async () => {
    const { data, error, status } = await supabase
      .from("cats")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Cat, Error>({
    queryKey: ["cat"],
    queryFn: getCat,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data) {
        update({
          name: data.name,
        });
      }
    },
  });
};
