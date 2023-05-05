import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown } from 'antd';
import { DownloadOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import OsProfileView from './OsProfileView';
import './../App.css';

const options = [
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
const PostureEditView = () => {

    const [osAdded, setOsEdit] = useState(false)
    const [osBody, setOSBody] = useState([])
    const [items, setItems] = useState([
        {
            key: 1,
            label: (
                <p onClick={() => addOs("MacOs")}>
                    MacOs
                </p>)
        },
        {
            key: 2,
            label: (
                <p onClick={() => addOs("Windows")}>
                    Windows
                </p>)
        },
        {
            key: 3,
            label: (
                <p onClick={() => addOs("Linux")}>
                    Linux
                </p>)
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
        console.log(`selected ${value}`);
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
        debugger
        // setOSBody([...osBody, osBody[osBody.length] + 1])
        let abc = osBody
        abc.push(e)
        setOSBody([...abc])
        // let item = items
        // item = item.filter((val, ind) => {
        //     if (val.key !== e)
        //         return val
        // })
        // setItems([...item])
    }

    return (

        <>
            <div className="col-sm-12">
                <h1 className=''>Edit Device Posture Check Profile</h1>
                <p>Creae and manage Device Posture Check profiles to enforce security befor endpoints gain network access.</p>
                <Card style={{ width: "100%", borderLeftColor: "#227ef5", borderLeftWidth: "4px", marginTop: "33px" }}>
                    <div className="row">
                        <div className="col-sm-6">
                            <p className='header1'>Posture Check Profile Name*</p>
                            <Input placeholder="" />
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
                                options={options}
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
                                        defaultValue="lucy"
                                        style={{ width: 120 }}
                                        disabled
                                        options={[{ value: 20, label: "Every 20 minutes" }, { value: 40, label: "Every 40 minutes" }, { value: 60, label: "Every 60 minutes" }]}
                                    />
                                </div>
                                <MyFormControlLabel value="Prior to connection only" label="Prior to connection only" control={<Radio size="small" />} />
                            </RadioGroup>
                        </div>
                    </div>
                </Card>
                {osBody.length !== 0 &&
                    <h3 style={{ width: "80%", marginLeft: "117px", marginTop: "33px" }}>Operating System for this Profile</h3>}
                {
                    osBody.map((val, ind) => {
                        return (
                            <OsProfileView name={val}/>
                        )
                    })
                }
                <div className="row">
                    <div className="col-sm-6">
                        {osBody.length === 0 &&
                            <>
                                <h2>No Operating System Selected Yet</h2>
                                <p>Click on add OS</p>
                            </>
                        }
                    </div>
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-end " style={{ marginTop: "60px" }}>
                            {/* <Button type="primary" ghost onChange={addOs}>Add OS to Profile</Button> */}
                            <Dropdown onChange={addOs} menu={{ items }} placement="bottom" ON
                            // arrow={{ pointAtCenter: false }}
                            >
                                <Button type="primary" ghost >Add OS to Profile</Button>
                            </Dropdown>
                        </div>

                    </div>

                </div>
                <hr />

            </div>
        </>

    )
}

export default PostureEditView