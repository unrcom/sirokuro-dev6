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
import Button from "@mui/material/Button";

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

  const siroAlt = "好きにコメントする!";
  const kuroAlt = "嫌いにコメントする!";
  const siroId = post.id + "_siro";
  const kuroId = post.id + "_kuro";
  const postid = post.id;

  // const handleChange = () => {
  //   console.log("handleChenge");
  // };

  const content = (
    <Link href={{ pathname: `/sirokurod/[id]`, query: { id: post.id } }}>
      <Grid item xs={12} sm={7} key={post.id}>
        {/* <CardContent className={styles.Content}> */}
        <CardContent>
          <CardMedia
            component="img"
            className={styles.Media}
            image={postImgUrl_rtn}
            alt={post.stitle}
            // onClick={() => handleChange()}
          >
            {/* <Typography className="Caption">{post.stitle}</Typography> */}
          </CardMedia>
        </CardContent>
      </Grid>
    </Link>
  );

  const siro = (
    // <Grid item xs={12} sm={3} key={siroId} className={styles.Content}>
    <Grid
      item
      xs={12}
      sm={3}
      key={siroId}
      // direction="column"
      // alignItems="center"
      // justifyContent="center"
    >
      {/* <CardContent className={styles.Content}> */}
      <CardContent>
        {/* <Typography className={styles.Caption}>{post.title1}</Typography> */}
        <Typography
          // alignItems="center"
          // justifyContent="center"
          align="right"
          variant="body1"
        >
          {post.title1}
        </Typography>
        {/* <Button variant="outlined" className={styles.ViewButton}>
          好き！
        </Button> */}
      </CardContent>
    </Grid>
  );

  const kuro = (
    // <Grid item xs={12} sm={2} key={kuroId} className={styles.Content}>
    <Grid
      item
      xs={12}
      sm={2}
      key={siroId}
      // direction="column"
      // alignItems="center"
      // justifyContent="center"
    >
      <CardContent className={styles.Content}>
        <Typography align="left" variant="body1">
          {post.title2}
        </Typography>
        {/* <Button variant="outlined" className={styles.ViewButton}>
          嫌い orz
        </Button> */}
      </CardContent>
    </Grid>
  );

  items.push(siro);
  items.push(content);
  items.push(kuro);

  return (
    <Card raised className={styles.Banner}>
      <Grid container spacing={0} className={styles.BannerGrid}>
        {items}
      </Grid>
    </Card>
  );
};
