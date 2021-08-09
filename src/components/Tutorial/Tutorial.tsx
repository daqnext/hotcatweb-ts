/*
 * @Author: your name
 * @Date: 2021-08-05 20:40:33
 * @LastEditTime: 2021-08-09 10:57:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/Tutorial/Tutorial.tsx
 */

import React from "react";
import ReactPlayer from "react-player";
import { GlobalData } from "../../global/global";
import { ELiveStreamStatus, ILiveStreamInfo } from "../../interface/interface";
import { RequestTool } from "../../utils/RequestTool";
import { Utils } from "../../utils/Utils";
import "./Tutorial.css";

interface Props {}

interface State {
    terminalType: "pc" | "ios" | "android";

    toggleOn: boolean;

    liveStreamInfo: ILiveStreamInfo;

    videoUrl: string;
}
class Tutorial extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            toggleOn: false,
            terminalType: "pc",
            liveStreamInfo: null,
            videoUrl: null,
        };
    }

    componentDidMount() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            // alert("ios");
            this.setState({ terminalType: "ios" });
        } else if (/(Android)/i.test(navigator.userAgent)) {
            // alert("android");
            this.setState({ terminalType: "android" });
        } else {
            // alert("pc");
            this.setState({ terminalType: "pc" });
        }
    }

    renderPlayer(url: string) {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        return (
            <ReactPlayer
                className="video-player"
                width="100%"
                height="100%"
                url={url}
                controls
                playsinline
                config={{
                    file: {
                        forceHLS: !isSafari,
                        // attributes: {
                        //     preload: "none",
                        // },
                    },
                }}
                //playing={this.state.playing}
            />
        );
    }

    renderPc() {
        return (
            <div className="bodywrapper">
                <p>PC software recommended [OBS Studio] click download :</p>
                <a href="https://obsproject.com/" target="_blank" className="btn btn-primary" rel="noreferrer">
                    {" "}
                    https://obsproject.com/
                </a>
                {/* {this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_20_record/index.m3u8")} */}
            </div>
        );
    }

    renderIOS() {
        return (
            <div className="bodywrapper">
                <p>IOS software recommended [streamlabs] click download : </p>
                <a
                    href="https://apps.apple.com/us/app/streamlabs-live-streaming-app/id1294578643"
                    className="btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                >
                    https://apps.apple.com/us/app/streamlabs-live-streaming-app/id1294578643
                </a>
                {/* {this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_36_record/index.m3u8")} */}
            </div>
        );
    }

    renderAndroid() {
        return (
            <div className="bodywrapper">
                <p>Android software recommended [LiveNow] click download : </p>
                <a href="https://livenow.one/" className="btn btn-primary" target="_blank" rel="noreferrer">
                    https://livenow.one/
                </a>
                {/* {this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_17_record/index.m3u8")} */}
            </div>
        );
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: "20px" }}>
                <ul className="toolbartop nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <a
                            className={this.state.toggleOn ? "nav-link active" : "nav-link"}
                            data-bs-toggle="collapse"
                            href="#collapseExample"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                            onClick={() => {
                                this.setState({ toggleOn: !this.state.toggleOn });
                            }}
                        >
                            Show tutorial video
                        </a>
                    </li>

                    <li className="nav-item">
                        <div
                            className="nav-link"
                            aria-current="page"
                            onClick={() => {
                                this.setState({ terminalType: "pc" });
                            }}
                        >
                            Mac & Windows
                        </div>
                    </li>
                    <li className="nav-item">
                        <div
                            className="nav-link"
                            onClick={() => {
                                this.setState({ terminalType: "ios" });
                            }}
                        >
                            iOS
                        </div>
                    </li>
                    <li className="nav-item">
                        <div
                            className="nav-link"
                            onClick={() => {
                                this.setState({ terminalType: "android" });
                            }}
                        >
                            Android
                        </div>
                    </li>
                </ul>

                {this.state.terminalType === "pc" && this.renderPc()}
                {this.state.terminalType === "ios" && this.renderIOS()}
                {this.state.terminalType === "android" && this.renderAndroid()}

                <div className="collapse" id="collapseExample">
                    <div className="card-body" style={{ padding: "10px" }}>
                        {this.state.toggleOn && this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_78_record/index.m3u8")}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tutorial;
