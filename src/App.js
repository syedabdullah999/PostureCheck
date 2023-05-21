import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DownloadOutlined, PlusCircleOutlined, PlusSquareOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Divider, Input, UserOutlined, Card, Select, Icon } from 'antd';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import PostureEditView from './Components/PostureEditView';
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
  const [actionHide, setActionHide] = useState(true)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      no: '1',
      name: 'Jim Green',
      assignedOperatingSystem: 42,
      assignedGroups: "tagRender",
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
      render: () => renderIcons(),
    },
  ];
  const renderIcons = () => {
    if (!actionHide)
      return (
        <>
          <DeleteOutlined style={{ color: "#3b5da8", marginLeft: "7px" }} />
          <PlusSquareOutlined style={{ color: "#3b5da8", marginLeft: "7px" }} />
          <EditOutlined style={{ color: "#3b5da8", marginLeft: "7px" }} onClick={onOpen} />
        </>
      )
    return(
      <div style={{width:"63px"}}></div>
    )
  }
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
                <Button type="primary" icon={<PlusCircleOutlined />} className="addprofileButton" onClick={onOpen}>
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
                      onClick: (event) => { }, // click row
                      onMouseEnter: (event) => { setActionHide(false) }, // mouse enter row
                      onMouseLeave: (event) => { setActionHide(true) }, // mouse leave row
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
          <PostureEditView />
        }
      </div>
    </>

  );
}
const onSearch = () => {

}
export default App;
