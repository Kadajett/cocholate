import Head from "next/head";
import "../styles/globals.css";
import Box from "@mui/material/Box";
import { AppProps } from "next/app";
import { PreferencesProvider } from "../components/Preferences";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Nav from "../components/Nav";
import '../components/utils/i18n'

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC8FD0",
    },
  },

  // body: {
  //   background: "linear-gradient(45deg, #ffecf7 30%, #fff 90%)",
  //   height: "100vh",
  // },
  // bodyContent: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // status: {
  //   danger: orange[500],
  // },
});

const Body = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, #ffecf7 30%, #fff 90%)",
  height: "100vh",
}));

const BodyContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <PreferencesProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>Next.js PWA Example</title>

          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <Body>
          <Nav />
          <BodyContent>
            <Component {...pageProps} />
          </BodyContent>
        </Body>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
