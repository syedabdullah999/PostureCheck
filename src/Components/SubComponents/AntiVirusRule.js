import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
const AntiVirusRule = (props) => {
    const [options, setOptions] = useState([
        { value: 'avast', label: 'Avast', visble: true },
        { value: 'kaspersky', label: 'Kaspersky', visble: true },

    ]);
    return (
        <>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={props.handleChange}
                options={options}
            />
        </>
    )
}
export default AntiVirusRule
