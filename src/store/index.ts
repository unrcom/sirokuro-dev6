import create from "zustand";
import { Session } from "@supabase/supabase-js";
import { EditedProfile, EditedPost } from "../types";

type State = {
  session: Session | null;
  setSession: (payload: Session | null) => void;
  editedProfile: EditedProfile;
  updateEditedProfile: (payload: EditedProfile) => void;
  resetEditedProfile: () => void;
  editedPost: EditedPost;
  updateEditedPost: (payload: EditedPost) => void;
  resetEditedPost: () => void;
};
const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedProfile: {
    username: "",
    avatar_url: "",
    // plan: "",
    contact_madd: "",
    year_of_birth: "",
    zip: "",
    job: "",
    facebook: "",
    twitter: "",
    homepage: "",
    blog: "",
    gender: "",
  },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar_url: payload.avatar_url,
        contact_madd: payload.contact_madd,
        year_of_birth: payload.year_of_birth,
        zip: payload.zip,
        job: payload.job,
        facebook: payload.facebook,
        twitter: payload.twitter,
        homepage: payload.homepage,
        blog: payload.blog,
        gender: payload.gender,
      },
    }),
  resetEditedProfile: () =>
    set({
      editedProfile: {
        username: "",
        avatar_url: "",
        // plan: "",
        contact_madd: "",
        year_of_birth: "",
        zip: "",
        job: "",
        facebook: "",
        twitter: "",
        homepage: "",
        blog: "",
        gender: "",
      },
    }),
  editedPost: {
    id: "",
    user_id: "",
    title1: "",
    title2: "",
    stitle: "",
    expire: null,
    guide: "",
    cat: "",
    image_url: "",
    started_at: null,
    post_flg: "",
  },
  updateEditedPost: (payload) =>
    set({
      editedPost: {
        id: payload.id,
        user_id: payload.user_id,
        title1: payload.title1,
        title2: payload.title2,
        stitle: payload.stitle,
        expire: payload.expire,
        guide: payload.guide,
        cat: payload.cat,
        image_url: payload.image_url,
        started_at: payload.started_at,
        post_flg: payload.post_flg,
      },
    }),
  resetEditedPost: () =>
    set({
      editedPost: {
        id: "",
        user_id: "",
        title1: "",
        title2: "",
        stitle: "",
        expire: null,
        guide: "",
        cat: "",
        image_url: "",
        started_at: null,
        post_flg: "",
      },
    }),
}));

export default useStore;
