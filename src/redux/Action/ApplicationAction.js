import { ServerActionTypes } from "../constants";
// import fetch from "cross-fetch";
// import APISettings from "../Url/APISettings";

// const RequestFetchAPI = requestFetching => {
//   return {
//     type: ServerActionTypes.REQUEST_FETCH_API,
//     payload: requestFetching
//   };
// };

// const StoreServerList = (serverList = []) => {
//   return {
//     type: ServerActionTypes.STORE_SERVER_LIST,
//     payload: serverList
//   };
// };

const StoreServerMasterList = (currentDataList = []) => {
  //console.log("StoreServerMasterList", currentDataList);
  let servermasterList = [];
  if (currentDataList.length > 0) {
    //console.log("StoreServerMasterList 2", currentDataList);
    currentDataList.map(server => {
      return servermasterList.push({ id: server.id, name: server.server_name });
    });
  }

  return {
    type: ServerActionTypes.STORE_SERVER_MASTER_LIST,
    payload: servermasterList
  };
};

const GetServerList = () => {
  return async (dispatch, getState) => {
    //  curent Server data in store
    // console.log(
    //   "State before GetServerList: " + JSON.stringify(getState().Server)
    // );
    try {
      //  inform store we are going to fetch some data
      //  await dispatch(RequestFetchAPI(true));

      //  if fetching status of Server component is true
      if (getState().Server.fetchStatus) {
        // console.log(
        //   "State after requesting fetching: " +
        //     JSON.stringify(getState().Server)
        // );

        //  API call to get Server data
        // const fetchRequest = await fetch(
        //   `${APISettings.BASE_API_URL}/${APISettings.SERVER_API_URL}?company_id=4`,
        //   {
        //     method: "get",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization:
        //         "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEwMjIiLCJuYmYiOjE1NzUxODgwOTksImV4cCI6MTU3NTc5Mjg5OSwiaWF0IjoxNTc1MTg4MDk5fQ.f0hQ-13vceS0TYoY6y46CCZ3SAazRLir15K7kIGXtX4"
        //     }
        //   }
        // );
        // console.log(
        //   "Response data after requesting get data: " +
        //     JSON.stringify(fetchRequest)
        // );

        //  the fetch() API only rejects a promise when
        //  a “network error is encountered, although this usually means permissions issues or similar.”
        //  =>  response have ok for other invalid HTTP response
        // if (!fetchRequest.ok) {
        //   throw Error(fetchRequest.statusText);
        // }

        //  response data
        //const result = await fetchRequest.json();
        // console.log(
        //   "Data after requesting get data: " + JSON.stringify(result)
        // );

        //  store payloaddata into store
        //await dispatch(StoreServerList(result));
        //  store servers regist as server master
//        console.log(getState().Server.currentDataList);
        await dispatch(
          StoreServerMasterList(getState().Server.currentDataList)
        );
        // console.log(
        //   "State after requesting get data: " +
        //     JSON.stringify(getState().Server)
        // );
      }
    } catch (error) {
      console.log("An error occurred.", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      // dispatch(RequestFetchAPI(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().Server)
      // );
    }
  };
};
// const CreateNewServer = () => {
//   return async (dispatch, getState) => {
//     //  curent Server data in store
//     console.log(
//       "State before CreateNewServer: " + JSON.stringify(getState().Server)
//     );
//     try {
//       //  inform store we are going to fetch some data
//       //  await dispatch(RequestFetchAPI(true));

//       //  if fetching status of Server component is true
//       if (getState().Server.fetchStatus) {
//         // console.log(
//         //   "State after requesting fetching: " +
//         //     JSON.stringify(getState().Server)
//         // );

//         //  API call to get Server data
//         const fetchRequest = await fetch(
//           `${APISettings.BASE_API_URL}/${APISettings.SERVER_API_URL}?company_id=4`,
//           {
//             method: "get",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEwMjIiLCJuYmYiOjE1NzUxODgwOTksImV4cCI6MTU3NTc5Mjg5OSwiaWF0IjoxNTc1MTg4MDk5fQ.f0hQ-13vceS0TYoY6y46CCZ3SAazRLir15K7kIGXtX4"
//             }
//           }
//         );
//         // console.log(
//         //   "Response data after requesting get data: " +
//         //     JSON.stringify(fetchRequest)
//         // );

//         //  the fetch() API only rejects a promise when
//         //  a “network error is encountered, although this usually means permissions issues or similar.”
//         //  =>  response have ok for other invalid HTTP response
//         if (!fetchRequest.ok) {
//           throw Error(fetchRequest.statusText);
//         }

//         //  response data
//         //const result = await fetchRequest.json();
//         await fetchRequest.json();
//         // console.log(
//         //   "Data after requesting get data: " + JSON.stringify(result)
//         // );

//         //  renew server list
//         await GetServerList();

//         // console.log(
//         //   "State after requesting get data: " +
//         //     JSON.stringify(getState().Server)
//         // );
//       }
//     } catch (error) {
//       console.log("An error occurred.", error);
//     } finally {
//       //  wherether call API success or fail, inform store fetching status request is done
//       // dispatch(RequestFetchAPI(false));
//       // console.log(
//       //   "State after finish requesting fetch: " + JSON.stringify(getState().Server)
//       // );
//     }
//   };
// };

const ToggleCreateServerModal = (dispatch, getState) => {
  return dispatch({ type: ServerActionTypes.TOGGLE_CREATE_SERVER_MODAL });
};

const ToggleInformationModal = dispatch => {
  return dispatch({
    type: ServerActionTypes.TOGGLE_INFORMATION_MODAL
  });
};

const StoreCurrentSelectedServerActionCreater = id => {
  return {
    type: ServerActionTypes.STORE_CURRENT_SELECTED_SERVER,
    payload: id
  };
};

const StoreCurrentSelectedServer = id => {
  return async (dispatch, getState) => {
    await dispatch(StoreCurrentSelectedServerActionCreater(id));
  };
};

const CreateNewServerActionCreater = server => {
  server = {
    ...server,
    active: true,
    company_id: 1,
    create_date: "2017-12-09T01:30",
    update_date: "2017-12-09T01:30"
  };
  return {
    type: ServerActionTypes.CREATE_NEW_SERVER,
    payload: server
  };
};

const CreateNewServer = server => {
  return async (dispatch, getState) => {
    await dispatch(CreateNewServerActionCreater(server));
  };
};

const Count = () => {
  alert("count");
  return async (dispatch, getState) => {
    await dispatch({type: ServerActionTypes.COUNT});
  };
}
const ApplicationTest = () => {
  alert("APPLICATION_TEST");
  return async (dispatch, getState) => {
    await dispatch({type: ServerActionTypes.APPLICATION_TEST});
  };
}

export default {
  getData: GetServerList,
  createNew: CreateNewServer,
  toggleCreateModal: ToggleCreateServerModal,
  toggleInformationModal: ToggleInformationModal,
  storeCurrentSelectedServer: StoreCurrentSelectedServer,
  count: Count,
  applicationTest: ApplicationTest,

};
