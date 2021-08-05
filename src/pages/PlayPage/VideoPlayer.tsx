/*
 * @Author: your name
 * @Date: 2021-08-03 21:38:49
 * @LastEditTime: 2021-08-05 13:42:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/PlayPage/VideoPlayer.tsx
 */
import React, { Component } from "react";
// import Videojs from "video.js";
//import "videojs-contrib-hls";
import "video.js/dist/video-js.css";

interface Props {
    height?: number;
    width?: number;
    src: string;
}

interface State {}
class VideoPlayer extends React.Component<Props, State> {
    player: any = null;
    constructor(props: Props) {
        super(props);
    }

    componentWillUnmount() {
        // 销毁播放器
        if (this.player) {
            this.player.dispose();
        }
    }
    componentDidMount() {
        // const { height, width, src } = this.props;
        // this.player = Videojs(
        //     "custom-video",
        //     {
        //         // lookup the options in the docs for more options
        //         autoplay: true,
        //         controls: true,
        //         responsive: true,
        //         fluid: true,
        //         preload: "auto",
        //         // muted:true
        //     },
        //     () => {
        //         console.log("ready");
        //     }
        // );
        // this.player.src({ src });

        // this.player.ready(()=> {
        //     var promise = this.player.play();
          
        //     if (promise !== undefined) {
        //       promise.then(()=> {
        //         // Autoplay started!
        //         console.log("auto play start");
               
        //       }).catch(()=> {
        //         // Autoplay was prevented.
        //         console.log("auto play prevented");
        //       });
        //     }
        //   });
    }

    render() {
        return (
            // <iframe src="">
                <video
                //width="100%"
                id="custom-video"
                className="video-js vjs-big-play-centered"
                //controls
                //preload="auto"
            ></video>
            // </iframe>
            
        );
    }
}

export default VideoPlayer;
