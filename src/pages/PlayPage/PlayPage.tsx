/*
 * @Author: your name
 * @Date: 2021-07-18 17:42:28
 * @LastEditTime: 2021-07-26 17:31:01
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
            playing: false,
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
    }

    async watched(id:number,category:string){
        const url = GlobalData.apiHost + "/api/livestream/watch/"+id+"/"+category;
        await RequestTool.get(url);
    }

    async getLiveStream(id: number) {
        //const url = GlobalData.apiHost + "/api/livestream/get";
        const url = "http://13.57.179.134:7000/api/livestream/get"
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

        console.log(responseData);
        const stream = responseData.data;
        //watched
        this.watched(id,stream.category)
        
        
        this.setState({ liveStreamInfo: stream });
        if (stream.status === ELiveStreamStatus.PAUSE || stream.status === ELiveStreamStatus.END) {
            
            if(!await Utils.IsRemoteFileAvailable(stream.cdnRecordM3u8Link)){                
                this.setState({ videoUrl: stream.originRecordM3u8Link, playing: false });
            }else{                
                this.setState({ videoUrl: stream.cdnRecordM3u8Link, playing: false });
            }
            
        } else if (stream.status === ELiveStreamStatus.ONLIVE) {
            if(!await Utils.IsRemoteFileAvailable(stream.cdnLiveM3u8Link)){
                this.setState({ videoUrl: stream.originLiveM3u8Link, playing: true });
            }else{
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

    render() {
        console.log(this.state.liveStreamInfo);
        const {liveStreamInfo}=this.state
        return (
            
            <DashboardLayout>
                {/* {this.state.liveStreamInfo ? ( */}
                <div className="container">
                    <div className="col-10">
                        <ReactPlayer
                            className="video-player"
                            width="100%"
                            height="100%"
                            url={this.state.videoUrl}
                            controls
                            config={{file:{
                                forceHLS:true
                            }}}
                            playing={this.state.playing}
                            // onReady={(player)=>{
                            //     player.
                            // }}
                        />
                    </div>

                    <div>{liveStreamInfo&&liveStreamInfo.name}</div>
                    <div>{liveStreamInfo&&liveStreamInfo.userName}</div>
                    <Avatar
                        name={this.state.liveStreamInfo && this.state.liveStreamInfo.userName ? this.state.liveStreamInfo.userName : ""}
                        round={true}
                        size="45"
                        src={"/public/avatar/" + (this.state.liveStreamInfo ? this.state.liveStreamInfo.userId : "0")}
                    />
                    <div>{liveStreamInfo&&liveStreamInfo.description}</div>
                    <div>{liveStreamInfo&&liveStreamInfo.status===ELiveStreamStatus.ONLIVE?"onlive":"record"}</div>
                    <div>share button</div>
                    <div>{liveStreamInfo?moment(liveStreamInfo.startTimeStamp).format("lll"):""}</div>
                </div>
                {/* ):(
                    this.errorLiveStream()
                )} */}
            </DashboardLayout>
        );
    }
}

export default PlayPage;
