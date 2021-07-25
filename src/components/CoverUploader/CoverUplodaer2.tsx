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

interface Props {
    onCoverUploaded: (newUrl: string) => void;
    oldCoverImgUrl: string;
}
interface State {
    fileName: string;
    src: any;
    coverImgUrl: string;
}

class CoverUploader extends React.Component<Props, State> {
    cropper: Cropper  = null;
    constructor(props: Props) {
        super(props);
        this.state = {
            fileName: "",
            src: "",
            coverImgUrl: this.props.oldCoverImgUrl,
        };
    }

    uploadImg() {
        // if(this.state.src === null) {
        //     alert("请选择图片");
        //     return false;
        // }

        console.log(this.cropper);
        
        const croppedCanvas = this.cropper.getCroppedCanvas({
            minWidth: 160,
            minHeight: 90,
            width: 640,
            height: 360,
            maxWidth: 640,
            maxHeight: 360,
        });

        if (typeof croppedCanvas === "undefined") {
            return;
        }
        croppedCanvas.toBlob(async (blob: any) => {
            // 图片name添加到blob对象里
            blob.name = this.state.fileName;
            // 创建提交表单数据对象

            try {
                const formData = new FormData();
                formData.append("cover", blob, blob.name);

                
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
                        Authorization: "Bearer " + UserManager.GetUserToken(),
                    },
                };

                const responseData = await RequestTool.post(GlobalData.apiHost+"/api/livestream/uploadcover", formData, config);

                if (responseData === null) {
                    //request error
                    (window as any).notify("error", "upload error", "error");
                    return;
                }
                if (responseData && responseData.status !== 0) {
                    //error
                    console.log(responseData.msg);
                    (window as any).notify("error", responseData.msg, "error");
                    return;
                }

                //if already uploaded
                if (this.state.coverImgUrl) {
                    //delete
                    const config = {
                        headers: {
                            Authorization: "Bearer " + UserManager.GetUserToken(),
                        },
                    };
                    await RequestTool.post(
                        GlobalData.apiHost+"/api/livestream/deletecover",
                        {
                            imgName: this.state.coverImgUrl,
                        },
                        config
                    );
                    //(window as any).notify("info", "old cover deleted", "info");
                }

                //success
                this.setState({ coverImgUrl: responseData.data.url });
                this.props.onCoverUploaded(responseData.data.url);
            } catch (err) {
                console.log(err);
            }
        }, "image/jpeg");
    }

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

    render() {
        return (
            <Dropzone
                accept="image/*"
                maxFiles={1}
                maxSize={500 * 1024}
                multiple={false}
                validator={(file) => {
                    //console.log(file);
                    if (file.size > 500 * 1024) {
                        (window as any).notify("error", "File size limit 500KB", "error");
                        return {
                            code: "file size error",
                            message: `File size limit 500KB`,
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
                    

                    if (file.size > 500 * 1024) {
                        (window as any).notify("error", "File size limit 500KB", "error");
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                        this.setState({
                            src: reader.result,
                            fileName:file.name,
                        });
                    };
                    reader.readAsDataURL(file);
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <section className="dropzone">
                        <div className="dz-message" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drop image file here or click to upload.</p>
                            <p>
                                <span className="note">(file size limit:500 KB, Max width:640, Max height:360)</span>
                            </p>
                        </div>
                        <div>
                            <div>
                                <Cropper
                                    style={{ width: "640", height: "360" }}
                                    aspectRatio={16 / 9}
                                    preview=".uploadCrop"
                                    guides={false}
                                    viewMode={1}
                                    src={this.state.src}
                                    // ref={(cropper) => {
                                    //     this.cropper = cropper;
                                    // }}
                                    onInitialized={(instance)=>{
                                        this.cropper=instance
                                    }}
                                />
                                {this.state.fileName!==""&&
                                <div className="text-center">
                                    <div
                                        className="btn btn-primary"
                                        onClick={() => {
                                            this.uploadImg()
                                        }}
                                    >
                                        upload
                                    </div>
                                </div>}
                            </div>

                            <div>
                                <div className="uploadCrop"></div>
                            </div>
                        </div>

                        {this.state.coverImgUrl && this.state.coverImgUrl !== "" && (
                            <div className="text-center">
                                <img className="rounded img-fluid" src={GlobalData.apiHost+this.state.coverImgUrl} alt={GlobalData.apiHost+this.state.coverImgUrl} />
                                <a
                                    href="#"
                                    style={{ display: "block" }}
                                    onClick={async () => {
                                        if (this.state.coverImgUrl) {
                                            //delete
                                            const config = {
                                                headers: {
                                                    Authorization: "Bearer " + UserManager.GetUserToken(),
                                                },
                                            };
                                            await RequestTool.post(
                                                GlobalData.apiHost+"/api/livestream/deletecover",
                                                {
                                                    imgName: this.state.coverImgUrl,
                                                },
                                                config
                                            );
                                            this.setState({ coverImgUrl: "" });
                                            (window as any).notify("info", "old cover deleted", "info");
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
        );
    }
}

export default CoverUploader;
