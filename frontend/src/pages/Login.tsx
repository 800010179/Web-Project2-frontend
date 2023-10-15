
import LoginForm from "../components/Login/LoginForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Welcome from "../components/Welcome/Welcome"

const Login = () => {

    return (
      <>
      <Container fluid>
        <Row className="d-flex align-items-center">
          <Col xs={12} md={6}>
            <Welcome />
          </Col>
          <Col xs={12} md={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
    );

}

export default Login;