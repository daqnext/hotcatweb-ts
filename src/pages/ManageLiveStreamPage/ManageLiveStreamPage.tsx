/*
 * @Author: your name
 * @Date: 2021-07-18 17:36:43
 * @LastEditTime: 2021-07-20 12:08:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/pages/ManageLiveStream/ManageLiveStreamPage.tsx
 */
import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable, { ROW_SELECT_MULTIPLE } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from 'moment'
import { UserManager } from "../../manager/UserManager";
import LiveStreamDetail from "./LiveStreamDetail";

const products: any[] = [
    // { id: 300, streamName: "myStream", category: "Sports", created: 1626706861681, status: "OnLive" },
];
const columns = [
    {
        dataField: "id",
        text: "Product ID",
    },
    {
        dataField: "streamName",
        text: "Name",
    },
    {
        dataField: "category",
        text: "Category",
    },
    {
        dataField: "created",
        text: "Created",
        formatter: (cellContent: any, row: any) => {
            return (
                moment(row.created).format("lll")
            );
        },
    },
    {
        dataField: "status",
        text: "Status",
    },
    // {
    //     dataField: "df1",
    //     isDummyField: true,
    //     text: "Action 1",
    //     formatter: (cellContent: any, row: any) => {
    //         return (
    //             <div
    //                 className="btn btn-primary"
    //                 onClick={() => {
    //                     console.log(cellContent);
    //                     console.log(row);
    //                 }}
    //             >
    //                 SomeAction
    //             </div>
    //         );
    //     },
    // },
];

const expandRow = {
    renderer: (row:any) => {
        return (<div>
            <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
            <p>
                You can render anything here, also you can add additional data on every row object
            </p>
            <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>);
    },
};


interface Props {}

interface State {
    showStreamDetail:boolean;
    openStreamInfo:any;

    page:number;
    sizePerPage:number;
    totalSize:number;
    data:any[]
    hoverIndex:number
    
}

class ManageLiveStreamPage extends React.Component<Props, State> {
    node: BootstrapTable<any, number> = null;

    constructor(props: Props) {
        super(props);
        this.state={
            showStreamDetail:false,
            openStreamInfo:null,
            page:1,
            sizePerPage:10,
            totalSize:0,
            data:[],
            hoverIndex:null
        }

        
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        //UserManager.TokenCheckAndRedirectLogin();
        const info=UserManager.GetUserInfo()
        if (info==null) {
            //show login success msg
            (window as any).notify("success", "Please sign in first", "error");

            //to login page
            window.location.href = "/signin";
            return
        }

        
        for (let i = 0; i < 5; i++) {
            products.push({
                id: i + 1,
                streamName: "myStream" + i,
                category: "Sports",
                created: 1626706861681,
                status: "OnLive",
                coverImgUrl:"/public/livestreamCover/4/123456_i6TYKaDfI9.jpeg"
            });
        }
        this.setState({data:products,totalSize:products.length})
        
        console.log(this.node);
        await this.getLiveStreamList(0,0);
    }

    rowStyle = (row:any, rowIndex:number) => {
        row.index = rowIndex;
        const style:any = {};
        if (rowIndex % 2 === 0) {
          style.backgroundColor = 'transparent';
        } else {
          style.backgroundColor = 'rgba(230, 230, 230, .2)';
        }
        // style.borderTop = 'none';
        style.cursor="pointer"
        if (this.state.hoverIndex===rowIndex) {
            style.backgroundColor = 'rgba(230, 230, 230, .5)';
        }
    
        return style;
      }

      rowEvents = {
        onClick: (e:any, row:any, rowIndex:number) => {
          //console.log(e);
          console.log(row);
          //console.log(rowIndex);
          //console.log(this.node);
          
          this.setState({
              showStreamDetail:true,
              openStreamInfo:row
          })
          
        },

        onMouseEnter: (e:any, row:any, rowIndex:number) => {
            this.setState({ hoverIndex: rowIndex });
        },
        onMouseLeave: (e:any, row:any, rowIndex:number) => {
            this.setState({ hoverIndex: null });
        }
      };

      

    handleTableChange=async (type:any,{page,sizePerPage}:{page:number,sizePerPage:number})=>{
        console.log(page,sizePerPage);
        
        try {
            this.setState({sizePerPage:sizePerPage})
            const offset = (page - 1) * sizePerPage;
        await this.getLiveStreamList(sizePerPage,offset)
        } catch (error) {
            console.log(error);
            
        }
        
    }

    async getLiveStreamList(limit:number,offset:number) {
        console.log(1);
        return 1
    }

    indication() {
        // return something here
        return (
            <>
                <div>You have no any livestreaming</div>
                <a className="btn btn-primary" href="/newlivestream">
                    New Livestreaming
                </a>
            </>
        );
    }

    render() {
        return (
            <DashboardLayout>
                {this.state.showStreamDetail?<LiveStreamDetail
                liveStreamInfo={this.state.openStreamInfo}
                onBackClick={()=>{
                    this.setState({
                        showStreamDetail:false,
                        openStreamInfo:null
                    })
                }}
                ></LiveStreamDetail>:
                <BootstrapTable
                    ref={(n) => (this.node = n)}
                    remote
                    keyField="id"
                    data={this.state.data}
                    columns={columns}
                    bordered={false}
                    rowStyle={ this.rowStyle }
                    // expandRow={ expandRow }
                    rowEvents={ this.rowEvents }
                    noDataIndication={this.indication}
                    pagination={paginationFactory({page:this.state.page,sizePerPage:this.state.sizePerPage,totalSize:this.state.totalSize})}
                    onTableChange={this.handleTableChange}
                />}
            </DashboardLayout>
        );
    }
}

export default ManageLiveStreamPage;
