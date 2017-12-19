import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import "./FilterBar.css";

export default () => (
  <div className="row center-xs filter-bar">
    <div className="col-xs-4">
      <div className="box">
        <RaisedButton label="All" primary />
      </div>
    </div>
    <div className="col-xs-4">
      <div className="box">
        <RaisedButton label="Active" primary />
      </div>
    </div>
    <div className="col-xs-4">
      <div className="box">
        <RaisedButton label="Completed" primary />
      </div>
    </div>
  </div>
);
