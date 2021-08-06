/*
 * @Author: your name
 * @Date: 2021-08-05 20:40:33
 * @LastEditTime: 2021-08-06 14:38:49
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
import "./Tutorial.css"

interface Props {}

interface State {
    terminalType: "pc" | "ios" | "android";

    liveStreamInfo: ILiveStreamInfo;

    videoUrl: string;
}
class Tutorial extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
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

    // async getLiveStream(id: number) {
    //     const url = GlobalData.apiHost + "/api/livestream/get";
    //     const sendData = {
    //         id: id,
    //     };
    //     const responseData = await RequestTool.post<ILiveStreamInfo>(url, sendData);
    //     if (responseData === null) {
    //         //request error
    //         (window as any).notify("error", "program error", "error");
    //         return;
    //     }
    //     if (responseData && responseData.status !== 0) {
    //         //error
    //         console.log(responseData.msg);
    //         (window as any).notify("error", responseData.msg, "error");
    //         return;
    //     }

    //     //console.log(responseData);
    //     const stream = responseData.data;

    //     document.title = stream.name;

    //     this.setState({ liveStreamInfo: stream });
    //     if (stream.status === ELiveStreamStatus.PAUSE || stream.status === ELiveStreamStatus.END) {
    //         //this.watched(id, stream.category);
    //         if (!(await Utils.IsRemoteFileAvailable(stream.cdnRecordM3u8Link))) {
    //             this.setState({ videoUrl: stream.originRecordM3u8Link });
    //         } else {
    //             this.setState({ videoUrl: stream.cdnRecordM3u8Link });
    //         }
    //     } else if (stream.status === ELiveStreamStatus.ONLIVE) {
    //         //this.watched(id, stream.category);
    //         if (!(await Utils.IsRemoteFileAvailable(stream.cdnLiveM3u8Link))) {
    //             this.setState({ videoUrl: stream.originLiveM3u8Link });
    //         } else {
    //             this.setState({ videoUrl: stream.cdnLiveM3u8Link });
    //         }
    //     } else {
    //         (window as any).notify("error", "Livestreaming has not started yet", "error");
    //     }
    // }

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
                <a href="https://obsproject.com/" target="_blank" className="btn btn-primary" rel="noreferrer"> https://obsproject.com/</a>
                {/* {this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_20_record/index.m3u8")} */}
            </div>
        );
    }

    renderIOS() {
        return (
            <div className="bodywrapper">
                <p>IOS software recommended [streamlabs] click download : </p>
                <a href="https://apps.apple.com/us/app/streamlabs-live-streaming-app/id1294578643" className="btn btn-primary" target="_blank" rel="noreferrer">
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
                <a href="https://obsproject.com/" className="btn btn-primary" target="_blank" rel="noreferrer">https://obsproject.com/</a>
                {/* {this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_17_record/index.m3u8")} */}
            </div>
        );
    }

    render() {
 
        return (
            <div className="card" style={{ marginBottom: "20px" }}>
                
                <ul className="toolbartop nav nav-pills card-header-pills">

                    <li className="nav-item">
                            <a  className="nav-link" data-bs-toggle="collapse"
                                href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Show tutorial video
                            </a>
                    </li>
                     

                    <li className="nav-item">
                        <div  className="nav-link active" aria-current="page"
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
                        {this.state.terminalType === "pc" &&
                            this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_20_record/index.m3u8")}
                        {this.state.terminalType === "ios" &&
                            this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_36_record/index.m3u8")}
                        {this.state.terminalType === "android" &&
                            this.renderPlayer("http://coldcdn.com/api/livecdn/record/m3u8/playlist/live_17_record/index.m3u8")}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tutorial;
