import { createRoot } from "react-dom/client";
import FullScreenChat from "./pages/FullScreenChat.tsx";
import "./index.css";

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";
const root = createRoot(document.getElementById("root")!);
const path = normalizePath(window.location.pathname);

if (path === "/chat") {
  document.title = "فيفاوي | شات فيفاء";
  root.render(<FullScreenChat />);
} else {
  import("./App.tsx").then(({ default: App }) => {
    root.render(<App />);
  });
}
