import React, { useState, useEffect, useRef } from 'react';
import { DownloadOutlined, PlusCircleOutlined, DeleteOutlined, QuestionCircleFilled } from '@ant-design/icons';
import './../App.css';

import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
import OSVRule from './SubComponents/OSVRule';
import CertificateRule from './SubComponents/CertificateRule';
import AntiVirusRule from './SubComponents/AntiVirusRule';
import ProcessRunningRule from './SubComponents/ProceessRunningRule';
const { Option } = Select;
const OsProfileView = (props) => {
    const [rules, setRules] = useState([])
    const [newrule, setNewRule] = useState([""])
    const [versionNumber, setVersionNumber] = useState('');
    const [certificateName, setCertificateName] = useState(["", "", ""]);
    const [processName, setProcessName] = useState(["", "", ""]);
    const [options, setOptions] = useState([
        { value: 'operatingSystemVersion', label: 'Operating System Version', visble: true },
        { value: 'certificate', label: 'Certificate', visble: true },
        { value: 'diskEncryption', label: 'Disk Encryption', visble: true },
        { value: 'antiVirus', label: 'Anti-virus', visble: true },
        { value: 'fileExists', label: 'File Exists', visble: true },
        { value: 'processRunning', label: 'Process Running', visble: true },
    ]);
    useEffect(() => {
        // setRules([...rules, "Operating System Version"])
    }, [])
    function handleSelect(value, index) {
        // const newOptions = options.filter((item) => item.value !== value);
        // setOptions(newOptions);
        // const index = options.findIndex((option) => option.value === value);
        setRules([...rules, value])
        let ruleSet = newrule
        ruleSet[index] = value
        const newOptions = options.map((option) => ({
            ...option,
            visble: ruleSet.includes(option.value) ? false : true
        }));
        setNewRule([...ruleSet])
        setOptions(newOptions);
        // const newOptions = options.map((item,ind) => item.value === value);
    }

    const addNewRule = () => {
        setNewRule([...newrule, ""])
    }
    const handleInputCertificateName = (val, ind) => {
        // setVersionNumber(event.target.value);
        let certificate = certificateName
        certificate[ind] = val.target.value
        setCertificateName([...certificate])
    };

    const handleClearCertificateName = (val, ind) => {
        let certificate = certificateName
        certificate[ind] = ""
        setCertificateName([...certificate])
    };
    const handleInputProcessRunning = (val, ind) => {
        // setVersionNumber(event.target.value);
        let process = processName
        process[ind] = val.target.value
        setProcessName([...process])
    };

    const handleClearProcessRunning = (val, ind) => {
        let process = processName
        process[ind] = ""
        setProcessName([...process])
    };

    const handleInputVersionNumber = (event) => {
        setVersionNumber(event.target.value);
    };

    const handleClearVersionNumber = () => {
        setVersionNumber('');
    };
    const addNewCertificate = () => {
        let certificate = certificateName
        certificate[1] = "OR"
        setCertificateName([...certificate])
    }
    const addNewProcess = (ind) => {
        let process = processName
        process[ind] = "AND"
        setCertificateName([...process])
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <Card style={{ width: "94%", borderLeftColor: "rgb(146 194 255)", borderLeftWidth: "4px", marginBottom: "-81px", marginLeft: "-52px", marginTop: `${props.iteration !== 0 ? "104px" : "78px"}` }}>
            <div className="row">
                <div className="col-sm-6">
                    <p>{props.name}</p>
                </div>
                <div className="col-sm-6 d-flex justify-content-end">
                    <DeleteOutlined onClick={() => props.removeOs(props.name)} />
                </div>
                <hr />
            </div>

            <p className='header1'>Select and Define Rules*</p>

            {newrule.map((val, index) => {
                return (
                    <div className="row">
                        <div className="col-sm-4 d-flex">
                            <Select
                                onChange={(event) => handleSelect(event, index)}
                                style={{ width: "100%", height: "33px"}}
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
                            <div style={{ marginLeft: "8px" }}>
                                <QuestionCircleFilled />
                            </div>
                        </div>
                        <div className="col-sm-8 d-flex">
                            <div className={(val === "" || val === "diskEncryption") ? "" : 'col-sm-10 d-flex'}>
                                {val === "operatingSystemVersion" &&
                                    <OSVRule versionNumber={versionNumber} handleInputVersionNumber={handleInputVersionNumber} handleClearVersionNumber={handleClearVersionNumber} />
                                }
                                {val === "fileExists" &&
                                    <div>
                                        <CertificateRule addNewCertificate={addNewCertificate} certificateName={certificateName} handleClearCertificateName={handleClearCertificateName} handleInputCertificateName={handleInputCertificateName} />
                                    </div>
                                }
                                {val === "diskEncryption" &&
                                    <></>
                                }
                                {val === "antiVirus" &&
                                    <AntiVirusRule handleChange={handleChange} />
                                }

                                {val === "certificate" &&
                                    <div>
                                        <CertificateRule addNewCertificate={addNewCertificate} certificateName={certificateName} handleClearCertificateName={handleClearCertificateName} handleInputCertificateName={handleInputCertificateName} />
                                    </div>
                                }
                                {val === "processRunning" &&
                                    <div>
                                        <ProcessRunningRule processName={processName} handleClearProcessRunning={handleClearProcessRunning} handleInputProcessRunning={handleInputProcessRunning} addNewProcess={addNewProcess} />
                                    </div>
                                }
                            </div>
                            <div className={(val === "" || val === "diskEncryption") ? "" : 'col-sm-2 d-flex justify-content-end'}>
                                <DeleteOutlined />
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}></div>
                        <hr />
                    </div>
                )
            })}
            
            {<p class="vertical OrTag">OR</p>}
            <div style={{ marginTop: "20px" }}></div>
            <a className='addRule' onClick={addNewRule}>+ Add Rule to OS</a>

        </Card >
    )
}

export default OsProfileView