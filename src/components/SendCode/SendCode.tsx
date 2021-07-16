/*
 * @Author: your name
 * @Date: 2021-07-17 00:08:34
 * @LastEditTime: 2021-07-17 00:54:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/SendCode/SendCode.tsx
 */
import React from "react";
interface Props {
    click: () => Promise<boolean>;
    localStorageKey:string
}

interface State {
    pasttime: any;
}

class SendCode extends React.Component<Props, State> {
    //click: any = null;

    constructor(props: Props) {
        super(props);

        //this.click = props.click;
        this.state = {
            pasttime: 0,
        };

        if (localStorage.getItem(this.props.localStorageKey)!==null) {
            const nowTime=Date.now()
            const timeGap=Math.floor((nowTime-parseInt(localStorage.lastSendTime))/1000)
            console.log(timeGap);
            
            if (timeGap<0) {
                localStorage.setItem(this.props.localStorageKey, "0");
                return
            }
            if (timeGap>0&&timeGap<60) {
                this.state = {
                    pasttime: 60-timeGap,
                };
            }
        }
    }

    triggerTimer() {
        let myinterval = setInterval(() => {
            this.setState({
                pasttime: this.state.pasttime - 1,
            });
            if (this.state.pasttime == 0) {
                clearInterval(myinterval);
            }
        }, 1000);
    }

    startCount() {
        if (this.state.pasttime > 0) {
            return;
        }
        localStorage.setItem(this.props.localStorageKey, Date.now() + "");
        this.setState({ pasttime: 60 });

        this.triggerTimer();
    }

    componentDidMount() {
        if (this.state.pasttime > 0) {
            this.triggerTimer();
        }
    }

    render() {
        if (this.state.pasttime > 0) {
            return (
                <button className="btn btn-light" type="button" disabled>
                    SendAgain:{this.state.pasttime}
                </button>
            );
        } else {
            return (
                <button
                    onClick={async () => {
                        const isSuccess=await this.props.click()
                        if (isSuccess) {
                            this.startCount();
                        }
                    }}
                    className="btn btn-primary"
                    type="button"
                >
                    SendCode
                </button>
            );
        }
    }
}

export default SendCode;
