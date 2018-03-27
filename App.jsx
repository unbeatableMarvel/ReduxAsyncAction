import React from 'react';
import {applyMiddleware,createStore} from 'redux';
import { createLogger } from 'redux-logger'//for beatiful log you can use this redux logger
import thunk from "redux-thunk";
import axios from "axios";
import promise from 'redux-promise-middleware';

//for promise handling you have to install "npm i redux-promise-middleware -S".

const initialState={
  fetching:false,
  fetched:false,
  users:[],
  error:null
}

const reducer=(state=initialState,action)=>
{
  console.log("jjjjj",action);
  switch (action.type)
  {

    case "FETCH_USER_PENDING":{
      return {...state,fetching:true}
      break;
    }
    case "FETCH_USER_FULLFILLED":{
      return {...state,fetching:false,fetched:true,users:action.payload.data}
      break;
    }
    case "FETCH_USER_ERROR":{
       return {...state,fetching:false,error:action.payload}
      break;
    }
  }
 return state;
}


const middleware=applyMiddleware(promise(),thunk,createLogger());
const store=createStore(reducer,middleware);
//one way of calling the api without using the promise redux
/*store.dispatch((dispatch)=>{

  dispatch({"type":"Fetch_User_Name"})
  axios.get("http://rest.learncode.academy/api/wstern/users")
  .then((response)=>{
    dispatch({"type":"Recieved_Response",payload:response.data})
  }).catch((err)=>{
     dispatch({"type":"Fetch_User_ERROR",payload:err})
  })
});
*/

//promise with redux
store.dispatch({
  type:"FETCH_USER",
  payload:axios.get("http://rest.learncode.academy/api/wstern/users")

})

class App extends React.Component {
 render() {
    return (
      
      <div>
      Redux Async Action Application
      </div>
      
      );
  }
}


export default App;


