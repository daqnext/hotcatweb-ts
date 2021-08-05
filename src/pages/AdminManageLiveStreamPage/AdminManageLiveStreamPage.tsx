/*
 * @Author: your name
 * @Date: 2021-07-18 17:36:43
 * @LastEditTime: 2021-08-04 23:12:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/ManageLiveStream/ManageLiveStreamPage.tsx
 */
import React from "react";
import Choices from "choices.js";
import DashboardLayout from "../../layout/DashboardLayout";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable, { ROW_SELECT_MULTIPLE } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { UserManager } from "../../manager/UserManager";
import { RequestTool } from "../../utils/RequestTool";
import { GlobalData } from "../../global/global";
import { ELiveStreamStatus, ILanguage, ILiveStreamInfo } from "../../interface/interface";
import { CategoryManager } from "../../manager/CategoryManager";
import { LanguageOptionManager } from "../../manager/LanguageManager";
import { Confirm } from "../../components/Confirm/Confirm";

// const expandRow = {
//     renderer: (row: any) => {
//         return (
//             <div>
//                 <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
//                 <p>You can render anything here, also you can add additional data on every row object</p>
//                 <p>expandRow.renderer callback will pass the origin row object to you</p>
//             </div>
//         );
//     },
// };

interface Props {}

interface State {
    categoryArray: string[];
    languageOption: ILanguage;
    //admin
    userId: number;
    category: string;
    status: string;
    streamId: number;
    streamName: string;
    region: string;
    language: string;

    showStreamDetail: boolean;
    openStreamInfo: any;

    page: number;
    sizePerPage: number;
    totalSize: number;
    data: any[];
    hoverIndex: number;
}

class ManageLiveStreamPage extends React.Component<Props, State> {
    node: BootstrapTable<any, number> = null;

    columns = [
        {
            dataField: "id",
            text: "ID",
            headerStyle: () => {
                return { width: "5%" };
            },
        },
        {
            dataField: "name",
            text: "Name",
            // headerStyle: () => {
            //     return { width: "17%" };
            // },
        },
        {
            dataField: "userId",
            text: "UserId",
            headerStyle: () => {
                return { width: "5%" };
            },
        },
        {
            dataField: "userName",
            text: "UserName",
            headerStyle: () => {
                return { width: "7%" };
            },
        },
        // {
        //     dataField: "rtmpLink",
        //     text: "RTMP Ingest Url",
        //     headerStyle: () => {
        //         return { width: "40%" };
        //     },
        //     formatter: (cellContent: any, row: any) => {
        //         return (
        //             <>
        //               <span >{ cellContent }</span>
        //               {/* <span>  copy icon</span> */}
        //             </>
        //           );
        //     },
        // },
        {
            dataField: "category",
            text: "Category",
            headerStyle: () => {
                return { width: "7%" };
            },
        },
        {
            dataField: "created",
            text: "Created",
            headerStyle: () => {
                return { width: "14%" };
            },
            formatter: (cellContent: any, row: any) => {
                return moment(row.created).format("lll");
            },
        },
        {
            dataField: "status",
            text: "Status",
            headerStyle: () => {
                return { width: "7%" };
            },
        },
        {
            dataField: "df1",
            isDummyField: true,
            text: "Action",
            headerStyle: () => {
                return { width: "7%" };
            },
            formatter: (cellContent: any, row: ILiveStreamInfo) => {
                if (row.status === ELiveStreamStatus.ONLIVE) {
                    return (
                        <div
                            className="btn btn-warning"
                            onClick={() => {
                                console.log(cellContent);
                                console.log(row);
                                Confirm.ShowConfirm(
                                    "warning",
                                    "Are you sure",
                                    `Do you want to stop this stream? ID:${row.id}`,
                                    true,
                                    "danger",
                                    "primary",
                                    "Confirm",
                                    async () => {
                                        console.log("stop confirm");
                                        const result = await this.stopStream(row.id, row.secret);
                                        if (result) {
                                            //reload
                                            setTimeout(() => {
                                                this.handleTableChange(null,{page:this.state.page,sizePerPage:this.state.sizePerPage})
                                            }, 1500);
                                        }
                                    }
                                );
                            }}
                        >
                            Stop
                        </div>
                    );
                } else if (row.status === ELiveStreamStatus.END) {
                    return (
                        <div
                            className="btn btn-warning"
                            onClick={() => {
                                console.log(cellContent);
                                console.log(row);
                                Confirm.ShowConfirm(
                                    "warning",
                                    "Are you sure",
                                    `Do you want to restart this stream? ID:${row.id}`,
                                    true,
                                    "danger",
                                    "primary",
                                    "Confirm",
                                    async () => {
                                        console.log("delete confirm");
                                        const result = await this.restartStream(row.id, row.secret);
                                        if (result) {
                                            //reload
                                            setTimeout(() => {
                                                this.handleTableChange(null,{page:this.state.page,sizePerPage:this.state.sizePerPage})
                                            }, 1500);
                                        }
                                    }
                                );
                            }}
                        >
                            Restart
                        </div>
                    );
                } else {
                    return <div>-</div>;
                }
            },
        },
        {
            dataField: "df2",
            isDummyField: true,
            text: "Action",
            headerStyle: () => {
                return { width: "7%" };
            },
            formatter: (cellContent: any, row: any) => {
                return (
                    <div
                        className="btn btn-danger"
                        onClick={() => {
                            console.log(cellContent);
                            console.log(row);
                            Confirm.ShowConfirm(
                                "warning",
                                "Are you sure",
                                "Do you confirm? This operation cannot be undone",
                                true,
                                "danger",
                                "primary",
                                "Confirm",
                                async () => {
                                    console.log("delete confirm");
                                    const result = await this.deleteStream(row.id, row.secret);
                                    if (result) {
                                        //reload
                                        setTimeout(() => {
                                            this.handleTableChange(null,{page:this.state.page,sizePerPage:this.state.sizePerPage})
                                        }, 1500);
                                        
                                    }
                                }
                            );
                        }}
                    >
                        Delete
                    </div>
                );
            },
        },
    ];

