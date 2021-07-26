/*
 * @Author: your name
 * @Date: 2021-07-18 13:16:44
 * @LastEditTime: 2021-07-26 08:52:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/VideoCard/VideoCard.tsx
 */
import React from "react";
import moment from "moment"
import Image from "../Image/Img";
import { GlobalData } from "../../global/global";
import { ILiveStreamInfo } from "../../interface/interface";

interface Props {
  video:ILiveStreamInfo
    // id:number
    // title: string;
    // subTitle: string;
    // author: string;
    // description: string;
    // status: "onLive" | "record";
    
    // //duration: number; //ms
    // createTimeStamp: number;
    // startTimeStamp: number;
    // // endTimeStamp: number;
    // //videoLink: string;
    // coverImgUrl: string;
}

interface State {}
class VideoCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount() {}

    render() {
        const startTime=moment(this.props.video.startTimeStamp).format("YYYY-MM-DD HH:mm")
        return (
            <div className="col-md-3" onClick={()=>{
              //window.location.href = `/play?id=${this.props.id}`;
              window.open(`/play?id=${this.props.video.id}`);  
            }}>
                <div className="card mb-4"><Image className="card-img-top img-fluid" src={GlobalData.apiHost+this.props.video.coverImgUrl} alt={GlobalData.apiHost+this.props.video.subTitle}/>
                  <div className="card-body">
                    
                    <h5 className="card-title">{this.props.video.name}</h5>
                    <p className="card-text">{this.props.video.userName}</p>
                    <p className="card-text">{this.props.video.subTitle}</p>
                    <p className="card-text"><small className="text-muted">{startTime}</small></p>
                  </div>
                </div>
              </div>
        );
    }
}

export default VideoCard;
