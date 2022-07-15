import { FC } from "react";
import Link from "next/link";

import { Post } from "../types";
import { useDownloadUrl } from "../hooks/useDownloadUrl";

import styles from "./Banner.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

type Props = {
  post: Post;
};

export const Banner: FC<Props> = ({ post }) => {
  const totalItems = 3;
  let items = [];

  const { fullUrl: postImgUrl_rtn, isLoading } = useDownloadUrl(
    post.image_url,
    "posts"
  );

  const siroId = post.id + "_siro";
  const kuroId = post.id + "_kuro";

  const content = (
    <Link href={{ pathname: `/sirokurod/[id]`, query: { id: post.id } }}>
      <Grid item key={post.id} xs={12} sm={6}>
        {/* <Grid item key={post.id} xs={6}> */}
        {/* <CardContent className={styles.Content}> */}
        <Paper className={styles.Green} elevation={0}>
          <CardContent>
            <CardMedia
              component="img"
              className={styles.Media}
              image={postImgUrl_rtn}
              alt={post.stitle}
            ></CardMedia>
          </CardContent>
        </Paper>
      </Grid>
    </Link>
  );

  const siro = (
    <Grid item key={siroId} xs={12} sm={3}>
      {/* <Grid item key={siroId} xs={3}> */}
      {/* <CardContent className={styles.Content}> */}
      <Paper className={styles.Red} elevation={0}>
        <CardContent>
          <Typography
            // alignItems="center"
            // justifyContent="center"
            align="right"
            variant="body1"
            className={styles.Orange}
          >
            {post.title1}
          </Typography>
        </CardContent>
      </Paper>
    </Grid>
  );

  const kuro = (
    <Grid
      item
      // xs={3}
      xs={12}
      sm={3}
      key={kuroId}
    >
      <Paper className={styles.Red} elevation={0}>
        <CardContent className={styles.Content}>
          <Typography align="left" variant="body1" className={styles.Orange}>
            {post.title2}
          </Typography>
        </CardContent>
      </Paper>
    </Grid>
  );

  items.push(siro);
  items.push(content);
  items.push(kuro);

  return (
    <Paper className={styles.Redf} elevation={0}>
      <Card raised className={styles.Banner}>
        <Grid container spacing={0} className={styles.BannerGrid}>
          {items}
        </Grid>
      </Card>
    </Paper>
  );
};
