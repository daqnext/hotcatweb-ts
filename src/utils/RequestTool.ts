/*
 * @Author: your name
 * @Date: 2021-07-16 17:06:12
 * @LastEditTime: 2021-07-16 17:11:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/utils/requestTool.ts
 */

import axios, { AxiosResponse,AxiosRequestConfig } from "axios";
import { IReqResult } from "../interface/interface";


export class RequestTool {
    static async get<T=any>(url: string,requestConfig?:AxiosRequestConfig,requestTimeout:number=8000,) {
        return this.send<T>(url, {}, "GET",requestConfig,requestTimeout);
    }

    static async post<T=any>(url: string, data: any,requestConfig?:AxiosRequestConfig,requestTimeout:number=8000) {
        return this.send<T>(url, data, "POST",requestConfig,requestTimeout);
    }

    static async send<T>(url: string, data = {}, type: "POST" | "GET" | "PUT" | "DELETE" = "GET",requestConfig?:AxiosRequestConfig,requestTimeout:number=8000) {
        let promise: Promise<AxiosResponse<IReqResult<T>>> = null;
        switch (type) {
            case "GET":
                promise = axios.get(url, requestConfig);
                break;
            case "POST":
                promise = axios.post(url, data,requestConfig);
                break;
            case "PUT":
                promise = axios.put(url, data,requestConfig);
                break;
            case "DELETE":
                promise = axios.delete(url,requestConfig);
                break;
        }

        const timeout = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("request time out");
            }, requestTimeout);
        });

        const requestPromise = new Promise((resolve, reject) => {
            promise
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    //console.log(error);
                    reject(error);
                });
        });

        try {
            const result = await Promise.race([requestPromise, timeout]);
            return result as IReqResult<T>;
        } catch (error) {
            console.log(error);
            // message.error(error.toString());
            return null;
        }
    }
}