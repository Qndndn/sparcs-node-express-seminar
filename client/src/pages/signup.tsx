import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SAPIBase = "http://localhost:8081";

const SignupPage = () => {
  const movePage = useNavigate();

	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [roomnum, setRoomnum] = useState("");


  const signup = () => {
    axios.post( SAPIBase + '/account/signup', { id, password, name, roomnum } )
      .then(()=>{
        window.alert("Your account is successfully created. Please login again.");
        movePage("../login");
      })
      .catch((e)=>console.log(e));
    };

  return (
    <div className={"SignupPage"}>
      <h2>Sign up</h2>
      
      <div className={"signup"}>
        Id:{" "}
        <input type="text" id="id" onChange={(e) => setId(e.target.value)}/>
        Password:{" "}
        <input type="text" id="passward" onChange={(e) => setPassword(e.target.value)}/>
        Name:{" "}
        <input type="text" id="name" onChange={(e) => setName(e.target.value)}/>
        Roomnum:{" "}
        <input type="text" id="roomnum" onChange={(e) => setRoomnum(e.target.value)}/>
        <br />

        <button type="button" id="signup" onClick={signup}>회원가입</button>
        </div>

    </div>
  );
};

export default SignupPage;