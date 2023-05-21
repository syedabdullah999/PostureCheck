import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown, Tree, Menu } from 'antd';
import { DownloadOutlined, PlusCircleOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import OsProfileView from './OsProfileView';
import _ from 'lodash';
import './../App.css';

const optionsToSet = [
    {
        label: "Finance Boys",
        value: "Finance Boys"
    },
    {
        label: "Design",
        value: "Design"
    },
    {
        label: "Finance",
        value: "Finance"
    },
];
const treeData = [
    {
        title: 'Node 1',
        key: '0-0',
        children: [
            { title: 'Child Node 1', key: '0-0-0' },
            { title: 'Child Node 2', key: '0-0-1' },
        ],
    },
    {
        title: 'Node 2',
        key: '0-1',
        children: [
            { title: 'Child Node 3', key: '0-1-0' },
            { title: 'Child Node 4', key: '0-1-1' },
        ],
    },
];

const treeStyle = {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '1px',
    height: '100%',
    backgroundColor: '#ccc',
    transform: 'translate(-50%, 0)',
    zIndex: -1,
};

const containerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '16px',
};

const cardStyle = {
    flex: 1,
    margin: '0 16px',
};
const PostureEditView = () => {
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

    const [body, setBody] = useState({
        "uuid": "e0afd4a4-1319-4f21-a0f3-e5d81e92f65a", //unknown
        "profile_name": "",
        "schedule": "",
        "assigned_teams": [],
        "device_id": "3424324", //unknown
        "os_rules": [
            // {
            //     "os": "mac",
            //     "rule_key": "file_exists",
            //     "rule_operator": "AND",
            //     "rule_value": "windows/file/path/to/check"
            // }
        ]
    })
    const osRule = {
        "os": "",
        "rule_key": "",
        "rule_operator": "",
        "rule_value": ""
    }
    const [osAdded, setOsEdit] = useState(false)
    const [osBody, setOSBody] = useState([])
    const [items, setItems] = useState([
        {
            key: 1,
            value: "macOS",
            visible: true,
            label: (
                <p onClick={() => addOs("macOS")}>
                    MacOs
                </p>),
            os_rules: []
        },
        {
            key: 2,
            value: "windows",
            visible: true,
            label: (
                <p onClick={() => addOs("windows")}>
                    Windows
                </p>),
            os_rules: []
        },
        {
            key: 3,
            value: "linux",
            visible: true,
            label: (
                <p onClick={() => addOs("linux")}>
                    Linux
                </p>),
            os_rules: []
        },
    ])
    const tagRender = (val) => {
        return (
            <>
                <PlusCircleOutlined style={{ display: "inline-grid" }} />
                <span>{val.value}</span>
            </>
        )
    }
    const handleChange = (value) => {
        setBody(prevState => ({
            ...prevState,
            assigned_teams: value
        }));
    };
    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }

        return <StyledFormControlLabel checked={checked} {...props} />;
    }
    const StyledFormControlLabel = styled((props) => (
        <FormControlLabel {...props} />
    ))(({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }));

    const addOs = (e) => {
        // setOSBody([...osBody, osBody[osBody.length] + 1])
        console.log("body 3: ",items);
        let abc = osBody
        let itemData = items
        abc.push(e)
        debugger
        console.log("body 1: ",itemData);
        items.map((option, index) => {
            debugger
            if (e === (option.value)){
                itemData[index].visible = false;
                itemData[index].os_rules = [...itemData[index].os_rules, osRule]
                return
            }
        });
        console.log("body 2: ",itemData);
        setItems([...itemData])
        setOSBody([...abc])
        // setTimeout(() => {
            
        //     console.log("body : ",items);
        // }, 3000);
        // let item = items
        // item = item.filter((val, ind) => {
        //     if (val.key !== e)
        //         return val
        // })
        // setItems([...item])
    }
    const MenuComponent = (
        <Menu>
            {items.map((item) => {
                if (item.visible)
                    return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
                return null; // hide the item if its value is not 'macOS'
            })}
        </Menu>
    );
    const removeOs = (val) => {
        let itemsData = items
        items.map((option, index) => {
            if (val === option.value)
                itemsData[index].visible = true;
        });
        let body = osBody
        body.find(item => item.value !== val)
        setOSBody([...body])
        setItems([...itemsData])
    }
    const runtime = (val) => {
        setBody(prevState => ({
            ...prevState,
            schedule: val
        }));
    }

    // --------------------------------------------------------------------------
    function createOSrule(value, index, osName, iteration) {
        let osRuleToAdd = osRule
        osRuleToAdd.os = osName
        osRuleToAdd.rule_key = value

        let rule = items
        rule[iteration].os_rules = [...items[iteration].os_rules, osRuleToAdd]
        setItems([...rule]);
    }

    const updateName = (value, index, osName, iteration) => {
        let data = items
        data[iteration].os_rules[index].rule_key = value
        setItems([...data]);
    }

    const addNewRule = () => {
        setNewRule([...newrule, ""])
    }
    const handleInputCertificateName = (val, ind, iteration) => {
        // setVersionNumber(event.target.value);
        let data = items
        data[iteration].os_rules[ind].rule_value = val.target.value
        data[iteration].os_rules[ind].rule_operator = val.target.value
        setItems([...data]);
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

    const handleInputVersionNumber = (event, index, iteration) => {
        let data = items
        data[iteration].os_rules[index].rule_value = event.target.value
        setItems(data);
        setVersionNumber(event.target.value);
    };

    const handleClearVersionNumber = (event, index, iteration) => {
        let data = items
        data[iteration].os_rules[index].rule_value = ""
        setItems(data);
        setVersionNumber('');
    };
    const addNewCertificate = (value, osName, iteration) => {
        createOSrule(value, "", osName, iteration)
        let certificate = certificateName
        certificate[1] = "OR"
        setCertificateName([...certificate])
    }
    const addNewProcess = (ind) => {
        let process = processName
        process[ind] = "AND"
        setCertificateName([...process])
    }
    const handleChangeValue = (value) => {
        console.log(`selected ${value}`);
    };
    // --------------------------------------------------------------------------

    const profileNameSet = (val) => {
        setBody(prevState => ({
            ...prevState,
            profile_name: val
        }));
    }
    const onChangeOSVOperator = (val, osName, index, iteration) => {
        let data = items
        // let index = ""
        // data.os_rules.map((vall, ind) => {
        //     if (vall.os === osName && vall.rule_key === "operatingSystemVersion")
        //         index = ind
        //     return
        // })
        // if (!!!index) {
        data[iteration].os_rules[index].rule_operator = val
        console.log("data :", data );
        setItems([...data]);
        // setItems(prevItems => {
        //     const updatedItems = [...prevItems];
        //     if (updatedItems.length > iteration) {
        //       updatedItems[iteration] = {
        //         ...updatedItems[iteration],
        //         os_rules: [
        //           {
        //             ...updatedItems[iteration].os_rules[index],
        //             rule_operator: val
        //           }
        //         ]
        //       };
        //     }
        //     return updatedItems;
        //   });
    }
    return (

        <>
            <div className="col-sm-12">
                <h1 className=''>Edit Device Posture Check Profile</h1>
                <p>Creae and manage Device Posture Check profiles to enforce security befor endpoints gain network access.</p>
                <div className='mainUL'>
                    <div class="list1 container">
                        <div className='mainNode'>
                            <Card style={{ width: "100%", borderLeftColor: "#227ef5", borderLeftWidth: "4px", marginTop: "33px" }}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className='header1'>Posture Check Profile Name*</p>
                                        <Input value={body.profile_name} placeholder="" onChange={profileNameSet} />
                                    </div>
                                    <div className="col-sm-6">
                                        <p className='header1'>Assign Groups*</p>
                                        <Select
                                            mode="multiple"
                                            tagRender={tagRender}
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select assigned groups"
                                            onChange={handleChange}
                                            value={body.assigned_teams}
                                            options={optionsToSet}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className='header1 runtimeSchedule'>Runtime Schedule</p>
                                        <RadioGroup name="use-radio-group" defaultValue="first">
                                            <div className='d-flex'>
                                                <MyFormControlLabel value="Prior to connection and" label="Prior to connection and" control={<Radio size="small" />} />
                                                <Select
                                                    style={{ width: 120 }}
                                                    value={body.schedule}
                                                    options={[{ value: 20, label: "Every 20 minutes" }, { value: 40, label: "Every 40 minutes" }, { value: 60, label: "Every 60 minutes" }]}
                                                    onChange={runtime}
                                                />
                                            </div>
                                            <MyFormControlLabel value="Prior to connection only" label="Prior to connection only" control={<Radio size="small" />} />
                                        </RadioGroup>
                                    </div>
                                </div>
                            </Card>

                        </div>
                        <div className='secondNode'>
                            {items.find(item => item.visible === false) !== undefined &&
                                <h3 style={{ width: "80%", marginLeft: "117px", marginTop: "33px", position: "absolute" }}>Operating System for this Profile</h3>}
                            {
                                items.map((val, ind) => {
                                    return (
                                        !val.visible &&
                                        <div className='list1'>
                                            <div className='mainNode childNode'>
                                                <OsProfileView name={val.value} removeOs={removeOs} items={val} iteration={ind} osBody={osBody} newrule={newrule}
                                                    createOSrule={createOSrule} options={options} versionNumber={versionNumber} handleInputVersionNumber={handleInputVersionNumber}
                                                    handleClearVersionNumber={handleClearVersionNumber} addNewCertificate={addNewCertificate} certificateName={certificateName}
                                                    handleClearCertificateName={handleClearCertificateName} handleInputCertificateName={handleInputCertificateName}
                                                    handleChangeValue={handleChangeValue} processName={processName} handleClearProcessRunning={handleClearProcessRunning}
                                                    handleInputProcessRunning={handleInputProcessRunning} addNewProcess={addNewProcess} addNewRule={addNewRule}
                                                    onChangeOSVOperator={onChangeOSVOperator} body={body} updateName={updateName}
                                                />
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>

                </div >
                {/* {
    "uuid": "e0afd4a4-1319-4f21-a0f3-e5d81e92f65a",
    "profile_name": "Usman",
    "schedule": 20,
    "assigned_teams": ['abc'],
    "device_id": "3424324",
    "os_rules": [
        {
            "os": "mac",
            "rule_key": "file_exists",
            "rule_operator": "AND",
            "rule_value": "windows/file/path/to/check"
        }
    ]
} */}
                {/* <ul>
                    <li class="container"><p>Testing </p>
                        <ul>
                            <li><p>Testing 1</p></li>
                            <li><p>Testing 2</p></li>
                        </ul>
                    </li>
                </ul> */}

                <div className="row" style={{ marginTop: "150px" }}>
                    <div className="col-sm-8">
                        {items.find(item => item.visible === false) === undefined &&
                            <div className='noOpSelected'>
                                <h2>No Operating System Selected Yet</h2>
                                <p>Click on add OS</p>
                            </div>
                        }
                    </div>
                    <div className="col-sm-4">
                        {items.length > 0 &&
                            <div className="d-flex justify-content-end " style={{ marginTop: "35px", marginRight: "120px" }}>
                                {/* <Button type="primary" ghost onChange={addOs}>Add OS to Profile</Button> */}
                                <Dropdown onChange={addOs}
                                    overlay={MenuComponent}
                                    trigger={["hover"]}
                                    placement="bottom"
                                    arrow={{ pointAtCenter: false }}
                                >
                                    <Button type="primary" ghost >Add OS to Profile</Button>
                                </Dropdown>
                            </div>
                        }

                    </div>

                </div>
                <hr style={{ width: "84%", marginLeft: "100px" }} />
                <div className="row">
                    <div className="col-sm-10">

                    </div>
                    <div className="col-sm-2">
                        <div className="d-flex justify-content-end " style={{ marginTop: "35px" }}>
                            {/* <Button type="primary" ghost onChange={addOs}>Add OS to Profile</Button> */}
                            <Button type="text">Cancel</Button>
                            <div style={{ marginLeft: "10px" }}></div>
                            <Button type="primary" >Apply</Button>
                        </div>

                    </div>

                </div>
            </div >
        </>

    )
}

export default PostureEditView