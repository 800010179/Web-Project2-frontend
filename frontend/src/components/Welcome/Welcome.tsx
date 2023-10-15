//css
import welcome from "./style.module.css";
//bootstrap
import Container from "react-bootstrap/Container";

const Welcome = () => {
  return (
    <>
      <Container fluid>
        <div className={`${welcome.WelcomeWrapper} `}>
          <div className={`${welcome.texts} d-none d-sm-block`}>
            <h2 style={{ textTransform: "uppercase" }}>Welcome</h2>
            <p className={welcome.paragraph}>
              Welcome to the Music App! This is a place where you can share reviews from your
              favorite songs with your friends and family. You can also discover new
              songs and artists. Enjoy!
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Welcome;
