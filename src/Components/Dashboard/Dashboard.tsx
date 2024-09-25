import  { useEffect, useState } from "react";
import { product, chart } from "../../axios/Services";
import { useDispatch } from "react-redux";
import { useToken } from "../../Utility/hooks";
import Chart from "react-apexcharts";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const token = useToken();

  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);    //store the dealer name x axis
  const [seriesData, setSeriesData] = useState<{ name: string; data: number[] }[]>([]);   // store the total lead data 


  
 
  const chartOptions = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: categories
    }
  };

  useEffect(() => {
    if (token) {
      handleGetData();
     
    }
  }, [token]);

  const handleGetData = () => {
    const formData = new FormData();
    formData.append("token", token);

    product(formData)
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data && Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("Unexpected data structure:", res.data);
        }
      })
      .catch((err) => {
        console.log("API Error:", err);
      });


      
    
        chart(formData)
          .then((res) => {
            const items = res.data?.data?.items ?? [];
            const dealerNames = items.map((item: { Dealer: string }) => item.Dealer);
            const totalLeads = items.map((item: { totalLead: number }) => item.totalLead); // Assuming totalLead is a number
            setCategories(dealerNames);
           
            setSeriesData([{ name: "Total Leads", data: totalLeads.flat() }]);  

            
          })
          .catch((err) => {
            console.log("Chart API Error:", err);
          });
      
    




  };


  return (
    <div className={classes.dashboardContainer}>
      {data.length > 0 ? (
        <div className={classes.gridContainer}>
          {data.map((item, index) => (
            <div className={classes.card} key={index}>
              <div className={classes.cardBody}>
                <h5 className={classes.cardTitle}>{item.displayName}</h5>
                <div className={classes.cardInfoContainer}>
                  <div className={classes.cardLeads}>
                    <p className={classes.cardLeadsTitle}>Leads</p>
                    <p className={classes.cardLeadsValue}>
                      {item.leads.value || 0}
                    </p>
                  </div>
                  <div className={classes.cardOverdue}>
                    <p className={classes.cardOverdueTitle}>Overdue</p>
                    <p className={classes.cardOverdueValue}>
                      {item.over_due.value || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
       <div className="chartTitle"> <h2> Sales Analytics</h2></div>

<div className={classes.chartContainer}>

  
 
     
        <Chart
          options={chartOptions}    // pass x axis categories to the chart
          series={seriesData}     // pass sale data 
          type="bar"
          width="100%" // Use full width of the container
        />
      </div>
    </div>
  
  );
};

export default Dashboard;
