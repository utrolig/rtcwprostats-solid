// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  parseCookie,
  Routes,
  Scripts,
  Title,
  useServerContext,
} from "solid-start";
import "./root.css";
import "@fontsource/noto-sans";
import { LanguageProvider } from "./i18n/context";
import { isServer } from "solid-js/web";
import { Locale, locales } from "./i18n";

export default function Root() {
  const event = useServerContext();
  const cookie = () =>
    parseCookie(
      isServer ? event.request.headers.get("cookie") ?? "" : document.cookie
    );

  const getInitialLanguage = (): Locale["code"] => {
    const cookieLanguage = cookie().lang as Locale["code"];

    if (locales[cookieLanguage]) {
      return cookie().lang as Locale["code"];
    }

    if (!isServer) {
      if (navigator.language) {
        const lang = navigator.language.split("-")[0] as Locale["code"];

        if (locales[lang]) {
          document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=strict`;
          return lang;
        }
      }
    }

    return "en";
  };

  return (
    <Html lang={getInitialLanguage()}>
      <Head>
        <Link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <Link rel="manifest" href="/site.webmanifest" />
        <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <Meta name="msapplication-TileColor" content="#da532c" />
        <Meta name="theme-color" content="#ffffff" />
        <Title>RtCWPro Stats</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <LanguageProvider initialLanguage={getInitialLanguage()}>
              <Routes>
                <FileRoutes />
              </Routes>
            </LanguageProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
