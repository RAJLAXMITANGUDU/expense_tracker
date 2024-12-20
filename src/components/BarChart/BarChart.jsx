import React,{pureComponent} from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ToolTip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import styles from "./BarChart.module.css";
 export default function BarChartComponent({data}) {
    return (
        <div className={styles.expenseChart}>
            <h2>Top Expenses</h2>
            <div className={styles.barWrapper}>
                {data?.length ? (
                    <ResponsiveContainer className={styles.barContainer} width="100%" height={280}>
                        <BarChart className={styles.barChart} data={data} width="80%" layout="vertical">
                            <XAxis type="number" axisLine={false} display="none" />
                            <YAxis 
                              type="category"
                              dataKey="name"
                              width={200}
                              axisLine={false}
                            />
                            <Bar dataKey="value" fill="#8884d8" barSize={25} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div style={{
                        alignItems:"center",
                        justifyContent:"center",
                        display:"flex",
                        height:"280px",
                    }}
                    >
                        No transactions!
                    </div>
                )}
            </div>
        </div>
    );
 }