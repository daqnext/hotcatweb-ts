/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Author: your name
 * @Date: 2021-07-18 17:33:49
 * @LastEditTime: 2021-07-24 23:16:22
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
    categoryArray:string[];
    languageOption:ILanguage;

    streamName: string;
    subTitle: string;
    description: string;
    category: string;
    language:string;
    coverImgUrl: string;
    captcha: string;
    captchaId: string;
}

const category = ["Crypto", "Games", "Sports", "Technology"];

class NewLiveStreamPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            categoryArray:[],
            languageOption:{},

            streamName: "",
            subTitle: "",
            description: "",
            category: category[0],
            language:"English",
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
        const info=UserManager.GetUserInfo()
        if (info==null) {
            //show login success msg
            (window as any).notify("success", "Please sign in first", "error");

            //to login page
            window.location.href = "/signin";
            return
        }

        const cate=await CategoryManager.GetCategory()
        if (cate.length>0) {
            this.setState({
                categoryArray:cate,
                category:cate[0]
            })
        }

        const languageOption=await LanguageOptionManager.GetLanguageOption()
        this.setState({languageOption:languageOption})
        
        //category
        const category = document.querySelector(".choices-category-newstream");
        new Choices(category as any);

        //language
        const language = document.querySelector(".choices-language-newstream");
        new Choices(language as any);
    }

    checkStreamName() {
        const temp=this.state.subTitle.trim()
        if (temp.length <= 5 || temp.length >= 40) {
            //chapter length error
            (window as any).notify("error", "Please input stream name(5~40 letters)", "error");
            return false;
        }
        return true;
    }

    checkSubTitle() {
        const temp=this.state.subTitle.trim()
        if (temp.length <= 5 || temp.length >= 40) {
            //chapter length error
            (window as any).notify("error", "Please input subtitle(5~40 letters)", "error");
            return false;
        }
        return true;
    }

    checkDescription() {
        const temp=this.state.description.trim()
        if (temp.length <= 5 || temp.length >= 100) {
            //chapter length error
            (window as any).notify("error", "Please input description(10~100 letters)", "error");
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

    async newLiveStreaming() {
        if (!this.checkStreamName()) {
            return;
        }
        if (!this.checkSubTitle()) {
            return;
        }
        if (!this.checkDescription()) {
            return;
        }
        if (!this.checkCategory()) {
            return;
        }
        if (!this.checkCover()) {
            return;
        }

        const url = GlobalData.apiHost + "/api/livestream/create";
        const sendData = {
            streamName: this.state.streamName.trim(),
            subTitle: this.state.subTitle.trim(),
            description: this.state.description.trim(),
            category: this.state.category,
            language:this.state.language,
            coverImgUrl: this.state.coverImgUrl,
            captcha: "",
            captchaId: "",
        };
        const config = {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        };
        const responseData = await RequestTool.post(url, sendData, config);
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
        const languageNameArray:string[]=[]
        const languageLocalNameArray:string[]=[]
        for (const key in this.state.languageOption) {
            languageNameArray.push(key)
            languageLocalNameArray.push(this.state.languageOption[key])
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
                                    placeholder="Livestreaming name"
                                    onChange={(event) => {
                                        this.setState({
                                            streamName: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                            {/* subtitle */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Subtitle</label>
                                <input
                                    className="form-control"
                                    placeholder="Subtitle"
                                    onChange={(event) => {
                                        this.setState({
                                            subTitle: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                            {/* language */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Language</label>
                                <select
                                    className="choices-language-newstream"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        this.setState({ language: event.target.value });
                                    }}
                                >
                                    {languageLocalNameArray.map((value, index, array) => {
                                        return <option value={languageNameArray[index]}>{value+" "+languageNameArray[index] }</option>;
                                    })}
                                </select>
                            </div>
                            {/* category */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Category</label>
                                <select
                                    className="choices-category-newstream"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        this.setState({ category: event.target.value });
                                    }}
                                >
                                    {this.state.categoryArray.map((value, index, array) => {
                                        return <option>{value}</option>;
                                    })}
                                </select>
                            </div>
                            {/* description */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Description</label>
                                <input
                                    className="form-control"
                                    placeholder="Description"
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
                                    onCoverUploaded={(uploadedCoverUrl:string)=>{
                                        this.setState({coverImgUrl:uploadedCoverUrl})
                                    }}
                                    oldCoverImgUrl={this.state.coverImgUrl}
                                ></CoverUploader>
                                {/* <Dropzone
                                    accept="image/*"
                                    maxFiles={1}
                                    maxSize={500 * 1024}
                                    multiple={false}
                                    validator={(file) => {
                                        //console.log(file);
                                        if (file.size > 500 * 1024) {
                                            (window as any).notify(
                                                "error",
                                                "File size limit 500KB",
                                                "error"
                                            );
                                            return {
                                                code: "file size error",
                                                message: `File size limit 500KB`,
                                            };
                                        }
                                        return null;
                                    }}
                                    onDrop={async (files) => {
                                        console.log(files);
                                        if (files.length <= 0) {
                                            //(window as any).notify("error", "file error", "error");
                                            return;
                                        }

                                        const formData = new FormData();
                                        formData.append("cover", files[0], files[0].name);

                                        const config = {
                                            headers: {
                                                "Content-Type":
                                                    "multipart/form-data;boundary=" +
                                                    new Date().getTime(),
                                                Authorization:
                                                    "Bearer " + UserManager.GetUserToken(),
                                            },
                                        };

                                        const responseData = await RequestTool.post(
                                            "/api/livestream/uploadcover",
                                            formData,
                                            config
                                        );

                                        if (responseData === null) {
                                            //request error
                                            (window as any).notify(
                                                "error",
                                                "upload error",
                                                "error"
                                            );
                                            return;
                                        }
                                        if (responseData && responseData.status !== 0) {
                                            //error
                                            console.log(responseData.msg);
                                            (window as any).notify(
                                                "error",
                                                responseData.msg,
                                                "error"
                                            );
                                            return;
                                        }

                                        //if already uploaded
                                        if (this.state.coverImgUrl) {
                                            //delete
                                            const config = {
                                                headers: {
                                                    Authorization:
                                                        "Bearer " + UserManager.GetUserToken(),
                                                },
                                            };
                                            await RequestTool.post(
                                                "/api/livestream/deletecover",
                                                {
                                                    imgName: this.state.coverImgUrl,
                                                },
                                                config
                                            );
                                            //(window as any).notify("info", "old cover deleted", "info");
                                        }

                                        //success
                                        this.setState({ coverImgUrl: responseData.data.url });
                                    }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <section className="dropzone">
                                            <div className="dz-message" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>Drop image file here or click to upload.</p>
                                                <p>
                                                    <span className="note">
                                                        (file size limit:500 KB, Max width:640, Max
                                                        height:360)
                                                    </span>
                                                </p>
                                            </div>
                                            {this.state.coverImgUrl !== "" && (
                                                <div className="text-center">
                                                    <img
                                                        className="rounded img-fluid"
                                                        src={this.state.coverImgUrl}
                                                        alt={this.state.coverImgUrl}
                                                    />
                                                    <a
                                                        href="#"
                                                        style={{ display: "block" }}
                                                        onClick={async () => {
                                                            if (this.state.coverImgUrl) {
                                                                //delete
                                                                const config = {
                                                                    headers: {
                                                                        Authorization:
                                                                            "Bearer " +
                                                                            UserManager.GetUserToken(),
                                                                    },
                                                                };
                                                                await RequestTool.post(
                                                                    "/api/livestream/deletecover",
                                                                    {
                                                                        imgName:
                                                                            this.state.coverImgUrl,
                                                                    },
                                                                    config
                                                                );
                                                                this.setState({ coverImgUrl: "" });
                                                                (window as any).notify(
                                                                    "info",
                                                                    "old cover deleted",
                                                                    "info"
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </a>
                                                </div>
                                            )}
                                        </section>
                                    )}
                                </Dropzone> */}
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
