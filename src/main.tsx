import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import {BrowserRouter} from "react-router";
import "./styles/root.scss";
import "@mantine/core/styles.css";
import {MantineProvider} from "@mantine/core";
import Cursor from "./components/cursor/cursor.tsx";
import Navigation from "./components/navigation/navigation.tsx";
import {Preloader} from "./components/preloader/preloader.tsx";
import "@fontsource/fragment-mono/400.css";
import "@fontsource/instrument-serif/400.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider
            theme={{
                fontFamily: "Fragment Mono",
            }}
        >
            <BrowserRouter>
                <Preloader/>
                <Navigation/>
                <Cursor/>
                <App/>
            </BrowserRouter>
        </MantineProvider>
    </StrictMode>
);
