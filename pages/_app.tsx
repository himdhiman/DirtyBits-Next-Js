import { createWrapper } from "next-redux-wrapper";
import type { AppProps } from "next/app";
import Footer from "components/Footer";
import { store } from "redux/store";
import "../styles/index.css";
import { useRouter } from "next/router";
import "../styles/Editor.css";
import "../styles/tinymce.css";
import { NextPage } from "next";
import { ReactNode, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import theme from "theme/theme";
import NextNProgress from "nextjs-progressbar";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import {colors} from 'constants/colors';
import Navbar from 'components/Navbar2.0';

import "react-quill/dist/quill.snow.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { useDispatch } from "react-redux";
import { notifyFirstLoad } from "redux/actions";


import Context from '../Context'


type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(notifyFirstLoad());
  // }, []);
  const router = useRouter();

  if (Component.getLayout) {
    return Component.getLayout((
      <MantineProvider theme={theme}>
        <NotificationsProvider position="top-right" zIndex={2077}>
        <Component {...pageProps} />
        </NotificationsProvider>
        </MantineProvider>
    ));
  }

  let footer: JSX.Element;

  if (router.pathname === "/") {
    footer = <Footer />;
  } else {
    footer = null;
  }
  return (
    <>
    <Context>
      <MantineProvider theme={theme}>
        <NotificationsProvider position="top-right" zIndex={2077} color="red">
          <NextNProgress height={2} color={colors.primary} />
          <Navbar />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
      {footer}
    </Context>
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
