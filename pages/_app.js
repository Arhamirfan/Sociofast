import "./../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import store from "../src/store/index"
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>)
}
