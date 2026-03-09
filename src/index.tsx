import { LocationProvider, Route, Router, hydrate, prerender as ssr } from "preact-iso";

import { Popover } from "./components/Popup.js";
import Game from "./pages/Game/index.js";
import { Home } from "./pages/Home/index.js";
import { NotFound } from "./pages/_404.js";
import "./style.css";

export function App() {
  return (
    <LocationProvider>
      {/* <Header /> */}
      <Popover />
      <main>
        <Router>
          <Route path="/" component={Game} />
          <Route path="/home" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
