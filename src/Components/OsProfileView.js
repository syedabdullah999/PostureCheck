import React, { useState, useEffect, useRef } from 'react';
import { DownloadOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import './../App.css';

import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
const { Option } = Select;
const OsProfileView = (props) => {
    const [rules, setRules] = useState([])
    const [newrule, setNewRule] = useState([""])
    const [versionNumber, setVersionNumber] = useState('');
    const [options, setOptions] = useState([
        { value: 'operatingSystemVersion', label: 'Operating System Version', visble: true },
        { value: 'certificate', label: 'Certificate', visble: true },
        { value: 'diskEncryption', label: 'Disk Encryption', visble: true },
        { value: 'antiVirus', label: 'Anti-virus', visble: true },
        { value: 'fileExists', label: 'File Exists', visble: true },
    ]);
    useEffect(() => {
        // setRules([...rules, "Operating System Version"])
    }, [])
    function handleSelect(value, index) {
        // const newOptions = options.filter((item) => item.value !== value);
        // setOptions(newOptions);
        // const index = options.findIndex((option) => option.value === value);
        setRules([...rules, value])
        const newOptions = options.map((option) => ({
            ...option,
            // visble: option.value === value ? false : true,
            visble: option.value === value ? false : option.visble,
        }));
        let ruleSet = newrule
        ruleSet[index] = value
        setNewRule([...ruleSet])
        setOptions(newOptions);
        // const newOptions = options.map((item,ind) => item.value === value);
    }

    const addNewRule = () => {
        setNewRule([...newrule, ""])
    }
    const handleInputVersionNumber = (event) => {
        setVersionNumber(event.target.value);
      };
    
      const handleClearVersionNumber = () => {
        setVersionNumber('');
      };

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
                <p className='header1'>Select and Define Rules*</p>
                {newrule.map((val, index) => {
                    return (
                        <div className="row">
                            <div className="col-sm-4">
                                <Select
                                    onChange={(event) => handleSelect(event, index)}
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
                            <div className="col-sm-8 d-flex">
                                <div className={val === "" ? "" : 'col-sm-10 d-flex'}>
                                    {val === "operatingSystemVersion" &&
                                        <div className='d-flex' style={{width:"100%"}}>
                                            <Select
                                                style={{ width: 150 }}
                                                options={[{ value: ">=", label: ">=" }, { value: ">", label: ">" }, { value: "=", label: "=" }]}
                                            />
                                            <Input
                                                value={versionNumber}
                                                onChange={handleInputVersionNumber}
                                                allowClear
                                                onClear={handleClearVersionNumber}
                                                placeholder="Enter Version Number (x.xx.xxxxx)"
                                                style={{marginLeft:"10px", width: "100%"}}
                                            />
                                        </div>
                                    }
                                    {val === "fileExists" &&
                                        <div></div>
                                    }
                                    {val === "diskEncryption" &&
                                        <div></div>
                                    }
                                    {val === "antiVirus" &&
                                        <div></div>}

                                    {val === "certificate" &&
                                        <div></div>
                                    }
                                </div>
                                <div className={val === "" ? "" : 'col-sm-2 d-flex justify-content-end'}>
                                    <DeleteOutlined />
                                </div>
                            </div>
                            <div style={{ marginTop: "20px" }}></div>
                            <hr />
                        </div>
                    )
                })}
                <div style={{ marginTop: "20px" }}></div>
                <a className='addRule' onClick={addNewRule}>+ Add Rule to OS</a>

            </Card>
        </div>
    )
}

export default OsProfileView