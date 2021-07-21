/*
 * @Author: your name
 * @Date: 2021-07-16 12:54:09
 * @LastEditTime: 2021-07-20 14:17:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/App.tsx
 */
import React from "react";

import IndexPage from "./pages/IndexPage/IndexPage";
//import ShowcasePage from './pages/document/ShowcasePage';
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
//import NotifyPage from './pages/components/NotifyPage';
import BlankPage from "./pages/BlankPage/BlankPage";
import NewLiveStreamPage from "./pages/NewLiveStreamPage/NewLiveStreamPage";
import ManageLiveStreamPage from "./pages/ManageLiveStreamPage/ManageLiveStreamPage";
import PlayPage from "./pages/PlayPage/PlayPage";
//import PageLoaderPage from './pages/components/PageLoaderPage';
//import IconPage from './pages/document/IconPage';
//import FullDocsPage from './pages/document/FullDocsPage';

function App() {
    let router_map: { [key: string]: any } = {
        //"/document/showcase":ShowcasePage,
        //"/document/icon":IconPage,
        //'/document/fulldocs':FullDocsPage,
        "/index": IndexPage,
        "/signin": SignInPage,
        "/signup": SignUpPage,
        "/newlivestream":NewLiveStreamPage,
        "/managelivestream":ManageLiveStreamPage,
        "/play":PlayPage
        //'/components/notify':NotifyPage,
        //'/components/pageloader':PageLoaderPage,
    };
    console.log(window.location.pathname);
    let pathName=window.location.pathname
    if (pathName==="/") {
        pathName="/index"
    }

    if (router_map[pathName]) {
        const Page = router_map[pathName];
        return <Page />;
    }
    // for (const urlKey in router_map) {
    //     if (window.location.pathname===urlKey) {
    //         const Page = router_map[urlKey];
    //         return <Page />;
    //     }
    // }

    return <BlankPage />;
}

export default App;
