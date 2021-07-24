/*
 * @Author: your name
 * @Date: 2021-07-16 15:59:57
 * @LastEditTime: 2021-07-23 11:29:35
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
    category:string;
    language:string;
    description:string;
    userId: number;
    userName: string;
    region:string;
    secret?: string;
    status: ELiveStreamStatus;
    duration: number; //second
    createTimeStamp: number;
    startTimeStamp: number;
    endTimeStamp: number;
    coverImgUrl:string;
    watched:number;
    rtmpLink?: string;
    originLiveM3u8Link?: string;
    cdnLiveM3u8Link?: string;
    originRecordM3u8Link?: string;
    cdnRecordM3u8Link?: string;
}

export interface ICategory{
    [key:string]:string[]
}

export interface ILanguage{
    [key:string]:string
}


export interface IReqResult<T> {
    status: number;
    data?: T;
    msg?: string;
}
