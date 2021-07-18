/*
 * @Author: your name
 * @Date: 2021-07-18 17:33:49
 * @LastEditTime: 2021-07-18 23:23:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/NewLiveStreamPage/NewLiveStreamPage.tsx
 */

import React from "react";
import Choices from "choices.js";
import DashboardLayout from "../../layout/DashboardLayout";
import { UserManager } from "../../manager/UserManager";

declare class Dropzone {
    constructor(selectorOrElement: string | HTMLInputElement | HTMLSelectElement, userConfig?: any);
}
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

// streamName: string;
//     subTitle: string;
//     description: string;
//     category: string;
//     coverImgUrl: string;
//     captcha: string;
//     captchaId: string;

const category = ["Crypto", "Games", "Sports", "Technology"];

class NewLiveStreamPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount() {
        //Choices
        const element = document.querySelector(".choices-category-newstream");
        new Choices(element as any);

        //upload
       
        const script: any = document.createElement("script");
        script.src = "/js/dropzone.js";
        script.async = true;
        (document as any).body.appendChild(script);
        
        (Dropzone as any).autoDiscover = false;
        new Dropzone("#cover-upload", {
            parallelUploads: 1,
            // thumbnailHeight: 120,
            // thumbnailWidth: 120,
            maxFiles: 1,
            maxFilesize: 3,
            filesizeBase: 1024,
            uploadMultiple: false,
            headers: { Authorization: "Bearer " + UserManager.GetUserToken() },
            thumbnail: function (file: any, dataUrl: any) {
                if (file.previewElement) {
                    file.previewElement.classList.remove("dz-file-preview");
                    var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                    for (var i = 0; i < images.length; i++) {
                        var thumbnailElement = images[i];
                        thumbnailElement.alt = file.name;
                        thumbnailElement.src = dataUrl;
                    }
                    setTimeout(function () {
                        file.previewElement.classList.add("dz-image-preview");
                    }, 1);
                }
            },
        });
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
                                <input className="form-control" placeholder="Livestreaming name" />
                            </div>
                            {/* subtitle */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Subtitle</label>
                                <input className="form-control" placeholder="Subtitle" />
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
                                <input className="form-control" placeholder="Description" />
                            </div>
                            {/* coverUrl */}
                            <div className="mb-3">
                                <label className="form-label text-uppercase">Cover</label>
                                <form
                                    className="dropzone"
                                    id="cover-upload"
                                    action="/api/livestream/uploadcover"
                                    method="post"
                                    encType="multipart/form-data"
                                >
                                    <div className="dz-message">
                                        <p>Drop image files here or click to upload.</p>
                                        <p>
                                            <span className="note">
                                                (file limit:5MB Max width:1280 Max height:720)
                                            </span>
                                        </p>
                                    </div>
                                </form>
                            </div>
                            <div className="mb-3">
                                <div className="btn btn-primary">New Livestreaming</div>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default NewLiveStreamPage;
