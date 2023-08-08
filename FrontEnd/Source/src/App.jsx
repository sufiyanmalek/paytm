import { BrowserRouter, json } from "react-router-dom";
import "./App.css";
import Container from "./Pages/Container";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Container />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
