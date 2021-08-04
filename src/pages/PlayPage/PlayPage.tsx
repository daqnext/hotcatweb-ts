/*
 * @Author: your name
 * @Date: 2021-07-18 17:42:28
 * @LastEditTime: 2021-08-03 22:28:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/PlayPage/PlayPage.tsx
 */

import React from "react";
import { GlobalData } from "../../global/global";
import { ELiveStreamStatus, ILiveStreamInfo } from "../../interface/interface";
import DashboardLayout from "../../layout/DashboardLayout";
import { RequestTool } from "../../utils/RequestTool";
import ReactPlayer from "react-player";
import Avatar from "react-avatar";
import "./PlayPage.css";
import moment from "moment";
import { Utils } from "../../utils/Utils";
import { UserManager } from "../../manager/UserManager";
import PlayDynamic from "../../layout/PlayDynamic";
import VideoPlayer from "./VideoPlayer";

interface Props {}

interface State {
    liveStreamInfo: ILiveStreamInfo;

    videoUrl: string;
    playing: boolean;
}

class PlayPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            liveStreamInfo: null,
            videoUrl: null,
            playing: true,
        };
    }

    getQueryVariable(variable: string) {
        var query = window.location.search.substring(1);
        console.log(query);

        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }

    async componentDidMount() {
        const liveStreamId = this.getQueryVariable("id");
        if (liveStreamId === false) {
            //show error
            return;
        }
        const id = parseInt(liveStreamId);
        if (isNaN(id)) {
            //show error
            return;
        }

        this.getLiveStream(id);

        //chat.js
        const token = UserManager.GetUserToken();
        Utils.loadScript("/js/chat1.js", () => {
            console.log(token);
            (window as any).startChat(
                "ws://" + GlobalData.apiDomain + ":3601",
                "prefix_" + liveStreamId,
                GlobalData.apiHost + "/api/user/userverify",
                token
            );

            console.log("ws://" + GlobalData.apiDomain + ":3601", liveStreamId, GlobalData.apiHost + "/api/user/userverify", token);
        });

        
    }

    async watched(id: number, category: string) {
        const url = GlobalData.apiHost + "/api/livestream/watch/" + id + "/" + category;
        await RequestTool.get(url);
    }

    async getLiveStream(id: number) {
        const url = GlobalData.apiHost + "/api/livestream/get";
        const sendData = {
            id: id,
        };
        const responseData = await RequestTool.post<ILiveStreamInfo>(url, sendData);
        if (responseData === null) {
            //request error
            (window as any).notify("error", "program error", "error");
            return;
        }
        if (responseData && responseData.status !== 0) {
            //error
            console.log(responseData.msg);
            (window as any).notify("error", responseData.msg, "error");
            return;
        }

        //console.log(responseData);
        const stream = responseData.data;

        document.title = stream.name;

        this.setState({ liveStreamInfo: stream });
        if (stream.status === ELiveStreamStatus.PAUSE || stream.status === ELiveStreamStatus.END) {
            this.watched(id, stream.category);
            if (!(await Utils.IsRemoteFileAvailable(stream.cdnRecordM3u8Link))) {
                this.setState({ videoUrl: stream.originRecordM3u8Link, playing: true });
            } else {
                this.setState({ videoUrl: stream.cdnRecordM3u8Link, playing: true });
            }
        } else if (stream.status === ELiveStreamStatus.ONLIVE) {
            this.watched(id, stream.category);
            if (!(await Utils.IsRemoteFileAvailable(stream.cdnLiveM3u8Link))) {
                this.setState({ videoUrl: stream.originLiveM3u8Link, playing: true });
            } else {
                this.setState({ videoUrl: stream.cdnLiveM3u8Link, playing: true });
            }
        } else {
            //this.setState({ videoUrl: stream.cdnRecordM3u8Link, playing: true });
            (window as any).notify("error", "Livestreaming has not started yet", "error");
        }
    }

    errorLiveStream() {
        return <div>error livestreaming</div>;
    }

    renderPlayer() {
        return (
            <ReactPlayer
                className="video-player"
                width="100%"
                height="100%"
                url={this.state.videoUrl}
                controls
                config={{
                    file: {
                        forceHLS: true,
                    },
                }}
                playing={this.state.playing}
            />
        );
    }

    renderPlayer2() {
        if (this.state.videoUrl==null||this.state.videoUrl=="") {
            return null
        }
        return (
            <VideoPlayer src={this.state.videoUrl}></VideoPlayer>
        );
    }

    render() {
        //console.log(this.state.liveStreamInfo);
        const { liveStreamInfo } = this.state;
        return (
            <PlayDynamic>
                <div className="videocontainer">
                    {/* pc */}

                    {(window as any).mobileCheck() ? (
                        <div />
                    ) : (
                        <div
                            id="chatwindow"
                            style={{
                                backgroundColor: "#0f0f11",
                                height: "60%",
                                width: "300px",
                                position: "absolute",
                                top: "110px",
                                right: "0px",
                                overflow: "hidden",
                                borderRadius: "5px",
                                border: "1px solid #232323",
                                boxShadow: "1px 1px 1px black",
                            }}
                        ></div>
                    )}

                    {/* {this.state.liveStreamInfo ? ( */}
                    <div>
                        <div>{this.renderPlayer2()}</div>

                        <div className="row" style={{ marginBottom: "10px" }}>
                            <div className="col-1">
                                <Avatar
                                    className="videoPlayAVATAR"
                                    name={this.state.liveStreamInfo && this.state.liveStreamInfo.userName ? this.state.liveStreamInfo.userName : ""}
                                    round={true}
                                    size="50"
                                    src={"/public/avatar/" + (this.state.liveStreamInfo ? this.state.liveStreamInfo.userId : "0")}
                                />
                            </div>

                            <div className="col-10 videoPlayRIGHTPART">
                                <div>
                                    <span className="videoPlayName"> {liveStreamInfo && liveStreamInfo.name}</span>
                                    <span className="videoPlaySEP"> | </span>
                                    {liveStreamInfo && liveStreamInfo.status === ELiveStreamStatus.ONLIVE ? (
                                        <span className="videoPlayTG"> </span>
                                    ) : (
                                        <div />
                                    )}
                                </div>
                                <div className="videoPlayDESC">{liveStreamInfo && liveStreamInfo.description}</div>
                                <div>
                                    <span style={{ width: "50px", textAlign: "center", margin: "0px 15px 0px 0px", fontWeight: "bold" }}>
                                        {liveStreamInfo && liveStreamInfo.userName}
                                    </span>
                                    <span>{liveStreamInfo ? moment(liveStreamInfo.startTimeStamp).format("lll") : ""}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ):(
                                this.errorLiveStream()
                            )} */}

                    {(window as any).mobileCheck() ? (
                        <div id="chatwindow" className="mobilechatwindow">
                            {" "}
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
            </PlayDynamic>
        );
    }
}

export default PlayPage;
