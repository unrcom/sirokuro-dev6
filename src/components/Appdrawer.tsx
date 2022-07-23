import React, { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";

import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import styles from "./Layout.module.css";

type Title = {
  title: string;
  children: ReactNode;
};

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Appdrawer: FC = () => {
  const user = supabase.auth.user();
  const { push, pathname } = useRouter();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const thisyear = new Date().getFullYear();

  const Contents = [
    { name: "sirokuroつける", anchor: "/sirokuro" },
    { name: "好き嫌いを投稿する", anchor: "/post" },
    { name: "対決を投稿する", anchor: "/taiketsu" },
    { name: "sirokuro.siteについて", anchor: "/about" },
    { name: "よくある質問", anchor: "/faq" },
    { name: "プロフィールの編集", anchor: "/profile" },
    { name: "カテゴリーを追加する [＋]", anchor: "/catedit" },
  ];

  return (
    <>
      {/* <div className={styles.container}> */}
      {/* <Box sx={{ display: "flex" }}> */}
      <AppBar position="fixed" color="inherit" open={open}>
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <div className={styles.Title}>sirokuro.site</div>
            </Typography>
          </Link>
          <Link href="/auth">
            <div suppressHydrationWarning className={styles.textbtn}>
              {user ? "ログアウト" : "ログイン"}
            </div>
          </Link>
        </Toolbar>
      </AppBar>
      {/* <Main className={styles.main}> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        // color="inherit"
        // color="default"
      >
        <DrawerHeader className={styles.Bgblack}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon className={styles.Text} />
            ) : (
              <ChevronRightIcon className={styles.Text} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Contents.map((content, index) => (
            <ListItemButton
              key={content.name}
              component="a"
              href={content.anchor}
            >
              <ListItemText key={content.name} primary={content.name} />
            </ListItemButton>
          ))}
        </List>
        <Divider className="Menu" />
        <List>
          {[
            // "ほしい？",
            // "並ぶ？",
            // "お取り寄せ",
            // "手に入らない",
            // "人物",
            // "カルチャー",
            // "動物",
            // "アート",
            // "エンタメ",
            // "場面",
            // "場所",
            // "科学",
            // "IT",
            // "モノ",
            // "フード",
            // "サービス",
            // "SNS",
            // "企業",
            // "投資",
            // "広告",
            // "本",
            // "ゲーム",
            // "趣味",
            // "ヘルスケア",
            // "ギャンブル",
          ].map((text, index) => (
            //   <ListItem button key={text} className={styles.Bgblack}>
            <ListItem button key={text}>
              {" "}
              {/* <ListItemText primary={text} className={styles.Text} /> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* </Box> */}
      <footer className={styles.footer}>
        {/* <Box component="footer" sx={{ p: 2, bgcolor: "black" }}> */}
        {/* <div className={styles.TextWhite}> */}
        <a
          href="https://unremoted.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ©　unremoted.com　{thisyear}.
        </a>
        {/* </div> */}
        {/* </Box> */}
      </footer>
      {/* </div> */}
    </>
  );
};
