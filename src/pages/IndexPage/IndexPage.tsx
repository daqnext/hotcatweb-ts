/*
 * @Author: your name
 * @Date: 2021-07-16 15:19:04
 * @LastEditTime: 2021-07-28 16:03:27
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
    categoryArray: string[];
    //checkedCategory:{[key:string]:boolean}
    checkedCategory: string[];
    isAllChecked: boolean;
    //videoList:{[key:string]:ILiveStreamInfo[]}

    onLiveVideos: ILiveStreamInfo[];
    videos: ILiveStreamInfo[];
}

// const category = ["Crypto", "Games", "Sports", "Technology"];

class IndexPage extends React.Component<Props, State> {
    lastIndexMap:{[key:string]:number}={}
    onLiveVideoLastIndex:number=0
    
    constructor(props: Props) {
        super(props);
        this.state = {
            categoryArray: [],
            checkedCategory: [],
            isAllChecked: false,
            //videoList:{},

            onLiveVideos: [],
            videos: [],
        };
    }

    async getVideoList(category: string[], count: number,isOnlyOnLive:boolean=false) {
        const url = GlobalData.apiHost + "/api/livestream/getvideolist";
        const sendData = {
            category: category,
            count: count,
            isOnlyOnLive:isOnlyOnLive,
            lastIndexMap:this.lastIndexMap
        };
        const responseData = await RequestTool.post<{ id: number[]; contentMap: { [key: number]: string },lastIndexMap:{[key:string]:number} }>(url, sendData);
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

        //console.log(responseData);
        
        const data = responseData.data;
        this.lastIndexMap={...data.lastIndexMap}
        const streamInfos: ILiveStreamInfo[] = [];
        if (data.id.length <= 0) {
           
            return false;
        }
        for (let i = 0; i < data.id.length; i++) {
            const streamInfoStr = data.contentMap[data.id[i]];
            if (streamInfoStr === null) {
                continue;
            }
            const streamInfo: ILiveStreamInfo = JSON.parse(streamInfoStr);
            if (streamInfo === null) {
                continue;
            }
            //console.log(streamInfo);
            streamInfos.push(streamInfo);
        }

        if (isOnlyOnLive) {
            const list = [...this.state.onLiveVideos];
            list.push(...streamInfos);
            this.setState({ onLiveVideos: list });
        } else {
            const list = [...this.state.videos];
            list.push(...streamInfos);
            this.setState({ videos: list });
        }

        return true
    }

    async getMoreOnLiveVideo() {
        const hasNewVideo=await this.getVideoList(this.state.checkedCategory,8)
        if (!hasNewVideo) {
            (window as any).notify("", "no more videos", "info");
        }
    }

    async getMoreVideo() {
        console.log(this.state.checkedCategory);
        const hasNewVideo=await this.getVideoList(this.state.checkedCategory,12)
        if (!hasNewVideo) {
            (window as any).notify("", "no more videos", "info");
        }
    }

    async componentDidMount() {
        const cate = await CategoryManager.GetCategory();
        if (cate.length > 0) {
            const checked: string[] = [];
            checked.push(...cate);

            this.setState(
                {
                    categoryArray: cate,
                    checkedCategory: checked,
                    //videoList:{}
                },
                () => {
                    //for(let j=0;j<10;j++)
                    
                    this.getVideoList(checked, 8,true);
                    

                    this.getVideoList(checked,36)

                    // for (let i = 0; i < cate.length; i++) {
                    //     //for(let j=0;j<10;j++)
                    //     {
                    //         this.getVideoList(cate[i], 12);
                    //     }
                    // }
                    //this.getVideoList("Crypto",12)
                }
            );
        }

        const multipleChoices = new (window as any).Choices("#choices-multiple", {
            removeItemButton: true,
        });
    }

    renderVideos(list: ILiveStreamInfo[]) {
        //const list=this.state.onLiveVideos
        if (!list || list.length <= 0) {
            return null;
        }
        return (
            <>
                {/* <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">On Live</h2> */}
                <div className="row">
                    {list &&
                        list.map((value, index, array) => {
                            return <VideoCard key={value.id} video={value}></VideoCard>;
                        })}
                </div>
            </>
        );
    }

    // renderCategoryVideos(){
    //     const list=this.state.videos
    //     if (!list||list.length<=0) {
    //         return null
    //     }
    //     return <>
    //     {/* <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">On Live</h2> */}
    //     <div className="row">
    //         {list&&list.map((value, index, array) => {
    //             return (
    //                 <VideoCard video={value}></VideoCard>
    //             );
    //         })}
    //     </div></>
    // }

    // renderCategory(category:string){
    //     const list=this.state.videoList[category]
    //     if (this.state.checkedCategory[category]==false) {
    //         return null
    //     }
    //     if (!list||list.length<=0) {
    //         return null
    //     }
    //     return <>
    //     {/* <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">{category}</h2> */}
    //     <div className="row">
    //         {list&&list.map((value, index, array) => {
    //             return (
    //                 <VideoCard video={value}></VideoCard>
    //             );
    //         })}
    //     </div></>
    // }

    // handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    //     const options = event.target.options;
    //     console.log(options);
    //     const checked: string[] = [];
    //     for (let i = 0; i < options.length; i++) {
    //         checked.push(options[i].value);
    //     }
    //     console.log(checked);
    //     if (checked.includes("ALL")) {
    //         this.setState({ isAllChecked: true });
    //     }

    //     for (let i = 0; i < this.state.categoryArray.length; i++) {
    //         if (!checked.includes(this.state.categoryArray[i])) {
    //             this.setState({ isAllChecked: false });
    //             console.log("unchecked:", this.state.categoryArray[i]);
    //         }
    //     }
    // }

    handleSelect2(event: React.ChangeEvent<HTMLSelectElement>) {
        const options = event.target.options;
        console.log(options);
        const checked: string[] = [];
        for (let i = 0; i < options.length; i++) {
            checked.push(options[i].value);
        }
        
        if (checked.length>0) {
            this.setState({checkedCategory:checked})
        }else{
            this.setState({checkedCategory:[...this.state.categoryArray]})
        }
        
    }

    render() {
        return (
            <DashboardLayout>
                <div className="input-group indexsearch">
                    <div></div>
                    <span className="input-group-text ">
                        {" "}
                        <i className="far fa-laugh-beam"></i> YOUR INTERESTS:
                    </span>
                    <select className="form-control" id="choices-multiple" name="choices-multiple" multiple onChange={this.handleSelect2.bind(this)}>
                        {/* <option value="ALL" key="ALL" selected={true} >ALL</option> */}
                        {this.state.categoryArray.map((value, index, array) => {
                            return (
                                <option key={value} value={value} selected={this.state.checkedCategory.includes(value)}>
                                    {value}
                                </option>
                            );
                        })}
                    </select>
                </div>


                {/* onlive */}

                <div className="videoscontainer">
                    {this.renderVideos(this.state.onLiveVideos)}
                    
                    {this.state.onLiveVideos.length > 0 && (
                        <div
                            style={{marginBottom:"40px"}}
                            onClick={() => {
                                console.log("more on live video");
                                this.getMoreOnLiveVideo()
                            }}
                        >
                            <div className="morevideowrap">
                                <div className="btn btn-sm btn-primary">
                                    <i className="fas fa-arrow-down"></i> click for more on live videos
                                </div>
                            </div>
                        </div>
                    )}

                    {this.renderVideos(this.state.videos)}

                    <div
                        onClick={() => {
                            console.log("more video");
                            this.getMoreVideo()
                        }}
                    >
                        <div className="morevideowrap">
                            <div className="btn btn-sm btn-primary">
                                <i className="fas fa-arrow-down"></i> click for more videos
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default IndexPage;
