import React from 'react';
import type { VFC } from 'react';
import type { AppProps } from 'next/app';

import '../styles/index.scss';

const App: VFC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);
export default App;
