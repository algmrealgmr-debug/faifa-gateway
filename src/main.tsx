import { createRoot } from "react-dom/client";
import "./index.css";

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";
const root = createRoot(document.getElementById("root")!);
const path = normalizePath(window.location.pathname);

if (path === "/chat") {
  import("./pages/FullScreenChat.tsx").then(({ default: FullScreenChat }) => {
    root.render(<FullScreenChat />);
  });
} else {
  import("./App.tsx").then(({ default: App }) => {
    root.render(<App />);
  });
}
