import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DownloadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Space, Divider, Input, UserOutlined, Card, Select } from 'antd';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Table } from 'antd';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
const { Search } = Input;
const { Option } = Select;
function App() {
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

  const [editOpen, setEditOpen] = useState(false)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      no: '1',
      name: 'Jim Green',
      assignedOperatingSystem: 42,
      assignedGroups: () => <PlusCircleOutlined />,
      runtimeSchedule: 'Prior To Connection',
      actions: ""
    },
    {
      key: '2',
      no: '2',
      name: 'Jim Green',
      assignedOperatingSystem: 42,
      assignedGroups: 'London No. 1 Lake Park',
      runtimeSchedule: 'Prior To Connection',
      actions: ""
    },
    {
      key: '3',
      no: '3',
      name: 'Jim Green',
      assignedOperatingSystem: 42,
      assignedGroups: 'London No. 1 Lake Park',
      runtimeSchedule: 'Prior To Connection',
      actions: ""
    },
  ]);
  const columns = [
    {
      key: 'sort',
    },
    {
      title: '#',
      dataIndex: 'no',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Assigned Operating System',
      dataIndex: 'assignedOperatingSystem',
    },
    {
      title: 'Assigned Groups',
      dataIndex: 'assignedGroups',
    },
    {
      title: 'Runtime Schedule',
      dataIndex: 'runtimeSchedule',
    },
    {
      title: '',
      dataIndex: 'actions',
    },
  ];
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };
  const Row = ({ children, ...props }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });

    const style = {
      ...props.style,
      transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 })?.replace(
        /translate3d\(([^,]+),/,
        'translate3d(0,',
      ),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if (child && child.key === 'sort') {
            return React.cloneElement(child, {
              children: (
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{ touchAction: 'none', cursor: 'move' }}
                  media={<MoreOutlined />}
                  {...listeners}
                />
              ),
            });
          }
          return child;
        })}
      </tr>
    );
  };
  const onOpen = (event) => {
    setEditOpen(true)
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const tagRender = (val) => {
    debugger
    return (
      <>
        <PlusCircleOutlined style={{ display: "inline-grid" }} />
        <span>{val.value}</span>
      </>
    )
  }
  const StyledFormControlLabel = styled((props) => (
    <FormControlLabel {...props} />
  ))(({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }));
  function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }
  return (
    <>
      <div className="container">
        {!editOpen ?
          <>
            <div className="row">
              <div className="col-sm-8">
                <h1 className=''>Device Posture Check</h1>
                <p>Creae and manage Device Posture Check profiles to enforce security befor endpoints gain network access.</p>

              </div>
              <div className="col-sm-4 d-flex justify-content-end ">
                <Button type="primary" icon={<PlusCircleOutlined />} className="addprofileButton">
                  Add Profile
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8 ">

                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 350 }} />
              </div>
              <div className="col-sm-4 d-flex justify-content-end">
                <p>Device Posture Check Profiles</p>
              </div>
            </div>



            <DndContext onDragEnd={onDragEnd}>
              <SortableContext
                // rowKey array
                items={dataSource.map((i) => i.key)}
                strategy={verticalListSortingStrategy}
              >
                <Table
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => { onOpen(event) }, // click row
                      // onDoubleClick: (event) => { }, // double click row
                      // onContextMenu: (event) => { }, // right button click row
                      // onMouseEnter: (event) => { }, // mouse enter row
                      // onMouseLeave: (event) => { }, // mouse leave row
                    };
                  }}
                  components={{
                    body: {
                      row: Row,
                    },
                  }}
                  rowKey="key"
                  columns={columns}
                  dataSource={dataSource}
                />
              </SortableContext>
            </DndContext>
          </>
          :
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
          </div>
        }
      </div>
    </>

  );
}
const onSearch = () => {

}



export default App;
