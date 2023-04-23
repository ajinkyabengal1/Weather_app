import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import './Graph.css';
// It gets the graph:
//  - it's based on MAX temp
//  - eah 3 hrs for the next 24 hrs
function GetGraph (props) {

    return (
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart
          data={props.forecast3hrs}
          margin={{ top: 20, right: 30, left: 25, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis key={Math.random()} dataKey="time" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="max"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
            label={{
              fill: "black",
              fontSize: 15,
              position: "top"
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );

}

export default GetGraph;
