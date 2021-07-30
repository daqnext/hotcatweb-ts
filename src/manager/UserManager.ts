/*
 * @Author: your name
 * @Date: 2021-07-16 15:43:01
 * @LastEditTime: 2021-07-30 14:53:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/manager/usermanager.ts
 */
import axios from "axios";
import { GlobalData } from "../global/global";
import { IUserInfo } from "../interface/interface";

export class UserManager {
    static userInfo:IUserInfo = null;
    static userToken:string = null;

    static GetUserInfo() {
        return UserManager.userInfo;
    }

    static async UpdateUserInfo() {
        //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let response = await axios.get(GlobalData.apiHost+"/api/user/userinfo", {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        });

        if (response.data.status === 0) {
            UserManager.userInfo = response.data.data;
            if (UserManager.userInfo) {
                UserManager.userInfo.avatarUrl=GlobalData.apiHost+"/public/avatar/"+UserManager.userInfo.id
            }
            
            return;
        }

        /////wrong user
        //UserManager.UnsetUserToken();
        //console.log(response.data);
    }

    static CheckUserHasAuth(auth: string) {
        if (UserManager.userInfo===null) {
            return false;
        }
        return UserManager.userInfo.permissionArray.includes(auth);
    }

    static SetUserToken(token: string) {
        localStorage.setItem("hotCatUserToken", token);
    }

    static UnsetUserToken() {
        localStorage.removeItem("hotCatUserToken");
    }

    // static SetUserInfo(info:IUserInfo){
    //     UserManager.userInfo=info
    // }

    static GetUserToken() {
        let result = localStorage.getItem("hotCatUserToken");
        if (result === null) {
            return null;
        }
        return result;
    }
}
