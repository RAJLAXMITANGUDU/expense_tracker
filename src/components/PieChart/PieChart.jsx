import React,{pureComponent} from "react";
import {ResponsiveContainer,Legend,PieChart,Pie,Sector,Cell} from "recharts";
const COLORS=["#A000FF",
  "#FF9304",
  "#FDE006",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#FF0000",];
const RADIAN=Math.PI/180;
const renderCustomizedLabel=({innerRadius,outerRadius,midAngle,cx,cy,index,percent})=>{
    const radius=innerRadius+(outerRadius-innerRadius)*0.5;
    const x=cx+radius*Math.cos(-midAngle*RADIAN);
    const y=cy+radius*Math.sin(-midAngle*RADIAN);
    return(
        <text 
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start":"end"}
          dominantBaseline="central"
        >
            {`${(percent*100).toFixed(0)}%`}
        </text> 
    );
};

export default function pieChartComponent({data}){
    if(!data?.length){
        return(
            <div
             style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
             }}
            >
                No Transactions!
            </div>
        );
    }
    return(
        <ResponsiveContainer width="100%" height={250}>
            <PieChart width={400} height={400}>
                <Pie 
                  data={data}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                    {data.map((entry,index)=>(
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend iconType="rect" verticalAlign="bottom" />
            </PieChart>
        </ResponsiveContainer>
    );
}