//  presentation component
import Index from "./components/contents/Index.jsx";
import ProfileContainer from "./components/contents/Profile/ProfileContainer.js";
// import Maps from "./components/contents/views/Maps.jsx";
import RegisterContainer from "./components/contents/Login/RegisterContainer.js";
import Login from "./components/contents/Login/Login.jsx";
import PasswordResetToken from "./components/contents/Login/PasswordResetToken.jsx";
import PasswordReset from "./components/contents/Login/PasswordReset.jsx";
import Logout from "./components/contents/views/Logout.jsx";
// import Tables from "./components/contents/views/Tables.jsx";
// import Icons from "./components/contents/views/Icons.jsx";

//  table component
//  server
import ServerContainer from "./components/contents/Server/ServerContainer.js";
import ServerRegistrationModalContainer from "./components/contents/Server/ServerRegistrationModalContainer.js";
import ServerInformationModalContainer from "./components/contents/Server/ServerInformationModalContainer.js";
//  employee
import EmployeeContainer from "./components/contents/Employee/EmployeeContainer.js";
import EmployeeRegistrationModalContainer from "./components/contents/Employee/EmployeeRegistrationModalContainer.js";
import EmployeeInformationModalContainer from "./components/contents/Employee/EmployeeInformationModalContainer.js";
//  application
import ApplicationContainer from "./components/contents/Application/ApplicationContainer.js";
import ApplicationRegistrationModalContainer from "./components/contents/Application/ApplicationRegistrationModalContainer.js";
import ApplicationInformationModalContainer from "./components/contents/Application/ApplicationInformationModalContainer.js";
//  application instance
import ApplicationInstanceContainer from "./components/contents/ApplicationInstance/ApplicationInstanceContainer.js";
import ApplicationInstanceRegistrationModalContainer from "./components/contents/ApplicationInstance/ApplicationInstanceRegistrationModalContainer.js";
import ApplicationInstanceInformationModalContainer from "./components/contents/ApplicationInstance/ApplicationInstanceInformationModalContainer.js";
//  log
import LogContainer from "./components/contents/Log/LogContainer.js";
//  all auto action in the 1st time component active
import Action from "./redux/Action/index.js";


export default [{
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    type: "",
    role: "/admin",
    section: "dynamic"
  },
  {
    path: "/application-instances",
    name: "Application Instances",
    icon: " ni ni-archive-2 text-blue",
    component: ApplicationInstanceContainer,
    layout: "/admin",
    type: "table",
    Action: Action.ApplicationInstance,
    header: [
      "LAST UPDATE",
      "APPLICATION INSTANCE NAME",
      "APPLICATION",
      "APP CODE",
      "STATUS",
      "ACTION"
    ],
    RegistrationModal: ApplicationInstanceRegistrationModalContainer,
    DetailModal: ApplicationInstanceInformationModalContainer,
    role: "/admin",
    section: "dynamic",
  },
  {
    path: "/log-reports",
    name: "Log Reports",
    icon: " ni ni-paper-diploma text-blue",
    component: LogContainer,
    layout: "/admin",
    type: "table",
    Action: Action.Log,
    header: [
      "LOG DATE",
      "PROJECT",
      "CLASS",
      "LINE",
      "MESSAGE",
      "STATUS",
      "ACTION"
    ],
    RegistrationModal: ServerRegistrationModalContainer,
    DetailModal: ServerInformationModalContainer,

    section: "dynamic",

    role: "/admin"
  },
  {
    path: "/servers",
    name: "Servers",
    icon: " ni ni-money-coins text-blue",
    component: ServerContainer,
    layout: "/admin",
    type: "table",
    Action: Action.Server,
    header: [
      "CREATE TIME",
      "SERVER NAME",
      "IP",
      "STATUS",
      "ACTION"
    ],
    RegistrationModal: ServerRegistrationModalContainer,
    DetailModal: ServerInformationModalContainer,
    role: "/admin",
    section: "static",
  },
  {
    path: "/applications",
    name: "Applications",
    icon: " ni ni-app text-blue",
    component: ApplicationContainer,
    layout: "/admin",
    type: "table",
    Action: Action.Application,
    header: [
      "LAST UPDATE",
      "NAME",
      "CATEGORY",
      "APPLICATION INSTANCE",
      "STATUS",
      "ACTION"
    ],
    RegistrationModal: ApplicationRegistrationModalContainer,
    DetailModal: ApplicationInformationModalContainer,
    role: "/admin",
    section: "static",
  },
  {
    path: "/employees",
    name: "Employees",
    icon: "ni ni-circle-08 text-pink",
    component: EmployeeContainer,
    layout: "/admin",
    type: "table",
    Action: Action.Employee,
    header: [
      "NAME",
      "EMAIL",
      "PHONE",
      "ROLE",
      "STATUS",
      "ACTION"
    ],
    RegistrationModal: EmployeeRegistrationModalContainer,
    DetailModal: EmployeeInformationModalContainer,
    isEndRoute: true,
    role: "/admin",
    section: "static",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: ProfileContainer,
    layout: "/admin",
    type: "",
    role: "/admin",
    section: "profile",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  //   type: "",
  // role: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-square-pin text-orange",
  //   component: Maps,
  //   layout: "/admin",
  //   type: "",
  // role: "/admin"
  // },

  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  //   type: "",
  // role: "/admin"
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    type: "",
    role: "/guest",
    section: "profile",
  },
  {
    path: "/logout",
    name: "Back To Login",
    icon: "ni ni-key-25 text-info",
    component: Logout,
    layout: "/admin",
    type: "",
    role: "/admin",
    section: "profile",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: RegisterContainer,
    layout: "/auth",
    type: "",
    role: "/guest",
    section: "profile",
  },
  {
    path: "/password-token",
    name: "Password Token",
    icon: "ni ni-circle-08 text-pink",
    component: PasswordResetToken,
    layout: "/auth",
    type: "",
    role: "/guest",
    section: "profile",
  },
  {
    path: "/password-reset",
    name: "Password Reset",
    icon: "ni ni-circle-08 text-pink",
    component: PasswordReset,
    layout: "/auth",
    type: "",
    role: "/guest",
    section: "profile",
  },
];