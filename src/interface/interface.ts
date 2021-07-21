/*
 * @Author: your name
 * @Date: 2021-07-16 15:59:57
 * @LastEditTime: 2021-07-20 17:00:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/interface/interface.ts
 */

export interface IUserInfo {
    id: number;
    name: string;
    email: string;
    cookie: string;
    permission: string[];
    created: number;
    avatarUrl:string;
}

export enum ELiveStreamStatus {
    READY = "ready",
    ONLIVE = "onLive",
    END = "end",
    PAUSE = "pause",
}

export interface ILiveStreamInfo{
    id: number;
    name: string;
    subTitle:string;
    description:string;
    userId: number;
    userName: string;
    streamKey?: string;
    liveServerId?:string;
    status: ELiveStreamStatus;
    duration: number; //second
    createTimeStamp: number;
    startTimeStamp: number;
    endTimeStamp: number;
    coverImgUrl:string;
    rtmpLink?: string;
    originM3u8Link?: string;
    cdnM3u8Link?: string;
}

export interface ICategory{
    [key:string]:string[]
}


export interface IReqResult<T> {
    status: number;
    data?: T;
    msg?: string;
}
