/*
 * @Author: your name
 * @Date: 2021-07-16 15:19:04
 * @LastEditTime: 2021-07-24 20:36:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/IndexPage/IndexPage.tsx
 */

import React from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import { GlobalData } from "../../global/global";
import { ELiveStreamStatus, ILiveStreamInfo } from "../../interface/interface";
import DashboardLayout from "../../layout/DashboardLayout";
import { CategoryManager } from "../../manager/CategoryManager";
import { RequestTool } from "../../utils/RequestTool";

interface Props {}

interface State {
    categoryArray:string[];
    checkedCategory:{[key:string]:boolean}

    videoList:{[key:string]:ILiveStreamInfo[]}

    videos:ILiveStreamInfo[]
}

const video = [
    {
        title: "MyVideoTitle",
        subTitle: "subTitle here",
        author: "zzb",
        description: "video log",
        status: "record",
        duration: 1800,
        createTimeStamp: 1626587861000,
        startTimeStamp: 1626587861000,
        endTimeStamp: 1626587861000,
        videoLink: "",
        coverImgUrl: "",
    },
    {
        title: "MyVideoTitle",
        subTitle: "subTitle here",
        author: "zzb",
        description: "video log",
        status: "record",
        duration: 1800,
        createTimeStamp: 1626587861000,
        startTimeStamp: 1626587861000,
        endTimeStamp: 1626587861000,
        videoLink: "",
        coverImgUrl: "https://imgs.699pic.com/01/500/465/562/500465562.jpg!list2x.v1",
    },
    {
        title: "MyVideoTitle",
        subTitle: "subTitle here",
        author: "zzb",
        description: "video log",
        status: "record",
        duration: 1800,
        createTimeStamp: 1626587861000,
        startTimeStamp: 1626587861000,
        endTimeStamp: 1626587861000,
        videoLink: "",
        coverImgUrl: "https://imgs.699pic.com/01/500/465/562/500465562.jpg!list2x.v1",
    },
    {
        title: "MyVideoTitle",
        subTitle: "subTitle here",
        author: "zzb",
        description: "video log",
        status: "record",
        duration: 1800,
        createTimeStamp: 1626587861000,
        startTimeStamp: 1626587861000,
        endTimeStamp: 1626587861000,
        videoLink: "",
        coverImgUrl: "https://imgs.699pic.com/01/500/465/562/500465562.jpg!list2x.v1",
    },
    {
        title: "MyVideoTitle",
        subTitle: "subTitle here",
        author: "zzb",
        description: "video log",
        status: "record",
        duration: 1800,
        createTimeStamp: 1626587861000,
        startTimeStamp: 1626587861000,
        endTimeStamp: 1626587861000,
        videoLink: "",
        coverImgUrl: "https://imgs.699pic.com/01/500/465/562/500465562.jpg!list2x.v1",
    },
    {
        title: "MyVideoTitle",
        subTitle: "subTitle here",
        author: "zzb",
        description: "video log",
        status: "record",
        duration: 1800,
        createTimeStamp: 1626587861000,
        startTimeStamp: 1626587861000,
        endTimeStamp: 1626587861000,
        videoLink: "",
        coverImgUrl: "https://imgs.699pic.com/01/500/465/562/500465562.jpg!list2x.v1",
    },
    {
        title: "MyVideoTitle",
        subTitle: "subTitle here",
        author: "zzb",
        description: "video log",
        status: "record",
        duration: 1800,
        createTimeStamp: 1626587861000,
        startTimeStamp: 1626587861000,
        endTimeStamp: 1626587861000,
        videoLink: "",
        coverImgUrl: "https://imgs.699pic.com/01/500/465/562/500465562.jpg!list2x.v1",
    },
    {
        title: "MyVideoTitle",
        subTitle: "subTitle here",
        author: "zzb",
        description: "video log",
        status: "record",
        duration: 1800,
        createTimeStamp: 1626587861000,
        startTimeStamp: 1626587861000,
        endTimeStamp: 1626587861000,
        videoLink: "",
        coverImgUrl: "https://imgs.699pic.com/01/500/465/562/500465562.jpg!list2x.v1",
    },
];

// const category = ["Crypto", "Games", "Sports", "Technology"];

class IndexPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state={
            categoryArray:[],
            checkedCategory:{},
            videoList:{},

