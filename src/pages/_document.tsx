import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
