import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Welcome from "../components/Welcome/Welcome"
import RegisterForm from "../components/Register/RegisterForm";

const Register = () => {

    return (
      <>
      <Container fluid>
        <Row className="d-flex align-items-center">
          <Col xs={12} md={6}>
            <Welcome />
          </Col>
          <Col xs={12} md={6}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </>
    );

}

export default Register;