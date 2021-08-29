import React,{useState,useEffect} from 'react';
import './App.css';
import SyncLoader from "react-spinners/SyncLoader";
import Badge from 'react-bootstrap/Badge';
import { css } from "@emotion/react";



const App=()=>{


  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);



  const loadUsers = async() => {
            console.log('before');
            const response = await fetch("https://reqres.in/api/users?page=1");
            const jsonResponse = await response.json();
            setUsers(jsonResponse.data);
  };


  const override = css`
  display: flex;
  justify-content:center;
  margin-top:-100px;
  border-color: red;
`;


  function apiRequest(){
    return new Promise((resolve) => setTimeout(resolve,3000));
  }
  


  useEffect(() =>{
    if(loading){
      apiRequest().then(()=>{
        setLoading(false);
        loadUsers();
      });
    }
  },[loading]); 

  
  const onbuttonClick=()=>{
    setLoading(true)
  }

  

  return (
    <>
    
    <nav className="navbar">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">api</span>
            <button className="button" onClick={!loading?onbuttonClick:loadUsers}>Get Users</button>
          </div>
    </nav>


<div className="container-fluid mt-5">
  <div class="row">


  {
      loading ?<>Data will be displayed in a while....<br></br><br></br><br></br><br></br><br></br><SyncLoader 
          color={'#055052'} 
          loading={loading} 
          size={20} 
          css={override}
      />
      </>
      
    :
    (
      users.map((curElem) => {
        return(
          <div className="col-10 col-md-4 mb-2 px-2">
            <div class="card mx-auto">
            <Badge bg="white" text="dark">
                  {curElem.id}
                </Badge>
              <div class="align-items-center">
              

                <div class="image" style={{textAlign:'center'}}>
                  <img src={curElem.avatar} alt="user_image"/> 
                  <h5>{curElem.first_name} {curElem.last_name}</h5>
                  <p><i>{curElem.email}</i></p>
                </div>
              </div>
            </div>
          </div>
        )
      })
    )  
    }
    
  </div>
</div>       
    </>
            
  );
  
};



export default App;
