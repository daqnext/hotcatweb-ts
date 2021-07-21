/*
 * @Author: your name
 * @Date: 2021-07-16 15:19:04
 * @LastEditTime: 2021-07-20 11:50:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/IndexPage/IndexPage.tsx
 */

import React from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import DashboardLayout from "../../layout/DashboardLayout";
import { CategoryManager } from "../../manager/CategoryManager";

interface Props {}

interface State {
    categoryArray:string[];
    
    checkedCategory:{[key:string]:boolean}
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
            checkedCategory:{
               
            }
        }
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
                checkedCategory:checked
            })
        }
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

                {/* hot video */}
                <div className="row">
                    {video.map((value, index, array) => {
                        return (
                            <VideoCard
                                key={index}
                                title={value.title}
                                subTitle={value.subTitle}
                                author={value.author}
                                description={value.description}
                                status="record"
                                duration={value.duration}
                                createTimeStamp={value.createTimeStamp}
                                startTimeStamp={value.startTimeStamp}
                                endTimeStamp={value.endTimeStamp}
                                videoLink={value.videoLink}
                                coverImgUrl={value.coverImgUrl}
                            ></VideoCard>
                        );
                    })}
                </div>
            </DashboardLayout>
        );
    }
}

export default IndexPage;
