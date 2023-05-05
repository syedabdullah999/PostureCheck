import React, { useState, useEffect, useRef } from 'react';

import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
const CertificateRule = (props) => {
    return (
        <>
            <div className='d-flex' style={{ width: "100%" }}>
                <Select
                    style={{ width: 150 }}
                    options={[{ value: ">=", label: ">=" }, { value: ">", label: ">" }, { value: "=", label: "=" }]}
                />
                <Input
                    value={props.versionNumber}
                    onChange={props.handleInputVersionNumber}
                    allowClear
                    onClear={props.handleClearVersionNumber}
                    placeholder="Enter Version Number (x.xx.xxxxx)"
                    style={{ marginLeft: "10px", width: "100%" }}
                />
            </div>
        </>
    )
}
export default CertificateRule