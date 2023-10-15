import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { signup } from "../../services/userService";

import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const [showAlert, setShowAlert] = useState(false);

    const { error } = useAppSelector((state: any) => state.user);
    const dispatch = useAppDispatch();
  

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (password !== confirmpassword) {
          alert("Password mismatch");
          return;
        }
        if (!email || !password || !username) {
          alert("Please fill all the fields");
          return;
        }
        const newUser = {
          username: username,
          email: email,
          password: password,
        };
        dispatch(signup(newUser));
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
      }

      useEffect(() => {
        if (error) {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000); // 3000 milliseconds (5 seconds)
        }
      }, [error]); 

        const formContainerClass = error ? `${style.formContainer} ${style.errorContainer}` : style.formContainer;

        return (
        <div className={formContainerClass} onSubmit={handleSubmit}>
          <p className={style.title}>Register </p>
          <form className={style.form}>
          <input type="text"  placeholder="Username"
            className={style.input}
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
          />
          <input type="email"  placeholder="Email"
            className={style.input}
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
          <input type="password" className={style.input} placeholder="Password"
           onChange={(e) => setPassword(e.target.value)} 
           value={password} 
           />
            <input type="password" className={style.input} placeholder="Confirm password"
           onChange={(e) => setConfirmpassword(e.target.value)} 
           value={confirmpassword} 
           />
          <button className={style.formBtn}>Register</button>
        </form>
        {showAlert && (
          <Alert variant="danger" className="mt-1">
            {error}
          </Alert>
        )}
        <p className={style.signUpLabel}>
          Already have an account?
          <Link to='/login' className={style.signUpLink}>Log in
          </Link>
        </p>
      </div>
    );
}

export default RegisterForm;