import React, { Component } from 'react';
const mqtt = require('mqtt')
var client;

const host = 'ws://10.0.0.100:8083/mqtt';
const options = {
  username: 'tzb',
  password: '123456',
  // protocol: 'mqtts',
  // clientId uniquely identifies client
  // choose any string you wish
  protocolId: "MQTT",
  protocolVersion: 4,
  clientId: 'electron-vr-001',
  keepalive: 60,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  rejectUnauthorized: false,
};

export default class mqtt_client extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], myVal: 1 }
  }

  componentDidMount() {
    client = mqtt.connect(host, options);
    if (client) {
      client.on('connect', () => {
        client.subscribe('presence', (err) => {
          if (!err) {
            client.publish('presence', 'Hello mqtt')
          }
        })
        console.log(`${options.clientId} connected mqtt broker!`)
      })

      client.on('message', (topic, message) => {
        console.log(`topic : ${topic}\nmsg   : ${message.toString()}`);
        this.setState({ myVal: this.state.myVal + 1 })
        // message is Buffer
        // client.end();
        let list = this.state.messages;

        list.splice(0, 0, { topic, msg: message.toString(), time: new Date().toLocaleTimeString() })
        this.setState({ messages: list });

      })

      client.on("error", (err) => {
        console.log("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        console.log("Reconnecting...");
      });

    } else {
      console.log(`mqtt init failed!`)
    }
  }

  componentWillUnmount() {
    console.log(`mqtt-cli componentWillUnmount()`)
    if (client?.connected) {
      client.end()
      client = null;
    }
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <h4 className="card-title mb-1">MQTT total: {this.state.myVal}</h4>
              <p className="text-muted mb-1">Message status</p>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="preview-list">
                  {this.state.messages?.map((k, i) => {
                    return (
                      <div key={i} className={i == this.state.messages?.length - 1 ? "preview-item" : "preview-item border-bottom"}>
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">{k.msg}</h6>
                            <p className="text-muted mb-0">topic: {k.topic}</p>
                          </div>
                          <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">{k.time}</p>
                            <p className="text-muted mb-0"></p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}