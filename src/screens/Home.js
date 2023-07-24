import React, { useRef, useState, useEffect } from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { Row, Container, Col, Nav, Card, CardGroup } from "react-bootstrap";
// Bootstrap CSS
import FetureInforLeft from "../components/FetureInforLeft";

const Home = () => {
  const [username, setUserName] = useState(null);
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    setIsRemember(localStorage.getItem("isRemember"));
    if (isRemember) {
      setUserName(localStorage.getItem("username"));
    } else {
      setUserName(sessionStorage.getItem("username"));
    }
  }, [isRemember]);
  return (
    <div>
      <Menu />
      <Row>
        <Container
          fluid
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1462524500090-89443873e2b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80)`,
            height: "90vh",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            backgroundSize: "cover",
          }}
        >
          <Row>
            <Col
              xs={4}
              style={{
                color: "white",
                marginTop: "15%",
                paddingLeft: "7%",
                textAlign: "right",
              }}
            >
              <h1>MAKE YOURSELT BETTER</h1>
              <br />
              <h3>Change your life by</h3>
              <h3>little things.</h3>
              <Nav.Link href={username ? "/homepage" : ""}>
                <button className="btn btn-success rounded">
                  Getting started
                </button>
              </Nav.Link>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row
        className="justify-content-center"
        style={{
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          marginBottom: "2vh",
        }}
      >
        <Container style={{ margin: "2vh" }}>
          <Row style={{ textAlign: "center" }}>
            <Col xs={12} md={12}>
              <h1>Social Proof</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={2} style={{ marginLeft: "15px" }}>
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2017/11/10/05/04/facebook-2935402_1280.png"
                  alt="Facebook"
                />
              </div>
            </Col>
            <Col xs={12} sm={2} style={{ marginLeft: "15px" }}>
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2018/11/13/22/01/instagram-3814080_1280.png"
                  alt="Instagram"
                />
              </div>
            </Col>
            <Col xs={12} sm={2} style={{ marginLeft: "15px" }}>
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2017/03/24/07/28/twitter-2170426_1280.png"
                  alt="Twitter"
                />
              </div>
            </Col>
            <Col xs={12} sm={2} style={{ marginLeft: "15px" }}>
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2021/12/27/10/50/telegram-6896827_1280.png"
                  alt="Telegram"
                />
              </div>
            </Col>
            <Col xs={12} sm={2} style={{}}>
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
                  alt="Github"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
      <div style={{ margin: "5vh" }}>
        <FetureInforLeft
          img="https://cdn.pixabay.com/photo/2023/05/25/11/28/fox-8016957_1280.jpg"
          text="Ứng dụng cho phép bạn tạo và quản lý nhiều danh sách công việc khác nhau. Bạn có thể tạo danh sách cho các lĩnh vực khác nhau như công việc cá nhân, công việc dự án, mục tiêu hàng ngày, và nhiều hơn nữa. Điều này giúp bạn tổ chức công việc một cách rõ ràng và dễ dàng."
          title="Tạo danh sách công việc"
        />
      </div>
      <Row
        style={{
          marginBottom: "2vh",
        }}
      >
        <Container>
          <Row style={{ height: "5vh", marginBottom: "20vh" }}>
            <CardGroup>
              <Col xs={12} sm={4}>
                <Card style={{ height: "100%" }}>
                  <Card.Header>
                    <h3>V - BTS</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      "Từ sau khi sử dụng My List, cuộc sống của tôi đã trở nên
                      tươi đẹp. Hãy sử dụng My List để trở nên thành công"
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={4}>
                <Card style={{ height: "100%" }}>
                  <Card.Header>
                    <h3>Sơn Tùng - MTP</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      "Nhờ lên kế hoạch, những nốt nhạc của tôi trở nên có quy
                      luật và hấp dẫn lạ thường."
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={4}>
                <Card style={{ height: "100%" }}>
                  <Card.Header>
                    <h3>Naruto</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      "Nhờ có My List, tôi đã thực hiện hóa ước mơ trở thành
                      Hokage của mình"
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </CardGroup>
          </Row>
        </Container>
      </Row>

      <Footer />
    </div>
  );
};

export default Home;
