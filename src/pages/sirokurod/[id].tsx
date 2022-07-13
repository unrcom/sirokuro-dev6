import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { format } from "date-fns";

import { useQueryPost } from "../../hooks/useQueryPost";
import { useQueryProfileOther } from "../../hooks/useQueryProfileOther";
import { useDownloadUrl } from "../../hooks/useDownloadUrl";
import { Appdrawer } from "../../components/Appdrawer";
import { Footer } from "../../components/Footer";
import { Spinner } from "../../components/Spinner";

import useStore from "../../store";

import styles from "./sirokurod.module.css";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Slider, { SliderThumb } from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

const Id: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedPost = useStore((state) => state.editedPost);
  const [sukiOpen, setSukiOpen] = useState(false);
  const [kiraiOpen, setKiraiOpen] = useState(false);

  const router = useRouter();
  const { data: post_item } = useQueryPost(router.query.id);
  // console.log(post_item?.expire);
  console.log(post_item?.user_id);
  const { data: profile } = useQueryProfileOther(post_item?.user_id);
  const { fullUrl: postImgUrl_rtn, isLoading } = useDownloadUrl(
    post_item?.image_url,
    "posts"
  );
  const { fullUrl: avatarUrl, isLoading: isLoadingAvatar } = useDownloadUrl(
    profile?.avatar_url,
    "avatars"
  );

  return (
    <>
      <Head>
        <title>好き？嫌い？</title>
      </Head>
      <header></header>
      <Appdrawer />
      <div className={styles.container}>
        <Box
          sx={{
            bgcolor: "#121212",
            p: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        ></Box>
        <Typography align="center" variant="h6" className={styles.my_5}>
          {post_item?.title1}
        </Typography>
        <Typography align="center" variant="body1">
          {post_item?.title2}
        </Typography>
        {post_item?.expire && (
          <Typography
            align="center"
            variant="body1"
            className={styles.my_5__bg_black}
          >
            {format(new Date(post_item.expire), "yyyy年MM月dd日 HH時mm分まで")}
            {/* {post_item?.expire} */}
            {/* {expire_text} */}
          </Typography>
        )}
        {postImgUrl_rtn && post_item && (
          <Card raised className={styles.Banner}>
            <Grid container spacing={0} className={styles.BannerGrid}>
              <CardContent className={styles.Content}>
                <CardMedia
                  component="img"
                  className={styles.Media}
                  image={postImgUrl_rtn}
                  alt={post_item?.stitle}
                ></CardMedia>
              </CardContent>
            </Grid>
          </Card>
        )}
        <Box sx={{ m: 3 }} />
        <Grid container spacing={0}>
          <Grid item xs={1}>
            😻 13
          </Grid>
          <Grid item xs={10}></Grid>
          <Grid item xs={1}>
            😹 3
          </Grid>
        </Grid>
        <Slider
          value={80}
          min={0}
          step={1}
          max={100}
          // scale={calculateValue}
          // getAriaValueText={valueLabelFormat}
          // valueLabelFormat={valueLabelFormat}
          // onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
        <Box sx={{ m: 3 }} />
        {isLoadingAvatar && <Spinner />}
        {avatarUrl && !isLoadingAvatar && (
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <Avatar alt="Avatar" src={avatarUrl} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{profile?.username}</Typography>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        )}
        <Box sx={{ m: 3 }} />
        <Typography variant="body1">{post_item?.guide}</Typography>
      </div>
      {!session && <p>ログインしてください。</p>}
      <Footer />
    </>
  );
};

export default Id;
