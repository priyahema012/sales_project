import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from './EnquiryTypeMaster.module.css';
import { Space, Table, Layout, Typography, Pagination, Tooltip } from "antd";
import { handleEnquiryListData, handleSearch, handleShowAddModal, handleShowDeleteModal, handleShowUpdateModal, handleUserId } from "../../redux/reducers/AuthReducer";
import { listEnquiry } from "../../axios/Services";
import MastersAddModal from "../../MasterModel/MastersAddModel";
import MastersDeleteModal from "../../MasterModel/MastersDeleteModel";
import MastersFilter from "../../MasterModel/MastersFilter";
import { useToken } from "../../Utility/hooks";
import deleteicon from '../../assets/Images/delete.png';
import updateicon from '../../assets/Images/system-update.png';
import filtericon from '../../assets/Images/setting.png';
import { Helmet } from "react-helmet";
import { DeleteOutlined, EditOutlined, FilterOutlined, UserAddOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

interface Item {
  id: number;
  enquireId: number; // Ensure correct ID property
  enquireTypeName: string; 
  enquiry : string
 
}

interface AuthState {
  auth: {
    categoryList: Item[];
    search: string;
    showAddModal: boolean;
    showDeleteModal: boolean;
    showUpdateModal: boolean;
    enquiryListData: Item[];
    userId: number; // Ensure userId is a number
  };
}

export default function EnquiryTypeMaster() {
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
    listEnquiry(page, pageSize, formData)
      .then((response) => {
        dispatch(handleEnquiryListData(response.data.data.items));
        setTotalItems(response.data.data.total_count);
      })
      .catch((error) => {
        console.error("Error fetching enquiries:", error);
      });
  };

  const content = (
    <MastersFilter listapical={handleRequirementsData} />
  );

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
      render: (_: any, record: Item) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update">
          
            <button onClick={() => handleUpdate(record.enquireId)} className="btn btn-primary">    <EditOutlined />  </button>  
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
          
            <button  onClick={() => handleDelete(record.enquireId)} className="btn btn-primary">    <DeleteOutlined />  </button>  
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (

<>
    <Helmet>
    <title>Enquiry</title>
    <meta name="description" content="This is the enquiry page " />
    <meta name="keywords" content="enquiry ,  React" />
  
  </Helmet>
    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>
            Enquire Management
          </Title>

          <button onClick={handleAdd} className="btn btn-primary">Add Enquire <UserAddOutlined />  </button>  
          <button   onClick={() => setFilter(!filter)}  className="btn btn-primary">Filter  <FilterOutlined  /> </button> 
          
          
          {filter && content}
        </div>

        <Table
          columns={columns}
          dataSource={selector.enquiryListData}
          pagination={false}
          className={classes.table}
        />
        {selector.showAddModal && <MastersAddModal listapical={handleRequirementsData} value="enquiry" />}
        {selector.showDeleteModal && <MastersDeleteModal listapical={handleRequirementsData} value={selector.userId} />}
        {selector.showUpdateModal && <MastersAddModal listapical={handleRequirementsData} value="Enquiry" />}
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
