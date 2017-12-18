import React from "react";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import RaisedButton from "material-ui/RaisedButton";

export default () => (
  <Toolbar>
    <ToolbarGroup>
      <RaisedButton label="All" primary />
    </ToolbarGroup>
    <ToolbarGroup>
      <RaisedButton label="Active" primary />
    </ToolbarGroup>
    <ToolbarGroup>
      <RaisedButton label="Completed" primary />
    </ToolbarGroup>
  </Toolbar>
);
