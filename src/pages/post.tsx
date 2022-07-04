import { useState, FormEvent } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { useQueryPosts } from "../hooks/useQueryPosts";
import { useMutatePost } from "../hooks/useMutatePost";
import { useDownloadUrl } from "../hooks/useDownloadUrl";
import { useUploadPostImg } from "../hooks/useUploadPostImg";
import { Spinner } from "../components/Spinner";
import { Layout } from "../components/Layout";

import styles from "./post.module.css";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import useStore from "../store";

const Post: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedPost = useStore((state) => state.editedPost);
  const update = useStore((state) => state.updateEditedPost);
  const { data: post } = useQueryPosts();
  const { updatePostMutation, createPostMutation } = useMutatePost();
  const { useMutateUploadPostImg } = useUploadPostImg();
  const { fullUrl: postImgUrl, isLoading } = useDownloadUrl(
    editedPost.image_url,
    "posts"
  );

  const [id, setId] = useState<string | undefined>(
    // "b855a98c-ab07-4209-bc9d-bb0b4e5dbcbd"
    ""
  );
  //   update({ ...editedPost, id: id });
  const [title1, setTitle1] = useState<string | undefined>(
    "私は sirokuro.site が大好き！"
  );
  const [title2, setTitle2] = useState<string | undefined>("あなたはどっち？");
  const [stitle, setStitle] = useState<string | undefined>(
    "sirokuro.site について"
  );
  const [guide, setGuide] = useState<string | undefined>(
    "自由に記述してください\n質問の詳細や背景:\n好き(嫌い)な理由:\n画像の説明:\n一番聞きたいこと:"
  );
  const [started_at, setStarted_at] = useState<Date | null>(new Date());
  const [expire, setExpire] = useState<Date | null>(new Date());
  const [post_flg, setPost_flg] = useState<string | undefined>("0");
  const [image_url, setImage_url] = useState<string | undefined>("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    //   const updatePost = async () => {
    e.preventDefault();
    if (session) {
      console.log(session);
      console.log(editedPost);
      if (session.user) {
        if (session.user.id) {
          if (editedPost.stitle === "") {
            alert("管理用タイトルを指定してください。");
          } else if (editedPost.title1 === "") {
            alert("タイトル１を指定してください。");
          } else if (editedPost.title2 === "") {
            alert("タイトル２を指定してください。");
          } else if (editedPost.guide === "") {
            alert("メインテキストを指定してください。");
          } else if (!editedPost.started_at) {
            alert("掲載開始日を指定してください。");
          } else if (!editedPost.expire) {
            alert("掲載終了日を指定してください。");
          } else if (editedPost.post_flg === "") {
            alert("掲載ステータスを指定してください。");
          } else {
            if (editedPost.id === "") {
              await createPostMutation.mutateAsync({
                user_id: session?.user?.id,
                title1: editedPost.title1,
                title2: editedPost.title2,
                stitle: editedPost.stitle,
                expire: editedPost.expire,
                guide: editedPost.guide,
                cat: editedPost.cat,
                image_url: editedPost.image_url,
                started_at: editedPost.started_at,
                post_flg: editedPost.post_flg,
              });
            } else {
              await updatePostMutation.mutateAsync({
                id: editedPost.id,
                user_id: session?.user?.id,
                title1: editedPost.title1,
                title2: editedPost.title2,
                stitle: editedPost.stitle,
                expire: editedPost.expire,
                guide: editedPost.guide,
                cat: editedPost.cat,
                image_url: editedPost.image_url,
                started_at: editedPost.started_at,
                post_flg: editedPost.post_flg,
              });
            }
            setTitle1(editedPost.title1);
            setTitle2(editedPost.title2);
            setStitle(editedPost.stitle);
            setExpire(editedPost.expire);
            setGuide(editedPost.guide);
            setStarted_at(editedPost.started_at);
          }
        }
      }
    }
  };

  const title1HandleChange = (e: any) => {
    console.log("setTitle1");
    setTitle1(e.target.value);
    update({ ...editedPost, title1: e.target.value });
  };

  const title2HandleChange = (e: any) => {
    console.log("setTitle2");
    setTitle2(e.target.value);
    update({ ...editedPost, title2: e.target.value });
  };

  const stitleHandleChange = (e: any) => {
    console.log("setStitle");
    setStitle(e.target.value);
    update({ ...editedPost, stitle: e.target.value });
  };

  const guideHandleChange = (e: any) => {
    console.log("setGuide");
    setGuide(e.target.value);
    update({ ...editedPost, guide: e.target.value });
  };

  const started_atHandleChange = (newValue: Date | null) => {
    console.log("setStarted_at");
    setStarted_at(newValue);
    if (newValue) {
      update({ ...editedPost, started_at: newValue });
    }
  };

  const expireHandleChange = (newValue: Date | null) => {
    console.log("setExpire");
    setExpire(newValue);
    if (newValue) {
      update({ ...editedPost, expire: newValue });
    }
  };

  const post_flgHandleChange = (e: SelectChangeEvent<string>) => {
    console.log("setPost_flg");
    setPost_flg(e.target.value);
    update({ ...editedPost, post_flg: e.target.value });
  };

  const image_urlHandleChange = (e: any) => {
    console.log("setImage_url");
    setImage_url(e.target.value);
    update({ ...editedPost, image_url: e.target.value });
    useMutateUploadPostImg.mutate(e);
  };

  const logoutput = (txt: string) => {
    console.log(txt);
  };

  return (
    <>
      {logoutput("point00")}
      <Layout title="好き嫌い投稿">
        {session && <p>id: {id}</p>}
        {session && post?.created_at && (
          <p className={styles.my_1__text_sm}>
            初回登録日時:{" "}
            {format(new Date(post.created_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        {session && post?.updated_at && (
          <p className={styles.text_sm}>
            最終更新日時:{" "}
            {format(new Date(post.updated_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        {logoutput("point01")}
        <form onSubmit={submitHandler}>
          {session && (
            <TextField
              required
              variant="filled"
              id="filled-required"
              label="管理用タイトル (あなたの投稿ページのみに表示されます)"
              fullWidth
              value={stitle || ""}
              onChange={(e) => stitleHandleChange(e)}
            />
          )}
          {session && (
            <TextField
              required
              variant="filled"
              id="filled-required"
              label="タイトル・１ (公開されます)"
              fullWidth
              className={styles.mt_4}
              value={title1 || ""}
              onChange={(e) => title1HandleChange(e)}
            />
          )}
          {session && (
            <TextField
              required
              variant="filled"
              id="filled-required"
              label="タイトル・２ (公開されます)"
              fullWidth
              className={styles.mt_4}
              value={title2 || ""}
              onChange={(e) => title2HandleChange(e)}
            />
          )}
          {logoutput("point02")}
          {session && (
            <TextField
              required
              variant="filled"
              id="filled-required"
              label="メインテキスト (公開されます)"
              fullWidth
              multiline
              rows={5}
              className={styles.mt_4__mb_6}
              value={guide || ""}
              onChange={(e) => guideHandleChange(e)}
            />
          )}
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
                  準備中
                </MenuItem>
                <MenuItem key="1" value="1">
                  掲載待ち
                </MenuItem>
                <MenuItem key="8" value="8">
                  掲載中止
                </MenuItem>
              </Select>
            </FormControl>
          )}
          {session && postImgUrl && (
            <div>
              <p>掲載画像</p>
              <Image
                src={postImgUrl}
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

          {logoutput("point03")}

          {session && (
            <button
              className={
                styles.my_5__rounded__bg_indigo_600__px_3__py_2__text_sm__font_medium__text_white
              }
              // onClick={() => updatePost()}
              disabled={updatePostMutation.isLoading}
            >
              {editedPost.id ? "投稿内容を更新" : "新規に投稿する"}
            </button>
          )}
        </form>
        {!session && <p>ログインしてください。</p>}
      </Layout>
    </>
  );
};

export default Post;