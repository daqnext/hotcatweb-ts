/*
 * @Author: your name
 * @Date: 2021-07-16 17:01:26
 * @LastEditTime: 2021-07-25 10:21:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/manager/Utils.ts
 */

import { GlobalData } from "../global/global";
import { RequestTool } from "./RequestTool";

export class Utils {
    static checkUserNameFormat(userNameInput:string){
        const reg = /^[A-Za-z0-9]+$/;
        const pattern = new RegExp(reg);
        if (!pattern.test(userNameInput)) {
            return false;
        }
        return true;
    }

    static checkEmailFormat(emailInput: string) {
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const pattern = new RegExp(reg);
        if (!pattern.test(emailInput)) {
            return false;
        }
        return true;
    }

    static checkVCodeFormat(vCodeInput: string) {
        const reg = /^[A-Za-z0-9]+$/;
        const pattern = new RegExp(reg);
        if (!pattern.test(vCodeInput)) {
            return false;
        }
        return true;
    }

    static async getCaptcha(): Promise<{ captchaBase64: string; captchaId: string }> {
        const url = GlobalData.apiHost + "/api/getcaptcha";
        const responseData = await RequestTool.get<{ id: string; base64: string }>(url);
        if (responseData && responseData.status === 0) {
            return { captchaBase64: responseData.data.base64, captchaId: responseData.data.id };
        }
        return null;
    }

    static loadScript(src:string) {
        return new Promise(resolve => {
          let tag = document.createElement("script")
          tag.async = true
          tag.src = src
      
          document.body.appendChild(tag)
      
          tag.addEventListener("load", function() {
            resolve(null)
          })
        })
      }

      static async IsRemoteFileAvailable(url:string){
        const response =await RequestTool.get(url)
        if (response) {
            return true
        }
        return false
      }
}
