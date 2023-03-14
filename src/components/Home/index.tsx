import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { TypeAnimation } from "react-type-animation";
import "./index.scss";
import "./portfos";
import portfos from "./portfos";
import skills from "./skills";
import ContactForm from "./ContactForm";

function Home() {
  const [animationOneStatus, setanimationOneStatus] = useState(false);
  const [animationTwoStatus, setanimationTwoStatus] = useState(false);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div className="home-body">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#home">Harris</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#portfolio">Portfolio</Nav.Link>
              <Nav.Link href="#experience">Experience</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="home-container" id="about">
        <div className="home-intro">
          <Row>
            <Col lg="8" className="home-intro-left">
              <TypeAnimation
                sequence={[
                  "Hi, I am Harris.", // Types 'One'
                  500,
                  () => {
                    setanimationOneStatus(true);
                  },
                ]}
                wrapper="div"
                deletionSpeed={75}
                cursor={false}
                repeat={0}
                className="home-intro-title"
              />
              {animationOneStatus && (
                <TypeAnimation
                  sequence={[
                    "I am a Front", // Deletes 'One' and types 'Two'
                    300, // Waits 2s
                    "I am a Full Stack Developer.",
                    500,
                    () => {
                      setanimationTwoStatus(true);
                    },
                  ]}
                  wrapper="div"
                  speed={60}
                  cursor={false}
                  repeat={0}
                  className="home-intro-title"
                />
              )}
              {animationTwoStatus && (
                <TypeAnimation
                  sequence={[
                    "A self-taught Web Developer with 5+ years project management and client-facing experience. A highly motivated, passionate and dedicated developer and successfully turned my interest in coding into a career in less than a year of self-learning.", // Types 'One'
                  ]}
                  wrapper="p"
                  speed={60}
                  cursor={false}
                  repeat={0}
                  className="home-intro-decription"
                />
              )}
            </Col>
            <Col lg="4" className="home-intro-right">
              <Image
                fluid
                src="images/home/developer_icon.png"
                roundedCircle={true}
              />
            </Col>
          </Row>
        </div>

        <div className="home-skill">
          <h2>Skills</h2>
          <Row>
            {skills.map((skill, index) => {
              return (
                <Col xl="3" lg="4" xs="6">
                  <Card
                    style={{ width: "15rem" }}
                    className={skill.className + " home-skill-card"}
                  >
                    <Card.Img src={skill.img} className="home-skill-img" />
                    <p>{skill.name}</p>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>

        <div id="portfolio" className="home-porto">
          <h2>Portfolio</h2>
          <Row>
            {portfos.map((portfo, index) => {
              return (
                <>
                  {index % 5 === 0 && windowSize[0] >= 1200 && (
                    <Col xl="2"></Col>
                  )}
                  <Col xl="4" lg="6">
                    <Card>
                      <Card.Img variant="top" src={portfo.img} />
                      <Card.Body>
                        <Card.Title>{portfo.title}</Card.Title>
                        {/* <Card.Text>{data.text}</Card.Text> */}
                        <div className="card-skill">
                          {portfo.techs.map((tech, index) => {
                            return (
                              <span key={index}>
                                <Badge pill bg="danger">
                                  {tech}
                                </Badge>{" "}
                              </span>
                            );
                          })}
                        </div>
                        {/* <br /> */}
                        {portfo.url && (
                          <a
                            href={portfo.url}
                            className="card-link"
                            target="_blank"
                          >
                            Visit <FontAwesomeIcon icon={faArrowRight} />
                          </a>
                        )}
                        {portfo.path && (
                          <Link to={portfo.path} className="card-link">
                            <>
                              Visit <FontAwesomeIcon icon={faArrowRight} />
                            </>
                          </Link>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                  {index % 5 === 1 && windowSize[0] >= 1200 && (
                    <Col xl="2"></Col>
                  )}
                </>
              );
            })}
          </Row>
          {/* </Container> */}
        </div>

        <ContactForm></ContactForm>
      </Container>
    </div>
  );
}

export default Home;
