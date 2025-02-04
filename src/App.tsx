import { Provider } from "react-redux";
import "./App.css";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import "./i18n";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <></>
      </PersistGate>
    </Provider>
  );
}

export default App;
