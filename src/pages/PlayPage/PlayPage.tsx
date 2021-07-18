/*
 * @Author: your name
 * @Date: 2021-07-18 17:42:28
 * @LastEditTime: 2021-07-18 21:08:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/PlayPage/PlayPage.tsx
 */

import React from "react";
import { GlobalData } from "../../global/global";
import { ILiveStreamInfo } from "../../interface/interface";
import DashboardLayout from "../../layout/DashboardLayout";
import { RequestTool } from "../../utils/RequestTool";

interface Props {}

interface State {
    liveStreamInfo:ILiveStreamInfo
}


class PlayPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state={
            liveStreamInfo:null
        }
    }

    getQueryVariable(variable:string) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == variable) {
            return pair[1];
          }
        }
        return false;
      }

    async componentDidMount(){
        const liveStreamId = this.getQueryVariable("id")
        if (liveStreamId===false) {
            //show error
            return
        }
        const id=parseInt(liveStreamId)
        if (isNaN(id)) {
            //show error
            return
        }

        this.getLiveStream(id)

        
    }

    async getLiveStream(id:number){
        const url = GlobalData.apiHost + "/api/livestream/get";
        const sendData = {
            id:id
        };
        const responseData = await RequestTool.post<ILiveStreamInfo>(url, sendData);
        if (responseData === null) {
            //request error
            (window as any).notify("error", "program error", "error");
            return;
        }
        if (responseData && responseData.status !== 0) {
            //error
            console.log(responseData.msg);
            (window as any).notify("error", responseData.msg, "error");
            return;
        }

        this.setState({liveStreamInfo:responseData.data})

        
    }

    render() {
        return (
            <DashboardLayout>
                PlayPage
            </DashboardLayout>
        );
    }
}

export default PlayPage;