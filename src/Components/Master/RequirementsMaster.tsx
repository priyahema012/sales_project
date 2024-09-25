import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from './Requirements.module.css';
import { Space, Table, Layout, Typography, Pagination, Tooltip } from "antd";
import deleteicon from '../../assets/Images/delete.png';
import updateicon from '../../assets/Images/system-update.png';
import filtericon from '../../assets/Images/setting.png';
import { handleRequirementsList, handleSearch, handleShowAddModal, handleShowDeleteModal, handleShowUpdateModal, handleUserId } from "../../redux/reducers/AuthReducer";
import { listRequirements } from "../../axios/Services";
import MastersAddModal from "../../MasterModel/MastersAddModel";
import MastersDeleteModal from "../../MasterModel/MastersDeleteModel";
import MastersFilter from "../../MasterModel/MastersFilter";
import { useToken } from "../../Utility/hooks";
import { Helmet } from "react-helmet";
import { DeleteOutlined, EditOutlined, FilterOutlined, UserAddOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

interface Item {
  RequirementsId: number;
  RequirementsName: string;
}

interface AuthState {
  auth: {
    categoryList: Item[];
    search: string;
    showAddModal: boolean;
    showDeleteModal: boolean;
    showUpdateModal: boolean;
    enquiryListData: Item[];
    requirementsList: Item[];
    userId: number; // Ensure userId is defined here
  };
}

export default function Requirements() {
  const dispatch = useDispatch();
  const selector = useSelector((state: AuthState) => state.auth);
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState(false);

  const handleAdd = () => {
    dispatch(handleShowAddModal(true));
  };

  const handleDelete = (userId: number) => {
    dispatch(handleShowDeleteModal(true));
    dispatch(handleUserId(userId));
  };

  const handleUpdate = (userId: number) => {
    dispatch(handleShowUpdateModal(true));
    dispatch(handleUserId(userId));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRequirementsData = (page = 1, pageSize = 10, values: any = {}) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values?.name) {
      formData.append("name", values.name);
    }
    listRequirements(page, pageSize, formData)
      .then((response) => {
        dispatch(handleRequirementsList(response.data.data.items));
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
  }, [token, currentPage, selector.search]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (_: string, __: any, index: number) => index + 1 + (currentPage - 1) * 10,
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
      render: (_: string, record: Item) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update">

          <button   onClick={() => handleUpdate(record.RequirementsId)} className="btn btn-primary">    <EditOutlined />  </button>  
            
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
          <button  onClick={() => handleDelete(record.RequirementsId)} className="btn btn-primary">    <DeleteOutlined />  </button>  
          </Tooltip>

         
        </Space>
      ),
    },
  ];

  return (


    <>
      <Helmet>
        <title>Requirements</title>
        <meta name="description" content="This is the requirements page " />
        <meta name="keywords" content="requirements ,  React" />
      
      </Helmet>


    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>
            Requirements Management
          </Title>
          <button onClick={handleAdd} className="btn btn-primary">Add Requirements    <UserAddOutlined /></button>
          <button onClick={() => setFilter(!filter)} className="btn btn-primary">   <FilterOutlined /></button>

         
          {filter && <MastersFilter listapical={handleRequirementsData} />}
        </div>
        <Table 
          columns={columns} 
          dataSource={selector?.requirementsList} 
          pagination={false}
          className={classes.table}
        />
        {selector.showAddModal && <MastersAddModal listapical={handleRequirementsData} value="requirement" />}
        {selector.showDeleteModal && <MastersDeleteModal listapical={handleRequirementsData} value={selector.userId} />} {/* Ensure userId is a number */}
        {selector.showUpdateModal && <MastersAddModal listapical={handleRequirementsData} value="requirements" />}
        <Pagination
          current={currentPage}
          pageSize={10} 
          total={totalItems} 
          onChange={handlePageChange}
          style={{ textAlign: 'center' }}
        />
      </Content>
    </Layout>
    </>
  );
}
