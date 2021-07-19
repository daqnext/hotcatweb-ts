/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Author: your name
 * @Date: 2021-07-18 17:33:49
 * @LastEditTime: 2021-07-19 16:30:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/NewLiveStreamPage/NewLiveStreamPage.tsx
 */

import React from "react";
import Choices from "choices.js";
import DashboardLayout from "../../layout/DashboardLayout";
import Dropzone from "react-dropzone";
import "./NewLiveStreamPage.css";
import { UserManager } from "../../manager/UserManager";
import { Utils } from "../../utils/Utils";
import { RequestTool } from "../../utils/RequestTool";
import { GlobalData } from "../../global/global";

// declare class Dropzone {
//     constructor(selectorOrElement: string | HTMLInputElement | HTMLSelectElement, userConfig?: any);
// }
// declare function Dropzone(elementId:string,option:any): void;

interface Props {}

interface State {
    streamName: string;
    subTitle: string;
    description: string;
    category: string;
    coverImgUrl: string;
    captcha: string;
    captchaId: string;
}

const category = ["Crypto", "Games", "Sports", "Technology"];

class NewLiveStreamPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            streamName: "",
            subTitle: "",
            description: "",
            category: category[0],
            coverImgUrl: "",
            captcha: "",
            captchaId: "",
        };
    }

    async componentDidMount() {
        //Choices
        const element = document.querySelector(".choices-category-newstream");
        new Choices(element as any);
    }

    checkStreamName() {
        if (this.state.streamName.length <= 5 || this.state.streamName.length >= 40) {
            //chapter length error
            (window as any).notify("error", "Please input stream name(5~40 letters)", "error");
            return false;
        }
        return true;
    }

    checkSubTitle() {
        if (this.state.subTitle.length <= 5 || this.state.subTitle.length >= 40) {
            //chapter length error
            (window as any).notify("error", "Please input subtitle(5~40 letters)", "error");
            return false;
        }
        return true;
    }

    checkDescription() {
        if (this.state.description.length <= 10 || this.state.description.length >= 100) {
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
            streamName: this.state.streamName,
            subTitle: this.state.subTitle,
            description: this.state.description,
            category: this.state.category,
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

        //register success
        //auto login
        // const userInfo: IUserInfo = responseData.data;
        // UserManager.SetUserToken(userInfo.cookie);
    }

    render() {
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
                                            streamName: event.target.value.trim(),
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
                                            subTitle: event.target.value.trim(),
                                        });
                                    }}
                                />
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
                                    {category.map((value, index, array) => {
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
                                            description: event.target.value.trim(),
                                        });
                                    }}
                                />
                            </div>
                            {/* coverUrl */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Cover</label>
                                <Dropzone
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
                                                <div>
                                                    <img
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
                                </Dropzone>
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
