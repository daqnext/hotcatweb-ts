/*
 * @Author: your name
 * @Date: 2021-07-20 13:03:21
 * @LastEditTime: 2021-07-20 14:14:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hotcatweb2-ts/src/components/Confirm/Confirm.tsx
 */

import ReactDOM from "react-dom";
import SweetAlert from "react-bootstrap-sweetalert";

export class Confirm {
    static windowStack: HTMLElement[] = [];

    static ShowConfirm(
        type: "success" | "warning",
        title:string="Are you sure",
        message:string="",
        showCancel: boolean = true,
        confirmBtnBsStyle:"primary"|"danger"|"warning"|"success" ="primary",
        cancelBtnBsStyle:"primary"|"danger"|"warning"|"success" ="primary",
        confirmText: string = "Confirm",
        onConfirm: () => void = null,
        onCancel: () => void = null
    ) {
        const element = document.createElement("div");
        const view = (
            <SweetAlert
                warning={type === "warning"}
                success={type === "success"}
                showCancel={showCancel}
                confirmBtnText={confirmText}
                confirmBtnBsStyle={confirmBtnBsStyle}
                cancelBtnBsStyle={cancelBtnBsStyle}
                title={title}
                onConfirm={() => {
                    if (onConfirm) {
                        onConfirm();
                    }
                    const index = this.windowStack.indexOf(element);
                    this.windowStack.splice(index, 1);
                    document.body.removeChild(element);
                }}
                onCancel={() => {
                    if (onCancel) {
                        onCancel();
                    }
                    const index = this.windowStack.indexOf(element);
                    this.windowStack.splice(index, 1);
                    document.body.removeChild(element);
                }}
                reverseButtons
                // focusCancelBtn
            >
                {message}
            </SweetAlert>
        );
        ReactDOM.render(view, element);
        document.body.appendChild(element);
        this.windowStack.push(element);
    }
}
