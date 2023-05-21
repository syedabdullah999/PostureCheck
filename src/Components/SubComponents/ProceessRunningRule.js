import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
const processRunningRule = (props) => {
    return (
        <div>
            <Input
                value={props.processName[0]}
                onChange={(val) => props.handleInputProcessRunning(val, 0)}
                allowClear
                onClear={(val) => props.handleClearProcessRunning(val, 0)}
                placeholder="Enter Version Number (x.xx.xxxxx)"
                style={{ marginLeft: "10px", width: "100%" }}
            />
            {props.processName[1] !== "AND" ?
                <a style={{ marginLeft: "9px" }} className='addRule' onClick={() => props.addNewProcess(1)}>+ Add Source</a >
                :
                <p style={{ marginLeft: "9px", marginTop: "11px" }} className='addRule'>AND</p>
            }
            {props.processName[1] === "AND" &&
                <Input
                    value={props.processName[2]}
                    onChange={(val) => props.handleInputProcessRunning(val, 2)}
                    allowClear
                    onClear={(val) => props.handleClearProcessRunning(val, 2)}
                    placeholder="Enter Version Number (x.xx.xxxxx)"
                    style={{ marginLeft: "10px", width: "100%" }}
                />
            }
            {props.processName[3] !== "AND" ?
                props.processName[1] === "AND" &&
                <a style={{ marginLeft: "9px" }} className='addRule' onClick={() => props.addNewProcess(3)}>+ Add Source</a >
                :
                <p style={{ marginLeft: "9px", marginTop: "11px" }} className='addRule'>AND</p>
            }
            {props.processName[3] === "AND" &&
                <Input
                    value={props.processName[4]}
                    onChange={(val) => props.handleInputProcessRunning(val, 4)}
                    allowClear
                    onClear={(val) => props.handleClearProcessRunning(val, 4)}
                    placeholder="Enter Version Number (x.xx.xxxxx)"
                    style={{ marginLeft: "10px", width: "100%" }}
                />
            }
            {props.processName[5] !== "AND" ?
                props.processName[3] === "AND" &&
                <a style={{ marginLeft: "9px" }} className='addRule' onClick={() => props.addNewProcess(5)}>+ Add Source</a >
                :
                <p style={{ marginLeft: "9px", marginTop: "11px" }} className='addRule'>AND</p>
            }
            {props.processName[5] === "AND" &&
                <Input
                    value={props.processName[6]}
                    onChange={(val) => props.handleInputProcessRunning(val, 6)}
                    allowClear
                    onClear={(val) => props.handleClearProcessRunning(val, 6)}
                    placeholder="Enter Version Number (x.xx.xxxxx)"
                    style={{ marginLeft: "10px", width: "100%" }}
                />
            }
            {props.processName[7] !== "AND" ?
                props.processName[5] === "AND" &&
                <a style={{ marginLeft: "9px" }} className='addRule' onClick={() => props.addNewProcess(7)}>+ Add Source</a >
                :
                <p style={{ marginLeft: "9px", marginTop: "11px" }} className='addRule'>AND</p>
            }
            {props.processName[7] === "AND" &&
                <Input
                    value={props.processName[8]}
                    onChange={(val) => props.handleInputProcessRunning(val, 8)}
                    allowClear
                    onClear={(val) => props.handleClearProcessRunning(val, 8)}
                    placeholder="Enter Version Number (x.xx.xxxxx)"
                    style={{ marginLeft: "10px", width: "100%" }}
                />
            }
        </div>
    )
}
export default processRunningRule
