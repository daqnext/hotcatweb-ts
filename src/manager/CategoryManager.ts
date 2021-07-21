/*
 * @Author: your name
 * @Date: 2021-07-20 11:09:25
 * @LastEditTime: 2021-07-20 11:44:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/manager/CategoryManager.ts
 */

import axios from "axios";
import { ICategory } from "../interface/interface";

export class CategoryManager {
    static category: ICategory = null;
    static categoryArray:string[]=[]

    static async GetCategory() {
        if (CategoryManager.category === null) {
            let response = await axios.get("/api/getcategory");
            if (response === null || response.data.status !== 0) {
                return ["Crypto", "Games", "Sports", "Technology"]
            }
            CategoryManager.category = response.data.data;
            CategoryManager.categoryArray=[]
            for (const key in CategoryManager.category) {
                CategoryManager.categoryArray.push(key)
            }
        }
        return CategoryManager.categoryArray;
    }
}
