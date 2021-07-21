/*
 * @Author: your name
 * @Date: 2021-07-20 09:15:51
 * @LastEditTime: 2021-07-20 14:15:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/ManageLiveStreamPage/LiveStreamDetail.tsx
 */

import React from "react";
import Choices from "choices.js";
import CoverUploader from "../../components/CoverUploader/CoverUploader";
import SweetAlert from "react-bootstrap-sweetalert";
import Dropzone from "react-dropzone";
import { UserManager } from "../../manager/UserManager";
import { RequestTool } from "../../utils/RequestTool";
import { CategoryManager } from "../../manager/CategoryManager";
import { Confirm } from "../../components/Confirm/Confirm";

interface Props {
    liveStreamInfo: any;
    onBackClick: () => void;
}

interface State {
    categoryArray: string[];

    streamName: string;
    subTitle: string;
    description: string;
    category: string;
    coverImgUrl: string;
}

class LiveStreamDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            categoryArray: [],

            streamName: this.props.liveStreamInfo.streamName,
            subTitle: this.props.liveStreamInfo.subTitle,
            description: this.props.liveStreamInfo.description,
            category: this.props.liveStreamInfo.category,
            coverImgUrl: this.props.liveStreamInfo.coverImg,
        };
    }

    async componentDidMount() {
        const cate = await CategoryManager.GetCategory();
        if (cate.length > 0) {
            this.setState({
                categoryArray: cate,
            });
        }

        //Choices
        const element = document.querySelector(".choices-category-streamdetail");
        new Choices(element as any);
    }

    render() {
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
                                    () => {
                                        console.log("delete confirm");
                                    }
                                );
                            }}
                        >
                            {"Delete"}
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div
                        className="btn btn-primary "
                        onClick={() => {
                            this.props.onBackClick();
                        }}
                    >
                        {"< back"}
                    </div>

                    <div
                        className="btn btn-primary"
                        onClick={() => {
                            this.props.onBackClick();
                        }}
                    >
                        {"< back"}
                    </div>

                    <div
                        className="btn btn-primary"
                        onClick={() => {
                            this.props.onBackClick();
                        }}
                    >
                        {"< back"}
                    </div>
                </div> */}

                <form>
                    {/* id */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">Stream Id</label>
                        <input
                            className="form-control"
                            placeholder="Livestreaming name"
                            value={this.props.liveStreamInfo.id}
                            disabled
                        />
                    </div>
                    {/* secret */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">Stream Secret</label>
                        <input
                            className="form-control"
                            placeholder="Livestreaming name"
                            value={this.props.liveStreamInfo.secret}
                            disabled
                        />
                    </div>
                    {/* rtmp */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">RTMP ingest URL</label>
                        <input
                            className="form-control"
                            placeholder="Livestreaming name"
                            value={this.props.liveStreamInfo.rtmp}
                            disabled
                        />
                    </div>
                    {/* playback */}
                    <div className="mb-3">
                        <label className="form-label text-uppercase">playback URL</label>
                        <input
                            className="form-control"
                            placeholder="Livestreaming name"
                            value={this.props.liveStreamInfo.playback}
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
                            value={this.state.subTitle}
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
                            className="choices-category-streamdetail"
                            value={this.state.category}
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
                            value={this.state.description}
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
