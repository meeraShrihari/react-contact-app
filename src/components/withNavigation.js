import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const  withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} location={useLocation()} />;
} 

export default withNavigation;