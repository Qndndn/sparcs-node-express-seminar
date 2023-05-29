import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SAPIBase = "http://localhost:8081";
const movePage = useNavigate();

const LoginPage = () => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    axios.post( SAPIBase + '/account/login', { id, password } )
      .then(()=>{
        movePage("../"); // 로그인 성공시 페이지 이동 ?
      })
      .catch((e)=>console.log(e));
  };

  return (
    <div className={"LoginPage"}>
      <h2>Login</h2>
      
      <div className={"login"}>
        Id:{" "}
        <input type="text" id="id" onChange={(e) => setId(e.target.value)}/>
        Password:{" "}
        <input type="text" id="passward" onChange={(e) => setPassword(e.target.value)}/>
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