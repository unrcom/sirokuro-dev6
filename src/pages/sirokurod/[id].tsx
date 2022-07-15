import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { format } from "date-fns";

import { useQueryPost } from "../../hooks/useQueryPost";
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
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

const Id: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedPost = useStore((state) => state.editedPost);
  const [sukiOpen, setSukiOpen] = useState(false);
  const [kiraiOpen, setKiraiOpen] = useState(false);

  const router = useRouter();
  const { data: post_item } = useQueryPost(router.query.id);
  // console.log(post_item?.expire);
  console.log(post_item?.user_id);
  const { fullUrl: postImgUrl_rtn, isLoading } = useDownloadUrl(
    post_item?.image_url,
    "posts"
  );
  const { fullUrl: avatarUrl, isLoading: isLoadingAvatar } = useDownloadUrl(
    post_item?.avatar_url,
    "avatars"
  );
  const guide_text = `post_item?.guide`;

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
            {/* <Grid container spacing={0} className={styles.BannerGrid}> */}
            <Grid
              container
              spacing={1}
              direction="row"
              justifyItems="center"
              alignItems="center"
            >
              <Grid item xs={1} sm={2}></Grid>
              <Grid item xs={9} sm={9}>
                <CardContent className={styles.Content}>
                  <CardMedia
                    component="img"
                    className={styles.Media}
                    image={postImgUrl_rtn}
                    alt={post_item?.stitle}
                  ></CardMedia>
                </CardContent>
              </Grid>
              <Grid item xs={2} sm={1}></Grid>
            </Grid>
          </Card>
        )}
        <Box sx={{ m: 3 }} />
        {!session && (
          <Typography align="center" variant="h6">
            好き嫌い投票するにはログインしてください
          </Typography>
        )}
        {session && (
          <Grid container spacing={0}>
            <Grid item xs={1}>
              😻 13
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={1}>
              😹 3
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
          </Grid>
        )}
        <Box sx={{ m: 3 }} />
        {isLoadingAvatar && <Spinner />}
        {avatarUrl && !isLoadingAvatar && (
          <Grid container spacing={1}>
            <Grid item xs={4} sm={5}></Grid>
            <Grid item xs={2} sm={1}>
              <Avatar alt="Avatar" src={avatarUrl} className={styles.White} />
            </Grid>
            <Grid item xs={6} sm={5}>
              <Typography variant="h6">{post_item?.username}</Typography>
            </Grid>
          </Grid>
        )}
        <Box sx={{ m: 3 }} />
        <Typography variant="body1" whiteSpace="pre-wrap">
          {post_item?.guide}
        </Typography>
        <Box sx={{ m: 3 }} />
      </div>
      <Footer />
    </>
  );
};

export default Id;
