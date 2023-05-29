import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SAPIBase = "http://172.17.196.164:8084";

const LoginPage = () => {
  const movePage = useNavigate();

  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    axios.post( SAPIBase + '/account/login', { id, password } )
      .then((data)=>{
      alert(data.status)
      if (data.status==200) {movePage("../404");}
      else {
        alert("로그인 실패")
      } // 로그인 성공시 페이지 이동 ? 
      })
      .catch((e)=>console.log(e));
  };

  return (
    <div className={"LoginPage"}>
      <h2>Login</h2>
      
      <div className={"login"}>
        Id:{" "}
        <input type="text" id="id" onChange={(e) => setId(e.target.value)}/>
        <br/>        
        Password:{" "}
        <input type="text" id="password" onChange={(e) => setPassword(e.target.value)}/>
        <br />
        <button type="button" id="login" onClick={login}>Login</button>
      </div>

      <div className="signup">
				<button id="signup" onClick={() => movePage("../signup")}>Sign Up</button>
			</div>
    </div>

  );
};

export default LoginPage;