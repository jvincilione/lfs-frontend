/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
// import Maps from "views/examples/Maps.jsx";
import Register from "views/users/CreateUser.jsx";
import Login from "views/users/Login.jsx";
import UserList from "views/users/UserList.jsx";
import UserDetails from "./views/users/UserDetails";
import CompanyList from "./views/companies/CompanyList";
import CompanyDetails from "./views/companies/CompanyDetails";
import CompanyCreate from "./views/companies/CompanyCreate";
import JobDetails from './views/jobs/JobDetails';
import JobList from './views/jobs/JobList';
import PrivacyPolicy from './views/privacy-policy';
// import Icons from "views/examples/Icons.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    roles: ["administrator"],
    layout: "/admin"
  },
  {
    path: "/company/:id",
    component: CompanyDetails,
    layout: "/admin"
  },
  {
    path: "/create-company",
    component: CompanyCreate,
    layout: "/admin"
  },
  {
    path: "/company",
    name: "Companies",
    icon: "ni ni-building text-blue",
    component: CompanyList,
    roles: ["administrator", "company admin", "staff"],
    layout: "/admin"
  },

  {
    path: "/job/:id",
    component: JobDetails,
    layout: "/admin"
  },
  {
    path: "/job",
    name: "Jobs",
    icon: "ni ni-delivery-fast text-blue",
    component: JobList,
    roles: ["administrator"],
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },

  {
    path: "/user/:id",
    component: UserDetails,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: UserList,
    layout: "/admin",
    roles: ["administrator", "company admin"]
  },
  {
    path: "/user-profile",
    component: UserDetails,
    layout: "/admin"
  },
  {
    path: "/login",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Create User",
    icon: "ni ni-circle-08 text-red",
    component: Register,
    layout: "/admin",
    roles: ["administrator", "company admin"]
  },
  {
    path: "/privacy",
    component: PrivacyPolicy,
    layout: "/auth"
  },
  {
    path: "/",
    component: Index,
    layout: "/admin"
  },
];
export default routes;
