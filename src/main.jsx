import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import FileUpload from "./learning/FileUpload.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AuthProvider>
      <Provider store={store}>
        <App />
        <Toaster richColors />
        {/* <FileUpload /> */}
      </Provider>
    </AuthProvider>
  </NextUIProvider>
);
