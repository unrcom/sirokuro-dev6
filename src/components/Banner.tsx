import { FC } from "react";

import { Post } from "../types";
import { useDownloadUrl } from "../hooks/useDownloadUrl";

import styles from "./Banner.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

type BannerItem = {
  name: string;
  caption: string;
  siroName: string;
  siroImage: string;
  kuroName: string;
  kuroImage: string;
};

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

  const content = (
    <Grid item xs={2} key={post.id}>
      <CardContent className={styles.Content}>
        <CardMedia
          className={styles.Media}
          image={postImgUrl_rtn}
          title={post.stitle}
        >
          {/* <Typography className="Caption">{post.stitle}</Typography> */}
        </CardMedia>
      </CardContent>
    </Grid>
  );

  const siro = (
    <Grid item xs={5} key={siroId}>
      <CardContent className={styles.Content}>
        <Typography className={styles.Caption}>{post.title1}</Typography>
        <Button variant="outlined" className={styles.ViewButton}>
          好き！
        </Button>
      </CardContent>
    </Grid>
  );

  const kuro = (
    <Grid item xs={5} key={kuroId}>
      <CardContent className={styles.Content}>
        <Typography className={styles.Caption}>{post.title2}</Typography>
        <Button variant="outlined" className={styles.ViewButton}>
          嫌い orz
        </Button>
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
