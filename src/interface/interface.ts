/*
 * @Author: your name
 * @Date: 2021-07-16 15:59:57
 * @LastEditTime: 2021-07-16 18:09:03
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
}


export interface IReqResult<T> {
    status: number;
    data?: T;
    msg?: string;
}
