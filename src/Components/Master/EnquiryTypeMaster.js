import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from './EnquiryTypeMaster.module.css';
import { Space, Table, Layout, Typography, Popover,Pagination, Tooltip } from "antd";

import { handleEnquiryListData, handleSearch, handleShowAddModal, handleShowDeleteModal, handleShowUpdateModal, handleUserId } from "../../redux/reducers/AuthReducer";
import { listEnquiry} from "../../axios/Services";
import MastersAddModal from "../../MasterModel/MastersAddModel";
import MastersDeleteModal from "../../MasterModel/MastersDeleteModel";
import MastersFilter from "../../MasterModel/MastersFilter";
import { useToken } from "../../Utility/hooks";
import deleteicon from '../../assets/Images/delete.png'
import updateicon from '../../assets/Images/system-update.png'
import filtericon from '../../assets/Images/setting.png'
const { Content } = Layout;
const { Title } = Typography;
const text = <span>Filter</span>;

export default function EnquiryTypeMaster() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1); 
    const [totalItems, setTotalItems] = useState(0);
  const[filter,setFilter] = useState(false);
  const handleAdd = () => {
    dispatch(handleShowAddModal(true));
  };

  const handleDelete = (userId) => {
    dispatch(handleShowDeleteModal(true));
    dispatch(handleUserId(userId));
  };

  const handleReset = () => {
    dispatch(handleSearch({}))
    handleRequirementsData();
  }

  const content = (
   <MastersFilter/>
  );

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
    listEnquiry(page,pageSize,formData)
      .then((response) => {
        dispatch(handleEnquiryListData(response.data.data.items));
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
      dataIndex: "enquireId",
      key: "enquireId",
    },
    {
      title: "Name",
      dataIndex: "enquireTypeName",
      key: "enquireTypeName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update" >
<img src={updateicon} width="20px" height="20px" onClick={() => handleUpdate(record.enquireId)}></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete" >
<img src={deleteicon} width="20px" height="20px" onClick={() => handleDelete(record.enquireId)}></img>
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
            Enquire Management
          </Title>
          
              <button onClick={handleAdd} className="btn btn-primary">Add Enquire</button>
          
         
         
          <img src={filtericon} width="20px" height="20px" onClick={() => setFilter(!filter)}></img>
          {filter && (<MastersFilter listapical={handleRequirementsData}/>)}
        </div>
       
        

        <Table 
          columns={columns} 
          dataSource={selector?.enquiryListData} 
          pagination={false}
          className={classes.table}
        />
        {selector.showAddModal && <MastersAddModal listapical={handleRequirementsData} value="enquiry"/>}
        {selector.showDeleteModal && <MastersDeleteModal listapical={handleRequirementsData} value="enquire_type"/>}
        {selector.showUpdateModal && <MastersAddModal listapical={handleRequirementsData} value="Enquiry"/>}
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