            videos:[]
        }
    }

    async getVideoList(category:string,count:number){
        const url = GlobalData.apiHost + "/api/livestream/getvideolist";
        const sendData = {
            category:category,
            count:count
        };
        const responseData = await RequestTool.post<{id:number[],contentMap:{[key:number]:string}}>(url, sendData);
        // if (responseData === null) {
        //     //request error
        //     (window as any).notify("error", "program error", "error");
        //     return;
        // }
        // if (responseData && responseData.status !== 0) {
        //     //error
        //     console.log(responseData.msg);
        //     (window as any).notify("error", responseData.msg, "error");
        //     return;
        // }

        console.log(responseData);
        const data=responseData.data
        const streamInfos:ILiveStreamInfo[]=[]
        if (data.id.length<=0) {
            return
        }
        for (let i = 0; i < data.id.length; i++) {
            const streamInfoStr=data.contentMap[data.id[i]]
            if (streamInfoStr===null) {
                continue
            }
            const streamInfo:ILiveStreamInfo=JSON.parse(streamInfoStr)
            if (streamInfo===null) {
                continue
            }
            console.log(streamInfo);
            streamInfos.push(streamInfo)
        }
        this.setState({videoList:{...this.state.videoList,[category]:streamInfos}})
    }

    async componentDidMount(){
        const cate=await CategoryManager.GetCategory()
        if (cate.length>0) {
            const checked:{[key:string]:boolean}={}
            for (let i = 0; i < cate.length; i++) {
                checked[cate[i]]=true
            }
            this.setState({
                categoryArray:cate,
                checkedCategory:checked,
                //videoList:{}
            },()=>{
                this.getVideoList(ELiveStreamStatus.ONLIVE,8)
                for (let i = 0; i < cate.length; i++) {
                    this.getVideoList(cate[i],12)
                }
            })
        }

        
        
    }

    renderOnliveVideo(){
        const list=this.state.videoList[ELiveStreamStatus.ONLIVE]
        return <><h2 className="section-heading section-heading-ms mb-4 mb-lg-5">On Live</h2>
        <div className="row">
            {list&&list.map((value, index, array) => {
                return (
                    <VideoCard
                        id={value.id}
                        key={index}
                        title={value.name}
                        subTitle={value.subTitle}
                        author={value.userName}
                        description={value.description}
                        status={value.status===ELiveStreamStatus.ONLIVE?"onLive":"record"}
                        //duration={value.duration}
                        //createTimeStamp={value.createTimeStamp}
                        startTimeStamp={value.startTimeStamp}
                        //endTimeStamp={value.endTimeStamp}
                        //videoLink={value.videoLink}
                        coverImgUrl={value.coverImgUrl}
                    ></VideoCard>
                );
            })}
        </div></>
    }

    renderCategory(category:string){
        const list=this.state.videoList[category]
        if (this.state.checkedCategory[category]==false) {
            return null
        }
        return <><h2 className="section-heading section-heading-ms mb-4 mb-lg-5">{category}</h2>
        <div className="row">
            {list&&list.map((value, index, array) => {
                return (
                    <VideoCard
                        id={value.id}
                        key={index}
                        title={value.name}
                        subTitle={value.subTitle}
                        author={value.userName}
                        description={value.description}
                        status={value.status===ELiveStreamStatus.ONLIVE?"onLive":"record"}
                        //duration={value.duration}
                        //createTimeStamp={value.createTimeStamp}
                        startTimeStamp={value.startTimeStamp}
                        //endTimeStamp={value.endTimeStamp}
                        //videoLink={value.videoLink}
                        coverImgUrl={value.coverImgUrl}
                    ></VideoCard>
                );
            })}
        </div></>
    }

    render() {
        return (
            <DashboardLayout>
                <div className="form-group">
                    <label>Search your interest</label>
                    <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic checkbox toggle button group"
                    >
                        {this.state.categoryArray.map((value, index, array) => {
                            return (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        className="btn-check"
                                        id={value}
                                        autoComplete="off"
                                        checked={this.state.checkedCategory[value]}
                                        onChange={(event)=>{
                                            // console.log(event.target.id);
                                            // console.log(event.target.checked);
                                            const checkedCategory=this.state.checkedCategory
                                            if (event.target.checked) {
                                                checkedCategory[value]=true
                                            }else{
                                                checkedCategory[value]=false
                                            }
                                            this.setState({checkedCategory:checkedCategory})
                                        }}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor={value}>
                                        {value}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* onlive */}
                {this.renderOnliveVideo()}

                {this.state.categoryArray.map((value,index,array)=>{
                    return this.renderCategory(value)
                })}

                {/* hot video */}
                {/* <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">Crypto</h2>
                <div className="row">
                    {this.state.videos.map((value, index, array) => {
                        return (
                            <VideoCard
                                key={index}
                                title={value.name}
                                subTitle={value.subTitle}
                                author={value.userName}
                                description={value.description}
                                status={value.status===ELiveStreamStatus.ONLIVE?"onLive":"record"}
                                //duration={value.duration}
                                //createTimeStamp={value.createTimeStamp}
                                startTimeStamp={value.startTimeStamp}
                                //endTimeStamp={value.endTimeStamp}
                                //videoLink={value.videoLink}
                                coverImgUrl={value.coverImgUrl}
                            ></VideoCard>
                        );
                    })}
                </div> */}
            </DashboardLayout>
        );
    }
}

export default IndexPage;
