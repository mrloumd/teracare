/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "redux/store";
import App from "./App";

import "antd/dist/antd.min.css";
import "antd/dist/antd.variable.min.css"; // or 'antd/dist/antd.min.css'
import "normalize.css/normalize.css"; // consistent cross-browser styles

const rootElement = document.getElementById("root");
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	rootElement
);
