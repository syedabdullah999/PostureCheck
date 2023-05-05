import React, { useState, useEffect, useRef } from 'react';
import { DownloadOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
const { Option } = Select;
const OsProfileView = (props) => {
    const [rules, setRules] = useState([])
    const [options, setOptions] = useState([
        { value: 'Operating System Version', label: 'Operating System Version', visble: true },
        { value: 'Certificate', label: 'Certificate', visble: true },
        { value: 'Disk Encryption', label: 'Disk Encryption', visble: true },
        { value: 'Anti-virus', label: 'Anti-virus', visble: true },
        { value: 'File Exists', label: 'File Exists', visble: true },
    ]);
    useEffect(() => {
        // setRules([...rules, "Operating System Version"])
    }, [])
    function handleSelect(value, option) {
        // const newOptions = options.filter((item) => item.value !== value);
        // setOptions(newOptions);
        // const index = options.findIndex((option) => option.value === value);
        setRules([...rules, value])
        const newOptions = options.map((option) => ({
            ...option,
            visble: option.value === value ? false : true,
          }));
          
          setOptions(newOptions);
        // const newOptions = options.map((item,ind) => item.value === value);
    }

    return (
        <div >
            <Card style={{ width: "80%", borderLeftColor: "rgb(146 194 255)", borderLeftWidth: "4px", marginBottom: "33px", marginLeft: "117px" }}>
                <div className="row">
                    <div className="col-sm-6">
                        <p>{props.name}</p>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-end">
                        <DeleteOutlined />
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-sm-3">
                    <p className='header1'>Select and Define Rules*</p>
                        <Select
                            onChange={handleSelect}
                            style={{ width: "100%" }}
                            placeholder="Select rule type"
                        // options={[{ value: "OperatingSystemVersion", label: "Operating System Version" }, { value: "AntiVirus", label: "Anti Virus" }]}
                        >
                            {options.map((option) => (
                                option.visble === true &&
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="col-sm-9">

                    </div>
                </div>
                    <div style={{marginTop:"20px"}}></div>
                    <hr />
                    <a className=''>abc</a>

            </Card>
        </div>
    )
}

export default OsProfileView