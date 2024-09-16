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

const { Content } = Layout;
const { Title } = Typography;

const Category = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState(false);

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

  const handleRequirementsData = (page = 1, pageSize = 10, values = {}) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values?.name) {
      formData.append("name", values.name);
    }
    MasterList(page, pageSize, formData)
      .then((response) => {
        const itemsWithKey = response.data.data.items.map((item, index) => ({
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
      render: (_, __, index) => index + 1 + (currentPage - 1) * 10,
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
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update">
            <EditOutlined onClick={() => handleUpdate(record.customerCategoryId)} />
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <DeleteOutlined onClick={() => handleDelete(record.customerCategoryId)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>Category Management</Title>
          <Button className="btn btn-primary" onClick={handleAdd}>Add Category</Button>
          <Button className="btn btn-secondary" onClick={() => setFilter(!filter)}>Filter</Button>
          {filter && <MastersFilter listapical={handleRequirementsData} />}
        </div>
        <Table 
          columns={columns} 
          dataSource={selector?.categoryList} 
          pagination={false} 
          className={classes.table} 
        />
        {selector.showAddModal && <MastersAddModal listapical={handleRequirementsData} value="category" />}
        {selector.showDeleteModal && <MastersDeleteModal listapical={handleRequirementsData} value="customer_category" />}
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
  );
};

export default Category;
