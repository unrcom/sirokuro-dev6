import React, { FC, ReactNode, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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

const thisyear = new Date().getFullYear();

export const Footer: FC = () => {
  return (
    <>
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
