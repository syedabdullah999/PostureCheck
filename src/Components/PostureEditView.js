import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Divider, Input, UserOutlined, Card, Select, Dropdown, Tree } from 'antd';
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
                            <OsProfileView name={val} />
                        )
                    })
                }
                <div className="row">
                    <div className="col-sm-8">
                        {osBody.length === 0 &&
                            <div className='noOpSelected'>
                                <h2>No Operating System Selected Yet</h2>
                                <p>Click on add OS</p>
                            </div>
                        }
                    </div>
                    <div className="col-sm-4">
                        <div className="d-flex justify-content-end " style={{ marginTop: "35px" }}>
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
                <div className="row">
                    <div className="col-sm-10">

                    </div>
                    <div className="col-sm-2">
                        <div className="d-flex justify-content-end " style={{ marginTop: "35px" }}>
                            {/* <Button type="primary" ghost onChange={addOs}>Add OS to Profile</Button> */}
                            <Button type="text">Cancel</Button>
                            <div style={{marginLeft:"10px"}}></div>
                            <Button type="primary" >Apply</Button>
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default PostureEditView