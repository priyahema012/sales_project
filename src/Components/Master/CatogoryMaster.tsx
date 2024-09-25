import React, { useEffect, useState } from "react";
import { Pagination, Button, Layout, Table, Tooltip, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { handleShowAddModal, handleShowDeleteModal, handleShowUpdateModal, handleUserId, handleCategoryList, handleSearch } from "../../redux/reducers/AuthReducer";
import { useToken } from "../../Utility/hooks";
import MastersFilter from '../../MasterModel/MastersFilter'; 
import MastersAddModal from '../../MasterModel/MastersAddModel';
import MastersDeleteModal from '../../MasterModel/MastersDeleteModel';
import classes from "./Category.module.css";
import { MasterList } from "../../axios/Services";
import { Helmet } from "react-helmet";

interface AuthState {
  auth: {
    categoryList: Item[];
    search: string;
    showAddModal: boolean;
    showDeleteModal: boolean;
    showUpdateModal: boolean;
    userId: number; 
  };
}

interface Item {
  customerCategoryId: number;
  customerCategoryName: string;
  key?: string | number;
}

interface Values {
  name?: string;
}

const { Content } = Layout;
const { Title } = Typography;

const Category = () => {
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

  const handleRequirementsData = (page = 1, pageSize = 10, values: Values = {}) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values.name) {
      formData.append("name", values.name);
    }
    MasterList(page, pageSize, formData)
      .then((response) => {
        const itemsWithKey = response.data.data.items.map((item: any, index: number) => ({
          ...item,
          key: item.customerCategoryId || index,
        }));
        dispatch(handleCategoryList(itemsWithKey));
        setTotalItems(response.data.data.total_count);
      })
      .catch(console.log);
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
      render: (_: any, __: any, index: number) => index + 1 + (currentPage - 1) * 10,
    },
    {
      title: "ID",
      dataIndex: "customerCategoryId",
      key: "customerCategoryId",
    },
    {
      title: "Name",
      dataIndex: "customerCategoryName",
      key: "customerCategoryName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Item) => (
        <Space size="middle">
         <Tooltip placement="top" title="Update">




          <Tooltip placement="top" title="Update">
  <span
    style={{
      backgroundColor: "skyblue", // Changed to sky blue
      padding: "10px", // Optional padding for better appearance
      borderRadius: "4px", // Optional: rounded corners
      color: "white", // Change icon color to white for contrast
      cursor: "pointer", // Makes it look clickable
    }}
    onClick={() => handleUpdate(record.customerCategoryId)}
  >
    <EditOutlined />
  </span>
</Tooltip>
  {/* <span
    style={{
      backgroundColor: "skyblue",
      padding: "10px", // Optional padding for better appearance
      borderRadius: "4px", // Optional: rounded corners
      color: "white", // Change icon color to white for contrast
      cursor: "pointer" ,
    // Makes it look clickable
    }}
    onClick={() => handleUpdate(record.customerCategoryId)}
  >
    <EditOutlined />
  </span> */}
</Tooltip>

<Tooltip placement="top" title="Delete">
  <span
    style={{
      backgroundColor: "skyblue",
      padding: "10px", // Add padding for spacing around the icon
      borderRadius: "4px", // Optional: round the corners for a nice look
      display: "flex", // Use flexbox to center the icon
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
      color: "white", // Set the icon color to white for contrast
      cursor: "pointer" // Make the icon clickable
    }}
    onClick={() => handleDelete(record.customerCategoryId)}
  >
    <DeleteOutlined />
  </span>
</Tooltip>

        </Space>
      ),
    },
  ];

  return (


   <>
    <Helmet>
        <title>Catogory</title>
        <meta name="description" content="This is the category page " />
        <meta name="keywords" content="category ,  React" />
      
      </Helmet>

    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>Category Management</Title>
          <Button
  className="btn btn-primary"
  style={{ width: "150px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }} // Align icon and text
  onClick={handleAdd}
>
  <UserAddOutlined />
  Add Category
</Button>

<Button
  className="btn btn-secondary"
  style={{
    backgroundColor: "skyblue",
    width: "150px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px" // Adjust gap as needed
  }}
  onClick={() => setFilter(!filter)}
>
  <EditOutlined />
  Filter
</Button>


          {filter && <MastersFilter listapical={handleRequirementsData} />}
        </div>
        <Table 
  columns={columns} 
  dataSource={selector?.categoryList} 
  pagination={false} 
  className={classes.table} 
/>

        {selector.showAddModal && <MastersAddModal listapical={handleRequirementsData} value="category" />}
        {selector.showDeleteModal && (
          <MastersDeleteModal 
            listapical={handleRequirementsData} 
            value={selector.userId} 
          />
        )}
        {selector.showUpdateModal && <MastersAddModal listapical={handleRequirementsData} value="category" />}
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
};


export default Category;
