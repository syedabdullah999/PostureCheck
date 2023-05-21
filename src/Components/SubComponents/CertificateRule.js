import React, { useState, useEffect, useRef } from 'react';

import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
const CertificateRule = (props) => {
    return (
        <div>
            <Input
                value={props.body?.rule_value}
                onChange={(val) => props.handleInputCertificateName(val,props.index, props.iteration)}
                allowClear
                onClear={(val) => props.handleInputCertificateName(val, props.index, props.iteration)}
                placeholder="Enter Version Number (x.xx.xxxxx)"
                style={{ marginLeft: "10px", width: "100%" }}
            />
            {/* {props.certificateName[1] !== "OR" ?
                <a style={{ marginLeft: "9px" }} className='addRule' onClick={() => props.addNewCertificate("certificate", props.name, props.iteration)}>+ Add Source</a >
                :
                <p style={{ marginLeft: "9px", marginTop: "11px" }} className='addRule'>OR</p>
            }
            {props.certificateName[1] === "OR" &&
                <Input
                    value={props.body?.rule_value}
                    onChange={(val) => props.handleInputCertificateName(val, 2, props.index, props.iteration)}
                    allowClear
                    onClear={(val) => props.handleClearCertificateName(val, 2, props.index, props.iteration)}
                    placeholder="Enter Version Number (x.xx.xxxxx)"
                    style={{ marginLeft: "10px", width: "100%" }}
                />
            } */}
        </div>
    )
}
export default CertificateRule