/*
 * @Author: your name
 * @Date: 2021-08-02 15:14:12
 * @LastEditTime: 2021-08-03 14:57:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/videoUpload/VideoUpload.tsx
 */

/*
 * @Author: your name
 * @Date: 2021-07-24 22:34:08
 * @LastEditTime: 2021-07-25 19:05:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/CoverUploader/CoverUplodaer2.tsx
 */
import React from "react";
import "cropperjs/dist/cropper.css";
import Cropper, { ReactCropperElement } from "react-cropper";
import Dropzone, { DropEvent } from "react-dropzone";
import { UserManager } from "../../manager/UserManager";
import { RequestTool } from "../../utils/RequestTool";
import { GlobalData } from "../../global/global";
import { ILiveStreamInfo } from "../../interface/interface";

interface Props {
    onVideoUploaded: () => void;
    liveStreamInfo: ILiveStreamInfo;
}
interface State {
    uploadFile: File;
    upProcess: number;
    uploadState: "Ready" | "Uploading" | "Transcoding and Upload" | "Finish" | "Failed";
}

class VideoUpload extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            uploadFile: null,
            upProcess: 0,
            uploadState: "Ready",
        };
    }

    // uploadImg() {
    //     // if(this.state.src === null) {
    //     //     alert("请选择图片");
    //     //     return false;
    //     // }

    //     console.log(this.cropper);

    //     const croppedCanvas = this.cropper.getCroppedCanvas({
    //         minWidth: 160,
    //         minHeight: 90,
    //         width: 640,
    //         height: 360,
    //         maxWidth: 640,
    //         maxHeight: 360,
    //     });

    //     if (typeof croppedCanvas === "undefined") {
    //         return;
    //     }
    //     croppedCanvas.toBlob(async (blob: any) => {
    //         // 图片name添加到blob对象里
    //         blob.name = this.state.fileName;
    //         // 创建提交表单数据对象

    //         try {
    //             const formData = new FormData();
    //             formData.append("cover", blob, blob.name);

    //             const config = {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
    //                     Authorization: "Bearer " + UserManager.GetUserToken(),
    //                 },
    //             };

    //             const responseData = await RequestTool.post(GlobalData.apiHost+"/api/livestream/uploadcover", formData, config);

    //             if (responseData === null) {
    //                 //request error
    //                 (window as any).notify("error", "upload error", "error");
    //                 return;
    //             }
    //             if (responseData && responseData.status !== 0) {
    //                 //error
    //                 console.log(responseData.msg);
    //                 (window as any).notify("error", responseData.msg, "error");
    //                 return;
    //             }

    //             //if already uploaded
    //             if (this.state.coverImgUrl) {
    //                 //delete
    //                 const config = {
    //                     headers: {
    //                         Authorization: "Bearer " + UserManager.GetUserToken(),
    //                     },
    //                 };
    //                 await RequestTool.post(
    //                     GlobalData.apiHost+"/api/livestream/deletecover",
    //                     {
    //                         imgName: this.state.coverImgUrl,
    //                     },
    //                     config
    //                 );
    //                 //(window as any).notify("info", "old cover deleted", "info");
    //             }

    //             //success
    //             this.setState({ coverImgUrl: responseData.data.url });
    //             this.props.onCoverUploaded(responseData.data.url);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }, "image/jpeg");
    // }

    // render() {
    //     return (
    //         <div>
    //             <div>
    //                 <div>
    //                     <Cropper
    //                         style={{ width: "300", height: "200" }}
    //                         aspectRatio={1}
    //                         preview=".uploadCrop"
    //                         guides={false}
    //                         src={this.state.src}
    //                         ref={(cropper) => {
    //                             this.cropper = cropper;
    //                         }}
    //                     />
    //                 </div>
    //                 <div>
    //                     <div className="uploadCrop" />
    //                 </div>
    //             </div>
    //             <div>
    //                 <input type="file" title="" accept="image/*" onChange={this.onChange} />
    //                 <input type="button" value="上传" onClick={() => this.uploadImg()} />
    //             </div>
    //         </div>
    //     );
    // }

    renderProcess() {
        return (
            <div>
                <div className="col-10" style={{ margin: "10px auto" }}>
                    <div className="progress-wrapper">
                        <div className="progress-info">
                            <div className="h6 mb-0" style={{ color: "white", fontSize: "13px" }}>
                                {this.state.uploadState}
                            </div>
                            <div className="small font-weight-bold">
                                <span>{this.state.upProcess} %</span>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-primary" style={{ width: this.state.upProcess + "%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Dropzone
                maxFiles={1}
                maxSize={500 * 1024 * 1024}
                multiple={false}
                validator={(file) => {
                    //console.log(file);
                    if (file.size > 500 * 1024 * 1024) {
                        (window as any).notify("error", "File size limit 500MB", "error");
                        return {
                            code: "file size error",
                            message: `File size limit 500MB`,
                        };
                    }
                    return null;
                }}
                onDrop={async (files, fileRejections, e: DropEvent) => {
                    //console.log(files);

                    if (files.length <= 0) {
                        //(window as any).notify("error", "file error", "error");
                        return;
                    }
                    const file = files[0];
                    console.log(file);
                    this.setState({ uploadFile: file, uploadState: "Ready", upProcess: 0 });

                    // const formData = new FormData();
                    // formData.append("video", files[0], files[0].name);

                    // const config = {
                    //     headers: {
                    //         "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
                    //         Authorization: "Bearer " + UserManager.GetUserToken(),
                    //     },
                    // };

                    // const responseData = await RequestTool.post(GlobalData.apiHost+"/api/livestream/uploadvideo", formData, config);

                    // if (responseData === null) {
                    //     //request error
                    //     (window as any).notify("error", "upload error", "error");
                    //     return;
                    // }
                    // if (responseData && responseData.status !== 0) {
                    //     //error
                    //     console.log(responseData.msg);
                    //     (window as any).notify("error", responseData.msg, "error");
                    //     return;
                    // }
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <section className="dropzone">
                        <div className="dz-message" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drop image file here or click to upload.</p>
                            <p>
                                <span className="note">(File size limit:500 MB. Only support MP4)</span>
                            </p>
                        </div>
                        {this.state.uploadFile && (
                            <div className="text-center" style={{ fontSize: "16px", color: "white" }}>
                                <p>File: {`${this.state.uploadFile.name}`}</p>
                                <p>Size: {`${(this.state.uploadFile.size / (1024 * 1024)).toFixed(3)} MB`}</p>
                                <p>Type: {`${this.state.uploadFile.type}`}</p>

                                <div
                                    className="btn btn-primary"
                                    onClick={async () => {
                                        console.log("upload video");
                                        const formData = new FormData();
                                        formData.append("video", this.state.uploadFile, this.state.uploadFile.name);
                                        formData.set("streamId", this.props.liveStreamInfo.id + "");

                                        const config = {
                                            headers: {
                                                "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
                                                Authorization: "Bearer " + UserManager.GetUserToken(),
                                            },
                                            onUploadProgress: (progressEvent: any) => {
                                                let complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                                                console.log(complete + "%");
                                                this.setState({ upProcess: complete, uploadState: "Uploading" });
                                                if (complete >= 100) {
                                                    this.setState({ uploadState: "Transcoding and Upload" });
                                                }
                                            },
                                        };

                                        // let config = {
                                        //     method: "post",
                                        //     url: uploadUrl,
                                        //     data: data,
                                        //     onUploadProgress: (progressEvent) => {
                                        //         let complete =
                                        //             ((progressEvent.loaded / progressEvent.total) *
                                        //                 100) |
                                        //             0;
                                        //         console.log(complete + "%");
                                        //         this.setState({ upProcess: complete });
                                        //     },
                                        // };

                                        const responseData = await RequestTool.post(
                                            GlobalData.apiHost + "/api/livestream/uploadvideo",
                                            formData,
                                            config,
                                            300000
                                        );

                                        if (responseData === null) {
                                            //request error
                                            (window as any).notify("error", "upload error", "error");
                                            this.setState({ uploadState: "Failed" });
                                            return;
                                        }
                                        if (responseData && responseData.status !== 0) {
                                            //error
                                            console.log(responseData.msg);
                                            (window as any).notify("error", responseData.msg, "error");
                                            this.setState({ uploadState: "Failed" });
                                            return;
                                        }
                                        this.setState({ uploadState: "Finish" });
                                        (window as any).notify("success", "Upload finish", "success");
                                    }}
                                >
                                    upload
                                </div>
                                {this.renderProcess()}
                            </div>
                        )}
                    </section>
                )}
            </Dropzone>
        );
    }
}

export default VideoUpload;
