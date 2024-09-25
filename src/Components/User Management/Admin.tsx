import  { useEffect, useState } from "react";
import { Adminsss } from "../../axios/Services";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Admin.module.css";
import AdminModule from "../Model/AddModule";
import { Button, message, Popover } from "antd";
import { FilterOutlined, UserAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import Filter from "./Filter";
import { handledeleteds } from "../../redux/reducers/AuthReducer";
import DeleteModule from "../Model/DeleteModule";
import { Typography } from "antd";
import { useToken } from "../../Utility/hooks";
import { Helmet } from "react-helmet";


interface AuthState {
  resetkey: string | null;
  delete: boolean;
}

interface User {
  userId: string;
  userName: string;
  name: string;
  phoneNumber: string;
  email: string;
}

const Admin = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const [data, setData] = useState<User[]>([]);
  const [userid, setUserid] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const del = useSelector((state: { auth: AuthState }) => state.auth.delete);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    if (token) {
      handleAdmin(currentPage, 3, {});
    }
  }, [token, currentPage]);

  const handleFilter = () => {
    setFilter(!filter);
  };

  const close = () => {
  setShowModal(false)
  }

  const handleAdmin = (currentPage = 1, size = 3, search?: { userName?: string; phoneNumber?: string; email?: string }) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("type", "2");

    if (search?.userName) {
      formData.append("username", search.userName);
    }
    if (search?.phoneNumber) {
      formData.append("phoneNumber", search.phoneNumber);
    }
    if (search?.email) {
      formData.append("email", search.email);
    }

    Adminsss(currentPage, size, formData)
      .then((response) => {
        // message.success(response.data.msg);
        setTotalItems(response.data.data.total_count);
        setData(response.data.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = (values: string) => {
    setUserid(values);
    dispatch(handledeleteds(true));
  };

 

  return (
    <>


<Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="This is the home page " />
        <meta name="keywords" content="admin ,  React" />
      </Helmet>

   
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography.Title level={3}>ADMIN</Typography.Title>

          <Button
            type="primary"
            onClick={() => setShowModal(true)}
            className={classes.addUserButton}
          >
            ADD ADMIN
            <UserAddOutlined />
          </Button>
          <Button
            icon={<FilterOutlined />}
            className={classes.filterButton}
            onClick={handleFilter}
          >
            Filter
          </Button>
        </div>
        <br />

        <div>
          {filter && <Filter functioncall={handleAdmin} />}
        </div>

        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>User ID</th>
                <th>Name</th>
                <th> User Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className={classes.tableRow}>
                    <td>{(currentPage - 1) * 3 + index + 1}</td>
                    <td>{item.userId}</td>
                    <td>{item.userName}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.email}</td>
                    <td>
                      <Button
                        type="primary"
                        onClick={() => handleDeleteUser(item.userId)}
                        className={classes.deleteButton}
                      >
                        <DeleteOutlined />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={classes.noData}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination 
            current={currentPage}
            pageSize={3}
            total={totalItems}
            onChange={handlePageChange}
            className={classes.pagination}
          />

          {showModal && (
            <AdminModule
              closeAdd= {close}
            />
          )}

          {del && (
            <DeleteModule
              userid={userid}
              listapicall={handleAdmin}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
