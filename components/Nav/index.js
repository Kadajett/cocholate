import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Trans from "../utils/Trans";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import Link from "next/link";

const Routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/settings",
    label: "Settings",
  },
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <AppBar position="static">
      <Drawer anchor={"top"} open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box
          sx={{ width: "auto" }}
          role="presentation"
          onClick={() => setMenuOpen(false)}
          onKeyDown={() => setMenuOpen(false)}
        >
          <List>
            {Routes.map(({ label, path }, index) => (
              <ListItem button key={label}>
                <Link href={path}>
                  <ListItemText primary={label} />
                </Link>
              </ListItem>
            ))}
          </List>
          
        </Box>
      </Drawer>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        </IconButton>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography> */}
        <Trans
          TypographyProps={{
            variant: "h6",
            component: "div",
            sx: {
              flexGrow: 1,
            },
          }}
          TransProps={{
            namespace: "header",
            i18nKey: "appTitle",
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
