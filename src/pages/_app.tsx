import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import { store } from '@/infrastructure/redux/store';
import '@/presentation/styles/globals.css';
import '@/infrastructure/i18n/config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(MyApp);