    constructor(props: Props) {
        super(props);
        this.state = {
            categoryArray: [],
            languageOption: {},

            userId: 0,
            category: "All",
            status: "All",
            streamId: 0,
            streamName: "",
            region: "",
            language: "All",

            showStreamDetail: false,
            openStreamInfo: null,
            page: 1,
            sizePerPage: 10,
            totalSize: 0,
            data: [],
            hoverIndex: null,
        };
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        //UserManager.TokenCheckAndRedirectLogin();
        const info = UserManager.GetUserInfo();
        if (info == null) {
            //show login success msg
            (window as any).notify("success", "Please sign in first", "error");

            //to login page
            window.location.href = "/signin";
            return;
        }

        if (UserManager.CheckUserHasAuth("admin") === false) {
            //to login page
            window.location.href = "/index";
            return;
        }

        const cate = await CategoryManager.GetCategory();
        if (cate.length > 0) {
            this.setState({
                categoryArray: cate,
            });
        }

        const languageOption = await LanguageOptionManager.GetLanguageOption();
        this.setState({ languageOption: languageOption });

        //category
        const category = document.querySelector(".choices-category-admin");
        new Choices(category as any);

        //language
        const language = document.querySelector(".choices-language-admin");
        new Choices(language as any);

        //language
        const status = document.querySelector(".choices-status-admin");
        new Choices(status as any);

        // console.log(this.node);
        // const offset = (this.state.page - 1) * this.state.sizePerPage;
        // await this.getLiveStreamList(this.state.sizePerPage, offset);

        this.setState({ page: 1 });
        this.getLiveStreamList(this.state.sizePerPage, 0);
    }

    async deleteStream(streamId: number, secret: string) {
        const sendData = {
            streamId: streamId,
            secret: secret,
        };

        let response = await RequestTool.post(GlobalData.apiHost + "/api/admin/deletestream", sendData, {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        });

        if (response === null) {
            (window as any).notify("error", "request error", "error");
            return false;
        }

        console.log(response);

        if (response === null) {
            (window as any).notify("error", "request error", "error");
            return false;
        }

        //console.log(response);
        if (response.status !== 0) {
            (window as any).notify("error", response.msg, "error");
            return false;
        }

        if (response.status === 0) {
            (window as any).notify("success", "stream deleted, reload in 2 seconds...", "success");
            return true;
        }

        return false
    }

