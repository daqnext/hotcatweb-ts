/*
 * @Author: your name
 * @Date: 2021-07-20 09:15:51
 * @LastEditTime: 2021-08-01 19:31:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/ManageLiveStreamPage/LiveStreamDetail.tsx
 */

import React from "react";
import Choices from "choices.js";
import CoverUploader from "../../components/CoverUploader/CoverUplodaer2";
import SweetAlert from "react-bootstrap-sweetalert";
import Dropzone from "react-dropzone";
import { UserManager } from "../../manager/UserManager";
import { RequestTool } from "../../utils/RequestTool";
import { CategoryManager } from "../../manager/CategoryManager";
import { Confirm } from "../../components/Confirm/Confirm";
import { ILanguage, ILiveStreamInfo } from "../../interface/interface";
import { LanguageOptionManager } from "../../manager/LanguageManager";
import { GlobalData } from "../../global/global";

interface Props {
    liveStreamInfo: ILiveStreamInfo;
    onBackClick: () => void;
}

interface State {
    categoryArray: string[];
    languageOption:ILanguage,

    streamName: string;
    subTitle: string;
    description: string;
    category: string;
    language:string;
    coverImgUrl: string;
}

class LiveStreamDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            categoryArray: [],
            languageOption:{},

            streamName: this.props.liveStreamInfo.name,
            subTitle: this.props.liveStreamInfo.subTitle,
            description: this.props.liveStreamInfo.description,
            category: this.props.liveStreamInfo.category,
            language:this.props.liveStreamInfo.language,
            coverImgUrl: this.props.liveStreamInfo.coverImgUrl,
        };
        // console.log(this.state);
        
    }

    async componentDidMount() {
        const cate = await CategoryManager.GetCategory();
        if (cate.length > 0) {
            this.setState({
                categoryArray: cate,
            });
        }

        const languageOption=await LanguageOptionManager.GetLanguageOption()
        this.setState({languageOption:languageOption})
        
        //category
        const category = document.querySelector(".choices-category-streamdetail");
        new Choices(category as any);

        //language
        const language = document.querySelector(".choices-language-streamdetail");
        new Choices(language as any);
    }

    async finishStream() {}


    checkStreamName() {
        const temp=this.state.subTitle.trim()
        if (temp.length < 5 || temp.length > 150) {
            //chapter length error
            (window as any).notify("error", "Please input stream name(5~150 letters)", "error");
            return false;
        }
        return true;
    }

    checkSubTitle() {
        const temp=this.state.subTitle.trim()
        if (temp.length < 5 || temp.length > 150) {
            //chapter length error
            (window as any).notify("error", "Please input subtitle(5~150 letters)", "error");
            return false;
        }
        return true;
    }

    checkDescription() {
        const temp=this.state.description.trim()
        if (temp.length < 5 || temp.length > 100) {
            //chapter length error
            (window as any).notify("error", "Please input description(5~100 letters)", "error");
            return false;
        }
        return true;
    }

    checkCategory() {
        if (this.state.category === "") {
            //chapter length error
            (window as any).notify("error", "Please choose a category", "error");
            return false;
        }
        return true;
    }

    checkCover() {
        if (this.state.coverImgUrl === "") {
            //chapter length error
            (window as any).notify("error", "Please upload a cover", "error");
            return false;
        }
        return true;
    }

    async updateStream() {
        if (!this.checkStreamName()) {
            return;
        }
        // if (!this.checkSubTitle()) {
        //     return;
        // }
        if (!this.checkDescription()) {
            return;
        }
        if (!this.checkCategory()) {
            return;
        }
        if (!this.checkCover()) {
            return;
        }
        
        const sendData = {
            streamId: this.props.liveStreamInfo.id,
            secret: this.props.liveStreamInfo.secret,
            streamName: this.state.streamName.trim(),
            subTitle: this.state.subTitle.trim(),
            description: this.state.description.trim(),
            category: this.state.category,
            language:this.state.language,
            coverImgUrl: this.state.coverImgUrl,
        };

        let response = await RequestTool.post(GlobalData.apiHost+"/api/livestream/update", sendData, {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        });

        if (response === null) {
            (window as any).notify("error", "update error", "error");
            return
        }

        console.log(response);

        if (response && response.status === 0) {
            (window as any).notify("success", "Livestreaming updated", "success");

            //set new state

            return true;
        }

        (window as any).notify("error", "update error", "error");
        return false;
    }

    async deleteStream(streamId: number, secret: string) {
        const sendData = {
            streamId: streamId,
            secret: secret,
        };

        let response = await RequestTool.post(GlobalData.apiHost+"/api/livestream/delete", sendData, {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        });

        if (response === null) {
            return false;
        }

        console.log(response);

        if (response && response.status === 0) {
            return true;
        }

        return false;
    }

    render() {
        // console.log(this.props.liveStreamInfo);
        // console.log(this.state);
        

        const languageNameArray:string[]=[]
        const languageLocalNameArray:string[]=[]
        for (const key in this.state.languageOption) {
            languageNameArray.push(key)
            languageLocalNameArray.push(this.state.languageOption[key])
        }

        return (
            <div>
                <div className="container">
                    <div className="row justify-content-start">
                        <div
                            className="btn btn-primary col-1"
                            onClick={() => {
                                this.props.onBackClick();
                            }}
                        >
                            {"< back"}
                        </div>
                    </div>

                    <div className="row justify-content-end">
                        <div
                            className="btn btn-success col-1"
                            onClick={() => {
                                console.log("finishButton click");

                                Confirm.ShowConfirm(
                                    "warning",
                                    "Are you sure",
                                    "You will no longer be able to push new content if you finish this stream.",
                                    true,
                                    "warning",
                                    "primary",
                                    "Confirm",
                                    () => {
                                        console.log("Finish confirm");
                                    }
                                );
                            }}
                        >
                            {"Finish"}
                        </div>

                        <div
                            className="btn btn-danger col-1"
                            onClick={() => {
                                Confirm.ShowConfirm(
                                    "warning",
                                    "Are you sure",
                                    "Do you confirm? This operation cannot be undone",
                                    true,
                                    "danger",
                                    "primary",
                                    "Confirm",
                                    async () => {
                                        console.log("delete confirm");
                                        const result = await this.deleteStream(this.props.liveStreamInfo.id, this.props.liveStreamInfo.secret);
                                        if (result) {
                                            this.props.onBackClick();
                                        }
                                    }
                                );
                            }}
                        >
                            {"Delete"}
                        </div>
                    </div>
                </div>
                

                <form>
                    {/* id */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">Stream Id</label>
                        <input className="form-control" placeholder="Livestreaming name" value={this.props.liveStreamInfo.id} disabled />
                    </div>
                    {/* secret */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">Stream Secret</label>
                        <input className="form-control" placeholder="Livestreaming name" value={this.props.liveStreamInfo.secret} disabled />
                    </div>
                    {/* rtmp */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">RTMP ingest URL</label>
                        <input className="form-control" placeholder="Livestreaming name" value={this.props.liveStreamInfo.rtmpLink} disabled />
                    </div>
                    {/* playback */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">playback URL</label>
                        <input
                            className="form-control"
                            placeholder="Livestreaming name"
                            value={"https://hotcat.live/play?id=" + this.props.liveStreamInfo.id}
                            disabled
                        />
                    </div>
                    {/* title */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">Stream Name</label>
                        <input
                            className="form-control"
                            placeholder="Livestreaming name"
                            value={this.state.streamName}
                            onChange={(event) => {
                                this.setState({
                                    streamName: event.target.value,
                                });
                            }}
                        />
                    </div>
                    {/* subtitle */}
                    {/* <div className="mb-3">
                        <label className="form-label text-uppercase">Subtitle</label>
                        <input
                            className="form-control"
                            placeholder="Subtitle"
                            value={this.state.subTitle}
                            onChange={(event) => {
                                this.setState({
                                    subTitle: event.target.value,
                                });
                            }}
                        />
                    </div> */}
                    {/* language */}
                    <div className="mb-3">
                                <label className="form-label text-uppercase">Language</label>
                                <select
                                    className="choices-language-streamdetail"
                                    value={this.state.language}
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        this.setState({ language: event.target.value });
                                    }}
                                >
                                    {languageLocalNameArray.map((value, index, array) => {                                       
                                        return <option key={index} value={languageNameArray[index]}>{value+" "+languageNameArray[index] }</option>;
                                    })}
                                </select>
                            </div>
                    {/* category */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">Category</label>
                        <select
                            className="choices-category-streamdetail"
                            value={this.state.category}
                            onChange={(event) => {
                                console.log(event.target.value);
                                this.setState({ category: event.target.value });
                            }}
                        >
                            {this.state.categoryArray.map((value, index, array) => {
                                return <option key={index}>{value}</option>;
                            })}
                        </select>
                    </div>
                    {/* description */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">Description</label>
                        <input
                            className="form-control"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={(event) => {
                                this.setState({
                                    description: event.target.value,
                                });
                            }}
                        />
                    </div>
                    {/* coverUrl */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">Cover</label>
                        <CoverUploader
                            onCoverUploaded={(newUrl: string) => {
                                this.setState({ coverImgUrl: newUrl });
                            }}
                            oldCoverImgUrl={this.props.liveStreamInfo.coverImgUrl}
                        ></CoverUploader>
                    </div>
                    <div className="mb-3">
                        <div
                            className="btn btn-primary"
                            onClick={() => {
                                console.log("submit");
                                this.updateStream()
                            }}
                        >
                            update
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LiveStreamDetail;
