
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import style from "./style.module.css";


//redux
import { logout } from "../../redux/userReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import User from "../../interfaces/User";
import { useNavigate } from 'react-router-dom';


function Header() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState(null);
  const user = useAppSelector((state: any) => state.user);
  const user2: User = localStorage.getItem('user') as User;
  const navigate = useNavigate()


  useEffect(() => {
    if (user) {
      setUsername(user.user.username);
    }
  }, [user, dispatch]);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  const navigateProfile = () => {
    navigate(`/user/${user.user.id}`)
  }
  const navigateHome = () => {
    navigate("/")
  }

  
  return (
    // <Navbar bg="light" expand="lg">
    <Navbar expand="lg" className={style.header}>
      <Container fluid>
        
        <Navbar.Brand className={style.title} href="#/">
          Music App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"  />
        <Navbar.Collapse id="navbarScroll" className={style.collapse}>
          <Nav 
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "300px" }}
            navbarScroll
          >{user2 ? (
          <>
          <Nav.Link className={style.link} onClick={navigateHome}>
          Home
        </Nav.Link>
        </>
        ) : (
          <>
          </>
        )
          }    
          </Nav>
          {user2 && (
            <>
              <Navbar.Text>Signed in as: </Navbar.Text>
              <Nav.Link className={style.link} onClick={navigateProfile}>
                 {username}
              </Nav.Link>
              <Button onClick={handleLogOut} className={style.btn}>
                Logout
            </Button>
              
            </>
          )}  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