    async restartStream(streamId: number, secret: string) {
        const sendData = {
            streamId: streamId,
            secret: secret,
        };

        let response = await RequestTool.post(GlobalData.apiHost + "/api/admin/restartstream", sendData, {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        });

        if (response === null) {
            (window as any).notify("error", "request error", "error");
            return false;
        }

        //console.log(response);
        if (response.status !== 0) {
            (window as any).notify("error", response.msg, "error");
            return false;
        }

        if (response.status === 0) {
            (window as any).notify("success", "stream restarted", "success");
            return true;
        }

        return false
    }

    async stopStream(streamId: number, secret: string) {
        const sendData = {
            streamId: streamId,
            secret: secret,
        };

        let response = await RequestTool.post(GlobalData.apiHost + "/api/admin/stopstream", sendData, {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        });

        if (response === null) {
            (window as any).notify("error", "request error", "error");
            return false;
        }

        //console.log(response);
        if (response.status !== 0) {
            (window as any).notify("error", response.msg, "error");
            return false;
        }

        if (response.status === 0) {
            (window as any).notify("success", "stream stopped", "success");
            return true;
        }

        return false
    }

    // streamId:number
    // streamName:string
    // userId:number
    // category:string
    // language:string
    // status:string

    // region:string

    renderForm() {
        const languageNameArray: string[] = [];
        const languageLocalNameArray: string[] = [];
        for (const key in this.state.languageOption) {
            languageNameArray.push(key);
            languageLocalNameArray.push(this.state.languageOption[key]);
        }

        return (
            <form className="row">
                {/* id */}
                <div className="col-4">
                    <label className="form-label text-uppercase">Stream Id</label>
                    <input
                        className="form-control"
                        placeholder="Stream Id"
                        value={this.state.streamId}
                        onChange={(e) => {
                            if (e.target.value === "") {
                                this.setState({ streamId: 0 });
                                return;
                            }
                            let id = parseInt(e.target.value);

                            this.setState({ streamId: id });
                        }}
                    />
                </div>
                {/* title */}
                <div className="col-4">
                    <label className="form-label text-uppercase">Stream Name</label>
                    <input
                        className="form-control"
                        placeholder="Stream name"
                        value={this.state.streamName}
                        onChange={(event) => {
                            this.setState({
                                streamName: event.target.value,
                            });
                        }}
                    />
                </div>
                {/* id */}
                <div className="col-4">
                    <label className="form-label text-uppercase">User Id</label>
                    <input className="form-control" placeholder="User Id" value={this.state.userId} onChange={(e) => {}} />
                </div>
                {/* category */}
                <div className="col-4">
                    <label className="form-label text-uppercase">Category</label>
                    <select
                        className="choices-category-admin"
                        value={this.state.category}
                        onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({ category: event.target.value });
                        }}
                    >
                        <option key={"AllCategory"}>{"All"}</option>
                        {this.state.categoryArray.map((value, index, array) => {
                            return <option key={index}>{value}</option>;
                        })}
                    </select>
                </div>
                {/* language */}
                <div className="col-4">
                    <label className="form-label text-uppercase">Language</label>
                    <select
                        className="choices-language-admin"
                        value={this.state.language}
                        onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({ language: event.target.value });
                        }}
                    >
                        <option key={"AllLanguage"}>{"All"}</option>
                        {languageLocalNameArray.map((value, index, array) => {
                            return (
                                <option key={index} value={languageNameArray[index]}>
                                    {value + " " + languageNameArray[index]}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* status */}
                <div className="col-4">
                    <label className="form-label text-uppercase">Status</label>
                    <select
                        className="choices-status-admin"
                        value={this.state.status}
                        onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({ status: event.target.value });
                        }}
                    >
                        <option key={"AllStatus"}>{"All"}</option>
                        <option key={ELiveStreamStatus.READY}>{ELiveStreamStatus.READY}</option>
                        <option key={ELiveStreamStatus.PAUSE}>{ELiveStreamStatus.PAUSE}</option>
                        <option key={ELiveStreamStatus.ONLIVE}>{ELiveStreamStatus.ONLIVE}</option>
                        <option key={ELiveStreamStatus.END}>{ELiveStreamStatus.END}</option>
                    </select>
                </div>

                <div className="mb-3">
                    <div
                        className="btn btn-primary"
                        style={{ marginTop: "15px" }}
                        onClick={() => {
                            console.log("search");
                            //const offset = (this.state.page - 1) * this.state.sizePerPage;
                            this.setState({ page: 1 });
                            this.getLiveStreamList(this.state.sizePerPage, 0);
                        }}
                    >
                        search
                    </div>
                </div>
            </form>
        );
    }

    rowStyle = (row: any, rowIndex: number) => {
        row.index = rowIndex;
        const style: any = {};
        if (rowIndex % 2 === 0) {
            style.backgroundColor = "transparent";
        } else {
            style.backgroundColor = "rgba(230, 230, 230, .2)";
        }
        // style.borderTop = 'none';
        style.cursor = "pointer";
        if (this.state.hoverIndex === rowIndex) {
            style.backgroundColor = "rgba(230, 230, 230, .5)";
        }

        return style;
    };

    rowEvents = {
        onClick: (e: any, row: any, rowIndex: number) => {
            //console.log(e);
            // console.log(row);
            //console.log(rowIndex);
            //console.log(this.node);

            this.setState({
                showStreamDetail: true,
                openStreamInfo: row,
            });
        },

        onMouseEnter: (e: any, row: any, rowIndex: number) => {
            this.setState({ hoverIndex: rowIndex });
        },
        onMouseLeave: (e: any, row: any, rowIndex: number) => {
            this.setState({ hoverIndex: null });
        },
    };

    handleTableChange = async (type: any, { page, sizePerPage }: { page: number; sizePerPage: number }) => {
        console.log(page, sizePerPage);

        try {
            this.setState({ sizePerPage: sizePerPage, page: page });
            const offset = (page - 1) * sizePerPage;
            await this.getLiveStreamList(sizePerPage, offset);
        } catch (error) {
            console.log(error);
        }
    };

    async getLiveStreamList(limit: number, offset: number) {
        const sendData: any = {
            limit: limit,
            offset: offset,

            // streamId:number,
            // streamName:string
            // userId:number
            // category:string
            // language:string
            // status:string
        };

        if (this.state.streamId !== 0) {
            sendData.streamId = this.state.streamId;
        }
        if (this.state.streamName !== "") {
            sendData.streamName = this.state.streamName;
        }
        if (this.state.userId !== 0) {
            sendData.userId = this.state.userId;
        }
        if (this.state.category !== "All") {
            sendData.category = this.state.category;
        }
        if (this.state.language !== "All") {
            sendData.language = this.state.language;
        }
        if (this.state.status !== "All") {
            sendData.status = this.state.status;
        }

        let response = await RequestTool.post(GlobalData.apiHost + "/api/admin/managelist", sendData, {
            headers: {
                Authorization: "Bearer " + UserManager.GetUserToken(),
            },
        });

        if (response === null) {
            return;
        }

        console.log(response);

        if (response && response.status === 0) {
            const streamData = response.data;
            console.log(streamData);

            this.setState({ totalSize: streamData.count, data: streamData.data });

            return;
        }

        this.setState({ totalSize: 0, data: [] });
    }

    indication() {
        // return something here
        return (
            <>
                <div>Have not any livestreaming</div>
            </>
        );
    }

    render() {
        return (
            <DashboardLayout>
                {this.renderForm()}

                {/* {this.state.showStreamDetail ? (
                    <LiveStreamDetail
                        liveStreamInfo={this.state.openStreamInfo}
                        onBackClick={async () => {
                            const offset = (this.state.page - 1) * this.state.sizePerPage;
                            await this.getLiveStreamList(this.state.sizePerPage, offset);
                            this.setState({
                                showStreamDetail: false,
                                openStreamInfo: null,
                            });
                        }}
                    ></LiveStreamDetail>
                ) : ( */}
                <BootstrapTable
                    bootstrap4
                    ref={(n) => (this.node = n)}
                    remote
                    keyField="id"
                    data={this.state.data}
                    columns={this.columns}
                    bordered={false}
                    rowStyle={this.rowStyle}
                    // expandRow={ expandRow }
                    rowEvents={this.rowEvents}
                    noDataIndication={this.indication}
                    pagination={paginationFactory({
                        page: this.state.page,
                        sizePerPage: this.state.sizePerPage,
                        totalSize: this.state.totalSize,
                    })}
                    onTableChange={this.handleTableChange}
                />
                {/* )} */}
            </DashboardLayout>
        );
    }
}

export default ManageLiveStreamPage;
