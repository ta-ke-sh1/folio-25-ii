import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import "./styles/root.scss"
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import Cursor from "./components/cursor/cursor.tsx";
import Navigation from "./components/navigation/navigation.tsx";
import "@fontsource-variable/geist/wght.css";
import {Preloader} from "./components/preloader/preloader.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <MantineProvider theme={{
                fontFamily: 'Geist Variable'
            }}>
                <Preloader/>
                <Navigation/>
                <App/>
                <Cursor/>
            </MantineProvider>
        </BrowserRouter>
    </StrictMode>,
)
