import { useState, FormEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/solid";
import { useQueryPosts } from "../hooks/useQueryPosts";
import { useQueryProfile } from "../hooks/useQueryProfile";
import { useMutatePost } from "../hooks/useMutatePost";
import { useDownloadUrl } from "../hooks/useDownloadUrl";
import { useUploadPostImg } from "../hooks/useUploadPostImg";
import { Spinner } from "../components/Spinner";
import { Appdrawer } from "../components/Appdrawer";
import { Footer } from "../components/Footer";

import styles from "./post.module.css";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import useStore from "../store";
import { Post } from "../types";

const Post: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedPost = useStore((state) => state.editedPost);
  const { data: profile } = useQueryProfile();
  const update = useStore((state) => state.updateEditedPost);
  const { updatePostMutation, createPostMutation } = useMutatePost();
  const { useMutateUploadPostImg } = useUploadPostImg();
  const { fullUrl: postImgUrl_rtn, isLoading } = useDownloadUrl(
    editedPost.image_url,
    "posts"
  );

  const [id, setId] = useState<string | undefined>("");
  //   update({ ...editedPost, id: id });
  const [title1, setTitle1] = useState<string | undefined>("");
  const [title2, setTitle2] = useState<string | undefined>("");
  const [stitle, setStitle] = useState<string | undefined>("");
  const [guide, setGuide] = useState<string | undefined>("");
  const [started_at, setStarted_at] = useState<Date | null>(null);
  const [expire, setExpire] = useState<Date | null>(null);
  const [post_flg, setPost_flg] = useState<string | undefined>("");

  const { data: posts } = useQueryPosts();
  let posts_current = posts;
  // console.log(posts_current);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session) {
      // console.log(session);
      // console.log(editedPost);
      if (session.user) {
        if (session.user.id) {
          // if (editedPost.stitle === "") {
          if (stitle === "") {
            alert("一覧表示用タイトルを指定してください。");
            // } else if (editedPost.title1 === "") {
          } else if (title1 === "") {
            alert("タイトル１を指定してください。");
            // } else if (editedPost.title2 === "") {
          } else if (title2 === "") {
            alert("タイトル２を指定してください。");
            // } else if (editedPost.title2 === "") {
          } else if (guide === "") {
            alert("ガイドテキストを指定してください。");
            // } else if (!editedPost.started_at) {
          } else if (!started_at) {
            alert("掲載開始日を指定してください。");
            // } else if (!editedPost.expire) {
          } else if (!expire) {
            alert("掲載終了日を指定してください。");
            // } else if (editedPost.post_flg === "") {
          } else if (post_flg === "") {
            alert("掲載ステータスを指定してください。");
          } else {
            let rtn;
            let post_edited: Post;
            if (id === "") {
              rtn = await createPostMutation.mutateAsync({
                user_id: session?.user?.id,
                // title1: editedPost.title1,
                // title2: editedPost.title2,
                // stitle: editedPost.stitle,
                // expire: editedPost.expire,
                // guide: editedPost.guide,
                // cat: editedPost.cat,
                // image_url: editedPost.image_url,
                // started_at: editedPost.started_at,
                // post_flg: editedPost.post_flg,
                title1: title1,
                title2: title2,
                stitle: stitle,
                expire: expire,
                guide: guide,
                cat: "",
                image_url: postImgUrl_rtn,
                started_at: started_at,
                post_flg: post_flg,
                username: profile?.username,
                avatar_url: profile?.avatar_url,
              });
              post_edited = {
                id: rtn[0].id,
                created_at: rtn[0].created_at,
                updated_at: rtn[0].updateed_at,
                user_id: rtn[0].user_id,
                stitle: rtn[0].stitle,
                title1: rtn[0].title1,
                title2: rtn[0].title2,
                expire: rtn[0].expire,
                guide: rtn[0].guide,
                cat: rtn[0].cat,
                image_url: rtn[0].image_url,
                started_at: rtn[0].started_at,
                post_flg: rtn[0].post_flg,
                stoped_at: rtn[0].stoped_at,
                username: profile?.username,
                avatar_url: profile?.avatar_url,
              };
              posts_current?.unshift(post_edited);
            } else {
              rtn = await updatePostMutation.mutateAsync({
                id: id,
                user_id: session?.user?.id,
                title1: title1,
                title2: title2,
                stitle: stitle,
                expire: expire,
                guide: guide,
                cat: "",
                image_url: editedPost.image_url,
                started_at: started_at,
                post_flg: post_flg,
                username: profile?.username,
                avatar_url: profile?.avatar_url,
              });
              let posts_current_pos = posts_current?.find(
                (unr) => unr.id === id
              );
              if (posts_current_pos) {
                posts_current_pos.stitle = stitle;
                posts_current_pos.user_id = session?.user?.id;
                posts_current_pos.title1 = title1;
                posts_current_pos.title2 = title2;
                posts_current_pos.expire = expire;
                posts_current_pos.guide = guide;
                posts_current_pos.image_url = editedPost.image_url;
                posts_current_pos.started_at = started_at;
                posts_current_pos.post_flg = post_flg;
              }
            }
            // console.log(rtn);
            // console.log(editedPost);
            setId(rtn[0].id);
            update({ ...editedPost, id: rtn[0].id });
            // setTitle2(editedPost.title2);
            // setStitle(editedPost.stitle);
            // setExpire(editedPost.expire);
            // setGuide(editedPost.guide);
            // setStarted_at(editedPost.started_at);
          }
        }
      }
    }
  };

  const title1HandleChange = (e: any) => {
    // console.log("setTitle1");
    setTitle1(e.target.value);
    update({ ...editedPost, title1: e.target.value });
  };

  const title2HandleChange = (e: any) => {
    // console.log("setTitle2");
    setTitle2(e.target.value);
    update({ ...editedPost, title2: e.target.value });
  };

  const stitleHandleChange = (e: any) => {
    // console.log("setStitle");
    setStitle(e.target.value);
    update({ ...editedPost, stitle: e.target.value });
  };

  const guideHandleChange = (e: any) => {
    // console.log("setGuide");
    setGuide(e.target.value);
    update({ ...editedPost, guide: e.target.value });
  };

  const started_atHandleChange = (newValue: Date | null) => {
    // console.log("setStarted_at");
    setStarted_at(newValue);
    if (newValue) {
      update({ ...editedPost, started_at: newValue });
    }
  };

  const expireHandleChange = (newValue: Date | null) => {
    // console.log("setExpire");
    setExpire(newValue);
    if (newValue) {
      update({ ...editedPost, expire: newValue });
    }
  };

  const post_flgHandleChange = (e: SelectChangeEvent<string>) => {
    // console.log("setPost_flg");
    setPost_flg(e.target.value);
    update({ ...editedPost, post_flg: e.target.value });
  };

  const image_urlHandleChange = (e: any) => {
    // console.log("setImage_url");
    useMutateUploadPostImg.mutate(e);
  };

  const postNewHandleChange = () => {
    // console.log("postNew");
    setId("");
    setTitle1("");
    setTitle2("");
    setStitle("");
    setExpire(null);
    setGuide("");
    setStarted_at(null);
    setPost_flg("");
    update({ ...editedPost, id: "" });
    update({ ...editedPost, title1: "" });
    update({ ...editedPost, title2: "" });
    update({ ...editedPost, stitle: "" });
    update({ ...editedPost, expire: null });
    update({ ...editedPost, guide: "" });
    update({ ...editedPost, started_at: null });
    update({ ...editedPost, post_flg: "" });
    update({ ...editedPost, image_url: "noImage.png" });
    // console.log(editedPost);
    // useMutateUploadPostImg.mutate(e);
  };

  const postItemHandleChange = (post: any) => {
    // console.log("postItem");
    // console.log(post);
    setId(post.id);
    setTitle1(post.title1);
    setTitle2(post.title2);
    setStitle(post.stitle);
    setExpire(post.expire);
    setGuide(post.guide);
    setStarted_at(post.started_at);
    setPost_flg(post.post_flg);
    update({ ...editedPost, id: post.id });
    update({ ...editedPost, title1: post.title1 });
    update({ ...editedPost, title2: post.title2 });
    update({ ...editedPost, stitle: stitle });
    update({ ...editedPost, expire: post.expire });
    update({ ...editedPost, guide: post.guide });
    update({ ...editedPost, started_at: post.started_at });
    update({ ...editedPost, post_flg: post.post_flg });
    if (post.image_url) {
      update({ ...editedPost, image_url: post.image_url });
    } else {
      update({ ...editedPost, image_url: "0.8663141017808464.png" });
    }
  };

  // const logoutput = (txt: string) => {
  //   console.log(txt);
  // };

  return (
    <>
      <Head>
        <title>好き嫌い投稿</title>
      </Head>
      <header></header>
      <Appdrawer />
      <div className={styles.container}>
        {/* {session && <p>id: {id}</p>} */}
        {/* {logoutput("point01")} */}
        <form onSubmit={submitHandler}>
          {session && <div>　</div>}
          {session && <div>　</div>}
          {session && (
            <TextField
              required
              variant="filled"
              id="filled-required"
              label="一覧表示用タイトル (ex.「sirokuro.site について」)"
              fullWidth
              value={stitle || ""}
              onChange={(e) => stitleHandleChange(e)}
            />
          )}
          {session && <div>　</div>}
          {session && (
            <TextField
              required
              variant="filled"
              id="filled-required"
              label="タイトル・１ (ex.「私は sirokuro.site が大好き！」)"
              fullWidth
              value={title1 || ""}
              onChange={(e) => title1HandleChange(e)}
            />
          )}
          {session && <div>　</div>}
          {session && (
            <TextField
              required
              variant="filled"
              id="filled-required"
              label="タイトル・２ (ex.「あなたはどっち？」)"
              fullWidth
              value={title2 || ""}
              onChange={(e) => title2HandleChange(e)}
            />
          )}
          {/* {logoutput("point02")} */}
          {session && <div>　</div>}
          {session && (
            <TextField
              required
              variant="filled"
              id="filled-required"
              label="ガイドテキスト (PO考え中)"
              fullWidth
              multiline
              rows={3}
              value={guide || ""}
              onChange={(e) => guideHandleChange(e)}
            />
          )}
          {session && <div>　</div>}
          {session && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="掲載開始日 (月/日/年 時:分)"
                value={started_at}
                onChange={(e) => started_atHandleChange(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          )}
          {session && <div>　</div>}
          {session && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="掲載終了日 (月/日/年 時:分)"
                value={expire}
                onChange={(e) => expireHandleChange(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          )}
          {session && <div>　</div>}
          {session && (
            <FormControl fullWidth>
              <InputLabel id="post_flg-select-label">掲載ステータス</InputLabel>
              <Select
                labelId="post_flg-select-label"
                id="post_flg-select"
                label="掲載ステータス"
                //   className={styles.mt_4}
                value={post_flg || ""}
                onChange={(e) => post_flgHandleChange(e)}
              >
                <MenuItem key="0" value="0">
                  準備中 (掲載されません)
                </MenuItem>
                <MenuItem key="1" value="1">
                  掲載待ち (掲載されます)
                </MenuItem>
                <MenuItem key="8" value="8">
                  掲載中止 (掲載されません)
                </MenuItem>
              </Select>
            </FormControl>
          )}
          {session && postImgUrl_rtn && (
            <div>
              <p>掲載画像</p>
              <Image
                // src={image_url}
                src={postImgUrl_rtn}
                alt="postImage"
                className={styles.rounded_full}
                width={150}
                height={150}
              />
            </div>
          )}
          {isLoading && <Spinner />}
          {session && (
            <div className={styles.flex__justify_center}>
              <label htmlFor="postImg">
                <CameraIcon
                  className={
                    styles.my_3__h_7__w_7_cursor_pointer__text_gray_500
                  }
                />
              </label>
              <input
                className={styles.hidden}
                type="file"
                id="postImg"
                accept="image/*"
                // onChange={(e) => useMutateUploadPostImg.mutate(e)}
                onChange={(e) => image_urlHandleChange(e)}
              />
            </div>
          )}

          {/* {logoutput("point03")} */}

          {session && (
            <button
              className={
                styles.my_5__rounded__bg_indigo_600__px_3__py_2__text_sm__font_medium__text_white
              }
              // onClick={() => updatePost()}
              disabled={updatePostMutation.isLoading}
            >
              {id ? "投稿内容を更新" : "新規に投稿する"}
            </button>
          )}
        </form>
        {session && (
          <ul data-testid="ul-post" className="my-5">
            {posts_current?.map((post) => (
              <li className="w-80" key={post.id}>
                <Button
                  variant="text"
                  className={styles.mouse_pointer}
                  onClick={() => postItemHandleChange(post)}
                >
                  {post.stitle}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {!session && <p>ログインしてください。</p>}
      <Footer />
    </>
  );
};

export default Post;
