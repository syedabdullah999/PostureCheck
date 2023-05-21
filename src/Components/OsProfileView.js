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
    const [indexOfCertificate, setIndexOfCertificate] = useState()
    // const [versionNumber, setVersionNumber] = useState('');
    const [certificateName, setCertificateName] = useState(["", "", ""]);
    // const [processName, setProcessName] = useState(["", "", ""]);
    const [options, setOptions] = useState([
        { value: 'operatingSystemVersion', label: 'Operating System Version', visble: true },
        { value: 'certificate', label: 'Certificate', visble: true },
        { value: 'diskEncryption', label: 'Disk Encryption', visble: true },
        { value: 'antiVirus', label: 'Anti-virus', visble: true },
        { value: 'fileExists', label: 'File Exists', visble: true },
        { value: 'processRunning', label: 'Process Running', visble: true },
    ]);
    // useEffect(() => {
    //     // setRules([...rules, "Operating System Version"])
    // }, [])
    function handleSelect(value, index, osName, iteration) {
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
        debugger
        setNewRule([...ruleSet])
        setOptions(newOptions);
        // props.createOSrule(value, index, osName, iteration)
        props.updateName(value, index, osName, iteration)
        // const newOptions = options.map((item,ind) => item.value === value);
    }

    const addNewRule = (value, osName, iteration) => {
        props.createOSrule(value, "", osName, iteration)
    }
    const handleInputCertificateName = (val, ind, iteration) => {
        // setVersionNumber(event.target.value);
        // let certificate = certificateName
        // certificate[ind] = val.target.value
        // setCertificateName([...certificate])
        props.handleInputCertificateName(val, ind, iteration)
    };

    const handleClearCertificateName = (val, ind, iteration) => {
        // let certificate = certificateName
        // certificate[ind] = ""
        // setCertificateName([...certificate])
        props.handleClearCertificateName(val, ind, iteration)
    };
    // const handleInputProcessRunning = (val, ind) => {
    //     // setVersionNumber(event.target.value);
    //     let process = processName
    //     process[ind] = val.target.value
    //     setProcessName([...process])
    // };

    // const handleClearProcessRunning = (val, ind) => {
    //     let process = processName
    //     process[ind] = ""
    //     setProcessName([...process])
    // };

    // const handleInputVersionNumber = (event) => {
    //     setVersionNumber(event.target.value);
    // };

    // const handleClearVersionNumber = () => {
    //     setVersionNumber('');
    // };
    const addNewCertificate = (value, osName, iteration, index) => {
        // let certificate = certificateName
        // certificate[1] = "OR"
        // setCertificateName([...certificate])
        setIndexOfCertificate(index)
        props.addNewCertificate(value, osName, iteration)
    }
    // const addNewProcess = (ind) => {
    //     let process = processName
    //     process[ind] = "AND"
    //     setCertificateName([...process])
    // }
    // const handleChange = (value) => {
    //     console.log(`selected ${value}`);
    // };
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

            {props.items.os_rules.map((val, index) => {
                return (
                    <div className="row">
                        <div className="col-sm-4 d-flex">
                            {val.rule_key !== "certificate" || props.items.os_rules.filter(itemVal => itemVal.rule_key === "certificate").length <= 1 || indexOfCertificate === index ?
                                <Select
                                    onChange={(event) => handleSelect(event, index, props.name, props.iteration)}
                                    style={{ width: "100%", height: "33px" }}
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
                                : null}
                            {val.rule_key !== "certificate" || props.items.os_rules.filter(itemVal => itemVal.rule_key === "certificate").length <= 1 || indexOfCertificate === index ?
                                <div style={{ marginLeft: "8px" }}>
                                    <QuestionCircleFilled />
                                </div> : null
                            }

                        </div>
                        <div className="col-sm-8 d-flex">
                            <div className={(val.rule_key === "" || val.rule_key === "diskEncryption") ? "" : 'col-sm-10 d-flex'}>
                                {val.rule_key === "operatingSystemVersion" &&
                                    <OSVRule iteration={props.iteration} body={val} index={index} name={props.name} onChangeOSVOperator={props.onChangeOSVOperator} versionNumber={props.versionNumber} handleInputVersionNumber={props.handleInputVersionNumber} handleClearVersionNumber={props.handleClearVersionNumber} />
                                }
                                {val.rule_key === "fileExists" &&
                                    <div>
                                        <CertificateRule name={props.name} iteration={props.iteration} body={val} index={index} addNewCertificate={addNewCertificate} certificateName={certificateName} handleClearCertificateName={handleClearCertificateName} handleInputCertificateName={handleInputCertificateName} />
                                    </div>
                                }
                                {val.rule_key === "diskEncryption" &&
                                    <></>
                                }
                                {val.rule_key === "antiVirus" &&
                                    <AntiVirusRule handleChange={props.handleChangeValue} />
                                }

                                {val.rule_key === "certificate" &&
                                    <div>
                                        <CertificateRule valToProvide={0} name={props.name} iteration={props.iteration} body={val} index={index} addNewCertificate={addNewCertificate} certificateName={certificateName} handleClearCertificateName={handleClearCertificateName} handleInputCertificateName={handleInputCertificateName} />
                                        {props.items.os_rules.filter(itemVal => itemVal.rule_key === "certificate").length === 1 ?
                                            <a style={{ marginLeft: "9px" }} className='addRule' onClick={() => addNewCertificate("certificate", props.name, props.iteration, index)}>+ Add Source</a >
                                            :
                                            indexOfCertificate === index || props.items.os_rules.filter(itemVal => itemVal.rule_key === "certificate").length < 2 ?
                                                <p style={{ marginLeft: "9px", marginTop: "11px" }} className='addRule'>OR</p>
                                                : null
                                        }
                                        {/* <CertificateRule valToProvide={2} name={props.name} iteration={props.iteration} body={val} index={index} addNewCertificate={addNewCertificate} certificateName={certificateName} handleClearCertificateName={handleClearCertificateName} handleInputCertificateName={handleInputCertificateName} /> */}
                                    </div>
                                }
                                {val.rule_key === "processRunning" &&
                                    <div>
                                        <ProcessRunningRule processName={props.processName} handleClearProcessRunning={props.handleClearProcessRunning} handleInputProcessRunning={props.handleInputProcessRunning} addNewProcess={props.addNewProcess} />
                                    </div>
                                }
                            </div>
                            <div className={(val.rule_key === "" || val.rule_key === "diskEncryption") ? "" : 'col-sm-2 d-flex justify-content-end'}>
                                <DeleteOutlined />
                            </div>
                        </div>
                        {(val.rule_key !== "certificate" || props.items.os_rules.filter(itemVal => itemVal.rule_key === "certificate").length < 2) ?
                            <div style={{ marginTop: "20px" }}></div> : null
                        }
                        { props.items.os_rules.filter(itemVal => itemVal.rule_key === "certificate").length !== 1 && val.rule_key === "certificate" ? null : <hr />}
                    </div>
                )
            })}

            {<p class="vertical OrTag">OR</p>}
            <div style={{ marginTop: "20px" }}></div>
            <a className='addRule' onClick={(event) => addNewRule(event, props.name, props.iteration)}>+ Add Rule to OS</a>

        </Card >
    )
}

export default OsProfileView