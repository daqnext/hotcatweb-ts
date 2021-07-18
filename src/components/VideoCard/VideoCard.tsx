/*
 * @Author: your name
 * @Date: 2021-07-18 13:16:44
 * @LastEditTime: 2021-07-18 17:19:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/VideoCard/VideoCard.tsx
 */
import React from "react";
import moment from "moment"
import Image from "../Image/Img";

interface Props {
    title: string;
    subTitle: string;
    author: string;
    description: string;
    status: "onLive" | "record";
    duration: number; //second
    createTimeStamp: number;
    startTimeStamp: number;
    endTimeStamp: number;
    videoLink: string;
    coverImgUrl: string;
}

interface State {}
class VideoCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount() {}

    render() {
        const startTime=moment(this.props.startTimeStamp).format("YYYY-MM-DD HH:mm:ss")
        return (
            <div className="col-md-4">
                <div className="card mb-4"><Image className="card-img-top img-fluid" src={this.props.coverImgUrl} alt={this.props.title}/>
                  <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.subTitle}</p>
                    <p className="card-text"><small className="text-muted">{startTime}</small></p>
                  </div>
                </div>
              </div>
        );
    }
}

export default VideoCard;