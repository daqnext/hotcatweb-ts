/*
 * @Author: your name
 * @Date: 2021-07-18 17:15:13
 * @LastEditTime: 2021-07-21 08:46:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/Img/Img.tsx
 */
/**
 * Created by wuyakun on 2017/8/11.
 * 会显示默认图片的image
 */
import React from "react";
import defaultCover from "../../assets/avatar.png";
interface Props {
    [key: string]: any;
    src: string;
}

interface State {
    isDefault: boolean;
}
class Image extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isDefault: false,
        };
    }

    handleImageLoaded() {
        //加载完毕
    }

    handleImageErrored() {
        //加载失败
        this.setState({
            isDefault: true,
        });
    }

    render() {
        let props = this.props;
        return (
            <img
                {...props}
                style={{
                    // width: "100%",
                    // height: "100%",
                    ...props.style,
                    backgroundImage: "url(" + require("../../assets/avatar.png") + ")",
                    backgroundSize: "100%",
                }}
                src={this.state.isDefault ? defaultCover : this.props.src}
                //onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
            />
        );
    }
}

export default Image;
