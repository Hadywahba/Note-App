import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "flowbite/dist/flowbite.min.js";
import Authcontext from "./components/context/Authcontext.jsx";
import Token from "./components/context/Token.jsx";
import Modalcontext from "./components/context/Modalcontext.jsx";
import Nodecontext from "./components/context/Nodecontext.jsx";

createRoot(document.getElementById("root")).render(
  <Token>
    <Authcontext>
      <Nodecontext>
        <Modalcontext>
          <App />
        </Modalcontext>
      </Nodecontext>
    </Authcontext>
  </Token>
);
