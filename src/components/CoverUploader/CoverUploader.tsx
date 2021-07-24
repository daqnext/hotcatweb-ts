/*
 * @Author: your name
 * @Date: 2021-07-20 10:47:36
 * @LastEditTime: 2021-07-24 23:45:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/CoverUploader/CoverUploader.tsx
 */
import React from "react";
import Dropzone from "react-dropzone";
import { UserManager } from "../../manager/UserManager";
import { RequestTool } from "../../utils/RequestTool";

interface Props {
    onCoverUploaded: (newUrl: string) => void;
    oldCoverImgUrl: string;
}
interface State {
    coverImgUrl: string;
}

class CoverUploader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            coverImgUrl: this.props.oldCoverImgUrl,
        };
    }
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
                onDrop={async (files) => {
                    console.log(files);
                    if (files.length <= 0) {
                        //(window as any).notify("error", "file error", "error");
                        return;
                    }

                    const image = new Image();
                    image.addEventListener("load", async () => {
                        console.log(`${image.width}x${image.height}`);
                        if (image.width>1) {
                            (window as any).notify("error", "image width error", "error");
                            return
                        }
                        
                        const formData = new FormData();
                    formData.append("cover", files[0], files[0].name);

                    const config = {
                        headers: {
                            "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
                            Authorization: "Bearer " + UserManager.GetUserToken(),
                        },
                    };

                    const responseData = await RequestTool.post("/api/livestream/uploadcover", formData, config);

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
                    this.props.onCoverUploaded(responseData.data.url);
                    });
                    image.src = URL.createObjectURL(files[0]);
                    
                    
                    
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
                        {this.state.coverImgUrl && this.state.coverImgUrl !== "" && (
                            <div className="text-center">
                                <img className="rounded img-fluid" src={this.state.coverImgUrl} alt={this.state.coverImgUrl} />
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
                                                "/api/livestream/deletecover",
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
