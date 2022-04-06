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

        list.push({ topic, msg: message.toString(), time: new Date().toLocaleTimeString() })
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
        <h1>{this.state.myVal}</h1>
        {this.state.list?.map((k, i) => {
          return (<div key={i}>
            <p>topic:{k.topic} time={k.time}</p>
            <p>{k.msg}</p>
          </div>)
        })}
      </div>
    );
  }
}