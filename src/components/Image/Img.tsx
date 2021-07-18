/*
 * @Author: your name
 * @Date: 2021-07-18 17:15:13
 * @LastEditTime: 2021-07-18 17:23:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/Img/Img.tsx
 */
/**
 * Created by wuyakun on 2017/8/11.
 * 会显示默认图片的image
 */
 import React from 'react';
 interface Props {
     [key:string]:any
     src:string
 }

 interface State {
     src:string
 }
 class Image extends React.Component<Props,State> {
 
     constructor(props:Props) {
         super(props);
         this.state = {
             src: this.props.src ? this.props.src : process.env.PUBLIC_URL+'/img/avatar.png',
         }
     }
 
     handleImageLoaded() {
         //加载完毕
     }
 
     handleImageErrored() {
         //加载失败
         this.setState({
             src: process.env.PUBLIC_URL+'/img/avatar.png'
         });
     }
 
     render() {
         let props = this.props;
         let {src} = this.state;
         return (
             <img
                 {...props}
                 src={src}
                 onLoad={this.handleImageLoaded.bind(this)}
                 onError={this.handleImageErrored.bind(this)}
             />
         );
     }
 }
 
 export default Image;
 