/*
 * @Author: your name
 * @Date: 2021-07-18 13:16:44
 * @LastEditTime: 2021-08-05 11:01:49
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
            <div className="col-md-4" onClick={()=>{
              //window.location.href = `/play?id=${this.props.id}`;
              window.open(`/play?id=${this.props.video.id}`);  
            }}>
                <div className="card">
                  {this.props.video.status===ELiveStreamStatus.ONLIVE&&<div className="btn btn-sm btn-outline-danger livetag">Live</div>}
                  
                  <div className="imgwrapper">
                    <Image className="card-img-top img-fluid" src={this.props.video.coverImgUrl} alt={this.props.video.coverImgUrl}/>
                  </div>   
                  <div className="card-body">
                         
                              <div className="avawrap">
                                <Avatar
                                  name={this.props && this.props.video.userName ? this.props.video.userName : ""}
                                  round={true}
                                  size="40"
                                  //src={GlobalData.apiHost+"/public/avatar/" + (this.props.video ? this.props.video.userId : "0")} 
                                  />
                              </div>
                              <h5 className="card-title">
                                <span>{this.props.video.name}</span>
                                <div className="mid">
                                  <span className="nametext">{this.props.video.userName }</span>
                                  <span>|</span>
                                  <span className="lan"> {this.props.video.language} </span>
                                </div>
                              </h5>
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
