import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from './Requirements.module.css';
import { Space, Table, Layout, Typography, Popover,Pagination, Tooltip } from "antd";
import deleteicon from '../../assets/Images/delete.png'
import updateicon from '../../assets/Images/system-update.png'
import filtericon from '../../assets/Images/setting.png'
import { handleRequirementsList, handleSearch, handleShowAddModal, handleShowDeleteModal, handleShowUpdateModal, handleUserId } from "../../redux/reducers/AuthReducer";
import { listRequirements } from "../../axios/Services";
import MastersAddModal from "../../MasterModel/MastersAddModel";
import MastersDeleteModal from "../../MasterModel/MastersDeleteModel";
import MastersFilter from "../../MasterModel/MastersFilter";
import { useToken } from "../../Utility/hooks";
const { Content } = Layout;
const { Title } = Typography;
export default function Requirements() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1); 
    const [totalItems, setTotalItems] = useState(0);
   const [filter,setFilter] = useState(false)
  const handleAdd = () => {
    dispatch(handleShowAddModal(true));
  };

  const handleDelete = (userId) => {
    dispatch(handleShowDeleteModal(true));
    dispatch(handleUserId(userId));
  };

  const handleUpdate = (userId) => {
    dispatch(handleShowUpdateModal(true));
    dispatch(handleUserId(userId));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
    };

  const handleRequirementsData = (page = 1, pageSize = 10,values) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values?.name) {
      formData.append("name", values.name);
    }
    listRequirements(page,pageSize,formData)
      .then((response) => {
        dispatch(handleRequirementsList(response.data.data.items));
        console.log("message" , selector.message);
        setTotalItems(response.data.data.total_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      handleRequirementsData(currentPage);
    }
  }, [token,currentPage,selector.search]);

 

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1 + (currentPage - 1) * 10,
      
    },
    {
      title: "ID",
      dataIndex: "RequirementsId",
      key: "requirementsId",
    },
    {
      title: "Name",
      dataIndex: "RequirementsName",
      key: "requirementsName",
    },
    
   
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update" >
<img src={updateicon} width="20px" height="20px" onClick={() => handleUpdate(record.RequirementsId)}></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete" >
<img src={deleteicon} width="20px" height="20px" onClick={() => handleDelete(record.RequirementsId)}></img>
          </Tooltip>
          
          
        </Space>
      ),
    },
  ];
  return (
    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>
            Requirements Management
          </Title>
              <button onClick={handleAdd} className="btn btn-primary">Add Requirements</button>
          <img src={filtericon} width="20px" height="20px" onClick={() => setFilter(!filter)}></img>
          {
            filter && (<MastersFilter listapical={handleRequirementsData}/>)
          }
        </div>
        

        <Table 
          columns={columns} 
          dataSource={selector?.requirementsList} 
          pagination={false}
          className={classes.table}
        />
        {selector.showAddModal && <MastersAddModal listapical={handleRequirementsData} value="requirement"/>}
        {selector.showDeleteModal && <MastersDeleteModal listapical={handleRequirementsData} value="requirements"/>}
        {selector.showUpdateModal && <MastersAddModal listapical={handleRequirementsData} value="requirements"/>}
        <Pagination
         current={currentPage}
         pageSize={10} 
         total={totalItems} 
         onChange={handlePageChange}
         style={{ textAlign: 'center' }} 
            />
      </Content>
    </Layout>
  );
}
