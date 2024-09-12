import React, { useEffect, useState } from "react";
import { product } from "../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../redux/reducers/AuthReducer";
import classes from './Dashboard.module.css';

function Dashboard() {
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, SetData] = useState([]);

  const handlegetData = () => {
    let formdata = new FormData();
    formdata.append("token", selector.token);

    product(formdata)
      .then((res) => {
        console.log("API Response:", res.data);

        if (res.data && Array.isArray(res.data.data)) {
          SetData(res.data.data);
        } else if (Array.isArray(res.data)) {
          SetData(res.data);
        } else {
          console.error("Unexpected data structure:", res.data);
        }
      })
      .catch((err) => {
        console.log("API Error:", err);
      });
  };

  useEffect(() => {
    if (selector.token) {
      handlegetData();
    }
  }, [selector.token]);

  useEffect(() => {
    console.log("Current Data:", data);
  }, [data]);

  return (
    <>
      <div className="row">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className={classes.card}>
                <div className={classes.cardbody}>
                  <h5 className={classes.cardtitle}>{item.displayName}</h5>
                  <div className={classes.cardInfoContainer}>
                    <div className={classes.cardleads}>
                      <p className={classes.cardleadstitle}>Leads</p>
                      <p className={classes.cardleadsvalue}>{item.leads.value || 0}</p>
                    </div>
                    <div className={classes.cardoverdue}>
                      <p className={classes.cardoverduetitle}>Overdue</p>
                      <p className={classes.cardoverduevalue}>{item.over_due.value || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
