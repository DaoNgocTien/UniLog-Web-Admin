//  presentation component
import Index from "./components/contents/Index.jsx";
import Profile from "./components/contents/views/Profile.jsx";
import Maps from "./components/contents/views/Maps.jsx";
import Register from "./components/contents/views/Register.jsx";
import Login from "./components/contents/views/Login.jsx";
import Tables from "./components/contents/views/Tables.jsx";
import Icons from "./components/contents/views/Icons.jsx";

//  table component
//  server
import ServerContainer from "./components/contents/Server/ServerContainer.js";
import NewServerModalContainer from "./components/contents/Server/NewServerModalContainer.js";
import ServerDetailModal from "./components/contents/Server/ServerDetailModal.js";
//  application
import ApplicationContainer from "./components/contents/Application/ApplicationContainer.js";
import ApplicaionRegistrationModalContainer from "./components/contents/Application/RegistrationModalContainer.js";
import ApplicationDetailModalContainer from "./components/contents/Application/DetailModalContainer.js";

//  all auto action in the 1st time component active
import Action from "./redux/Action/index.js";


export default [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    type: ""
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    type: ""
  },
  {
    path: "/servers",
    name: "Servers",
    icon: " ni ni-money-coins text-blue",
    component: ServerContainer,
    layout: "/admin",
    type: "table",
    Action: Action.Server,
    header : [
      "CREATE TIME",
      "SERVER NAME",
      "IP",
      "STATUS",
      "ACTION"
    ],
    RegistrationModal: NewServerModalContainer,
    DetailModal: ServerDetailModal

  },
  {
    path: "/applications",
    name: "Applications",
    icon: " ni ni-money-coins text-blue",
    component: ApplicationContainer,
    layout: "/admin",
    type: "table",
    Action: Action.Server,
    header : [
      "LAST UPDATE",
      "NAME",
      "CATEGORY",
      "STATUS",
      "LINK",      
      "ACTION"
    ],
    RegistrationModal: ApplicaionRegistrationModalContainer,
    DetailModal: ApplicationDetailModalContainer

  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    type: ""
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    type: ""
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    type: ""
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    type: ""
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    type: ""
  }
];
