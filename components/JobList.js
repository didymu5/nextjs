import React from "react";

const JobList = ({ jobs }) => {
  return (
    <ul>
      {jobs.map(data => {
        return <li key={data.id}>{data.title}</li>;
      })}
    </ul>
  );
};

export default JobList;