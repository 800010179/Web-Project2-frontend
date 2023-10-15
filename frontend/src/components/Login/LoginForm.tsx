import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { signin } from "../../services/userService";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const { error } = useAppSelector((state: any) => state.user);
    const dispatch = useAppDispatch();


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Please fill all the fields");
            return;
        }
        const loginUser = {
            email: email,
            password: password,
        }
      dispatch(signin(loginUser));

      setEmail("");
      setPassword("");

  };

  // When 'error' changes, show the alert and set a timeout to hide it after 5 seconds
  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 3000 milliseconds (3 seconds)
    }
  }, [error]);
  
    return (
        <div className={style.formContainer} onSubmit={handleSubmit}>
        <p className={style.title}>Log In</p>
        <form className={style.form}>
          <input type="email"  placeholder="Email"
            className={style.input}
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
          <input type="password" className={style.input} placeholder="Password"
           onChange={(e) => setPassword(e.target.value)} 
           value={password} 
           />
          <p className={style.pageLink}>
            <span className={style.pageLinkLabel}>Forgot Password?</span>
          </p>
          <button className={style.formBtn}>Log in</button>
        </form>
        {showAlert && (
          <Alert variant="danger" className="mt-1">
            {error}
          </Alert>
        )}
        <p className={style.signUpLabel}>
          Don't have an account?
          <Link to='/register' className={style.signUpLink}>Sign up
          </Link>
        </p>
      </div>
    );
}

export default LoginForm;