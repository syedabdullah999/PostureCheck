import React, { useState, useEffect, useRef } from 'react';

import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
const CertificateRule = (props) => {
    useEffect(() => {
        let a = props
        debugger
    }, [])
    return (
        <>
            <div className='d-flex' style={{ width: "100%" }}>
                <Select
                    style={{ width: 150 }}
                    options={[{ value: ">=", label: ">=" }, { value: ">", label: ">" }, { value: "=", label: "=" }]}
                    onChange={(val) => props.onChangeOSVOperator(val, props.name, props.index, props.iteration)}
                    value={props.body.rule_operator}
                />
                <Input
                    value={props.body?.rule_value}
                    onChange={(val) => props.handleInputVersionNumber(val, props.index, props.iteration)}
                    allowClear
                    onClear={(val) => props.handleClearVersionNumber(val, props.index, props.iteration)}
                    placeholder="Enter Version Number (x.xx.xxxxx)"
                    style={{ marginLeft: "10px", width: "100%" }}
                />
            </div>
        </>
    )
}
export default CertificateRule