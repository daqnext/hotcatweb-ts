/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Author: your name
 * @Date: 2021-07-18 17:33:49
 * @LastEditTime: 2021-08-05 11:19:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/NewLiveStreamPage/NewLiveStreamPage.tsx
 */

import React from "react";
import Choices from "choices.js";
import DashboardLayout from "../../layout/DashboardLayout";
import CoverUploader from "../../components/CoverUploader/CoverUplodaer2";
import "./NewLiveStreamPage.css";
import { UserManager } from "../../manager/UserManager";
import { Utils } from "../../utils/Utils";
import { RequestTool } from "../../utils/RequestTool";
import { GlobalData } from "../../global/global";
import { CategoryManager } from "../../manager/CategoryManager";
import { ILanguage } from "../../interface/interface";
import { LanguageOptionManager } from "../../manager/LanguageManager";

// declare class Dropzone {
//     constructor(selectorOrElement: string | HTMLInputElement | HTMLSelectElement, userConfig?: any);
// }
// declare function Dropzone(elementId:string,option:any): void;

interface Props {}
interface State {
    categoryArray: string[];
    languageOption: ILanguage;

    streamName: string;
    subTitle: string;
    description: string;
    category: string;
    area:string;
    language: string;
    coverImgUrl: string;
    captcha: string;
    captchaId: string;
}

const category = ["Crypto", "Games", "Sports", "Technology"];
const areaArray=["","Asia","Oceania","Africa","Europe","North America","South America","China"]

class NewLiveStreamPage extends React.Component<Props, State> {
    isCreating=false
    constructor(props: Props) {
        super(props);
        this.state = {
            categoryArray: [],
            languageOption: {},

            streamName: "",
            subTitle: "",
            description: "",
            category: category[0],
            area:"",
            language: "English",
            coverImgUrl: "",
            captcha: "",
            captchaId: "",
        };
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        //UserManager.TokenCheckAndRedirectLogin();
        const info = UserManager.GetUserInfo();
        if (info == null) {
            //show login success msg
            (window as any).notify("success", "Please sign in first", "error");

            //to login page
            window.location.href = "/signin";
            return;
        }

        const cate = await CategoryManager.GetCategory();
        if (cate.length > 0) {
            this.setState({
                categoryArray: cate,
                category: cate[0],
            });
        }

        const languageOption = await LanguageOptionManager.GetLanguageOption();
        this.setState({ languageOption: languageOption });

        //category
        const category = document.querySelector(".choices-category-newstream");
        new Choices(category as any);

        //language
        const language = document.querySelector(".choices-language-newstream");
        new Choices(language as any);

        //region
        const area = document.querySelector(".choices-area-newstream");
        new Choices(area as any);
    }

    checkStreamName() {
        const temp = this.state.streamName.trim();
        if (temp.length < 5 || temp.length > 150) {
            //chapter length error
            (window as any).notify("error", "Please input stream name(5~150 letters)", "error");
            return false;
        }
        return true;
    }

    checkSubTitle() {
        const temp = this.state.subTitle.trim();
        if (temp.length < 5 || temp.length > 150) {
            //chapter length error
            (window as any).notify("error", "Please input subtitle(5~150 letters)", "error");
            return false;
        }
        return true;
    }

    checkDescription() {
        const temp = this.state.description.trim();
        if (temp.length < 5 || temp.length > 150) {
            //chapter length error
            (window as any).notify("error", "Please input description(5~150 letters)", "error");
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

    checkArea() {
        if (this.state.area === "") {
            //chapter length error
            (window as any).notify("error", "Please choose a location", "error");
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

    async newLiveStreaming() {
        if (this.isCreating) {
            //notify
            return
        }

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
        if (!this.checkArea()) {
            return;
        }
        if (!this.checkCover()) {
            return;
        }

        const url = GlobalData.apiHost + "/api/livestream/create";
        const sendData:any = {
            streamName: this.state.streamName.trim(),
            subTitle: this.state.subTitle.trim(),
            description: this.state.description.trim(),
            category: this.state.category,
            area:this.state.area,
            language: this.state.language,
            coverImgUrl: this.state.coverImgUrl,
            captcha: "",
            captchaId: "",
        };
        const config = {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        };

        this.isCreating=true
        setTimeout(() => {
            this.isCreating=false
        }, 6000);
        const responseData = await RequestTool.post(url, sendData, config);
        setTimeout(() => {
            this.isCreating=false
        }, 1000);
        if (responseData === null) {
            //request error
            (window as any).notify("error", "new livestream error", "error");
            return;
        }
        if (responseData && responseData.status !== 0) {
            //error
            console.log(responseData.msg);
            (window as any).notify("error", responseData.msg, "error");
            return;
        }

        //success
        //to manage page
        window.location.href = "/managelivestream";
    }

    render() {
        const languageNameArray: string[] = [];
        const languageLocalNameArray: string[] = [];
        for (const key in this.state.languageOption) {
            languageNameArray.push(key);
            languageLocalNameArray.push(this.state.languageOption[key]);
        }

        return (
            <DashboardLayout>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-heading">Start a new livestreaming</h4>
                    </div>
                    <div className="card-body">
                        <p></p>
                        <form>
                            {/* title */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Stream Name</label>
                                <input
                                    className="form-control"
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
                                    className="choices-language-newstream"
                                    onChange={(event) => {
                                        //console.log(event.target.value);
                                        this.setState({ language: event.target.value });
                                    }}
                                >
                                    {languageLocalNameArray.map((value, index, array) => {
                                        return <option value={languageNameArray[index]}>{value + " " + languageNameArray[index]}</option>;
                                    })}
                                </select>
                            </div>
                            {/* category */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Category</label>
                                <select
                                    className="choices-category-newstream"
                                    onChange={(event) => {
                                        //console.log(event.target.value);
                                        this.setState({ category: event.target.value });
                                    }}
                                >
                                    {this.state.categoryArray.map((value, index, array) => {
                                        return <option>{value}</option>;
                                    })}
                                </select>
                            </div>

                            {/* area */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Your Location</label>
                                <select
                                    className="choices-area-newstream"
                                    value={this.state.area}
                                    onChange={(event) => {
                                        //console.log(event.target.value);
                                        this.setState({ area: event.target.value });
                                    }}
                                >
                                    {areaArray.map((value, index, array) => {
                                        return <option>{value}</option>;
                                    })}
                                </select>
                            </div>

                            {/* description */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Description</label>
                                <input
                                    className="form-control"
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
                                    onCoverUploaded={(uploadedCoverUrl: string) => {
                                        this.setState({ coverImgUrl: uploadedCoverUrl });
                                    }}
                                    oldCoverImgUrl={this.state.coverImgUrl}
                                ></CoverUploader>
                            </div>
                            <div className="mb-3">
                                <div
                                    className="btn btn-primary"
                                    onClick={() => {
                                        this.newLiveStreaming();
                                    }}
                                >
                                    New Livestreaming
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default NewLiveStreamPage;
