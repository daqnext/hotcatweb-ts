/*
 * @Author: your name
 * @Date: 2021-07-18 13:16:44
 * @LastEditTime: 2021-07-26 13:12:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/VideoCard/VideoCard.tsx
 */
import React from "react";
import moment from "moment"
import Image from "../Image/Img";
import { GlobalData } from "../../global/global";
import { ELiveStreamStatus, ILiveStreamInfo } from "../../interface/interface";
import Avatar from "react-avatar";
interface Props {
  video:ILiveStreamInfo
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
                <div className="card mb-4">
                  {this.props.video.status===ELiveStreamStatus.ONLIVE&&<div className="btn btn-sm btn-outline-danger livetag">Live</div>}
                  
                  <Image className="card-img-top img-fluid" src={GlobalData.apiHost+this.props.video.coverImgUrl} alt={GlobalData.apiHost+this.props.video.subTitle}/>
                  <div className="card-body">
                    <div className="user">
                      {/* <div className="avawrap"><img src="/img/hotcat.png"></img></div>    */}
                      <div className="avawrap">
                      <Avatar
                        name={this.props && this.props.video.userName ? this.props.video.userName : ""}
                        round={true}
                        size="30"
                        src={GlobalData.apiHost+"/public/avatar/" + (this.props.video ? this.props.video.userId : "0")}
                    />
                    </div>
                      <span>{this.props.video.userName}</span>
                    </div>
                    <h5 className="card-title">{this.props.video.name}</h5>
                    {/* <p className="card-text">{this.props.video.userName}</p> */}
                    {/* <p className="card-text">{this.props.video.subTitle}</p> */}
                    <p className="card-text footer">
                     <small className="st text-muted">{startTime}</small>
 
                      <i className="fas fa-eye"></i>
                      <small className="st text-muted">{this.props.video.watched}</small>
                      
                    </p>
                  </div>
                </div>
              </div>
        );
    }
}

export default VideoCard;
