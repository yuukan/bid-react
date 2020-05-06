import React from "react";
import { Uppload, es, Local, xhrUploader } from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";


const uppload = new Uppload({
    lang: es,
    defaultService: "local",
    uploader: xhrUploader({
        endpoint: "https://example.com/upload"
    })
});

uppload.use([new Local()]);

export default class UpploadReact extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false
        };
    }
    open() {
        uppload.on("upload", url => {
            this.setState({ url });
        });
        uppload.open();
    }
    render() {
        return (
            <div>
                <button onClick={this.open.bind(this)}>Seleccione Archivo</button>
            </div>
        );
    }
}