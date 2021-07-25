/*
 * @Author: your name
 * @Date: 2021-07-23 11:07:07
 * @LastEditTime: 2021-07-25 18:41:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/manager/LanguageManager.ts
 */

import axios from "axios";
import { GlobalData } from "../global/global";
import {  ILanguage } from "../interface/interface";

export class LanguageOptionManager {
    static languageOption: ILanguage = null;

    static async GetLanguageOption() {
        if (LanguageOptionManager.languageOption === null) {
            let response = await axios.get(GlobalData.apiHost+"/api/getlanguage");
            if (response === null || response.data.status !== 0) {
                return {
                    "English": "English",
                    "Japanese": "日本語",
                    "Korean": "한국어",
                    "Spanish": "Español",
                    "Russian": "русский"
                }
            }
            LanguageOptionManager.languageOption = response.data.data;
        }
        return LanguageOptionManager.languageOption;
    }
}