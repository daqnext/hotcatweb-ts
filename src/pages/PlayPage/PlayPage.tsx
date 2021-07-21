/*
 * @Author: your name
 * @Date: 2021-07-18 17:42:28
 * @LastEditTime: 2021-07-20 17:56:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/PlayPage/PlayPage.tsx
 */

import React from "react";
import { GlobalData } from "../../global/global";
import { ILiveStreamInfo } from "../../interface/interface";
import DashboardLayout from "../../layout/DashboardLayout";
import { RequestTool } from "../../utils/RequestTool";
import ReactPlayer from "react-player";
import Avatar from "react-avatar";
import "./PlayPage.css"

interface Props {}

interface State {
    liveStreamInfo: ILiveStreamInfo;
}

class PlayPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            liveStreamInfo: null,
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

        console.log(responseData);

        this.setState({ liveStreamInfo: responseData.data });
    }

    errorLiveStream() {
        return <div>error livestreaming</div>;
    }

    render() {
        console.log(this.state.liveStreamInfo);
        
        return (
            <DashboardLayout>
                {/* {this.state.liveStreamInfo ? ( */}
                    <div className="container">
                        <div className="col-10">
                            <ReactPlayer className="video-player" url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8" controls 
                            />
                        </div>
                        
                        <div>title</div>
                        <div>author info</div>
                        <Avatar
                            name={
                                this.state.liveStreamInfo && this.state.liveStreamInfo.userName
                                    ? this.state.liveStreamInfo.userName
                                    : ""
                            }
                            round={true}
                            size="45"
                            src={"/public/avatar/" + (this.state.liveStreamInfo?this.state.liveStreamInfo.userId:"0")}
                        />
                        <div>description</div>
                        <div>Onlive or record</div>
                        <div>share button</div>
                        <div>start time</div>
                    </div>
                {/* ):(
                    this.errorLiveStream()
                )} */}
            </DashboardLayout>
        );
    }
}

export default PlayPage;
