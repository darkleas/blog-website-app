import { useParams } from "react-router-dom";
import RightSide from "../components/RightSide";
import Message from "../components/Message";
import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import LoadingArticle from "../components/LoadingArticle";
import AddComment from "../components/AddComment";
import { useHistory } from "react-router-dom";

function Makale(props) {
  const [loading, setLoading] = useState(false);
  const [posts, setPost] = useState([]);
  const [comments, setComment] = useState([]);
  const [user, setUser] = useState([]);

  const history = useHistory();

  let articleid = 0;
  let commentlength = 0;
  let liked = false;

  const { url } = useParams();
  const urlx = window.location.pathname.split("/").pop();
  useEffect(() => {
    setLoading(true);


    const fetchData1 = () => {
      fetch("http://localhost:8000/api/post_list/",{
        method: "GET"
      })
        .then((res) => res.json())
        .then(
          (data) => (
            setPost(data),
            data.filter((i) => i.url === url).length != 0
              ? setPost(data.filter((i) => i.url === url))
              : history.push("/404/")
          )
        );
        
    };
    const fetchData2 = () => {
      fetch("http://localhost:8000/api/comment_list/",{
        method: "GET"
      })
        .then((res) => res.json())
        .then((data) => setComment(data));
    };
    fetchData1();
    fetchData2();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    fetch("http://localhost:8000/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }) .then((i) => i.json())
    .then((x) => setUser(x));
  }, [urlx]);

  function AddCommentz(e) {
    fetch("http://localhost:8000/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((i) => i.json())
      .then((x) => setUser(x));
    const postData = async () => {
      fetch("http://localhost:8000/api/comment_list/",{
        method: "GET"
      })
        .then((res) => res.json())
        .then((data) => setComment(data));
      await fetch("http://localhost:8000/api/comment_list/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({
          text: String(e["text"]),
          post: parseInt(articleid),
          user: parseInt(user["id"]),
          username: String(e["username"]),
        }),
      });
      fetch("http://localhost:8000/api/comment_list/",{
        method: "GET"
      })
        .then((res) => res.json())
        .then((data) => setComment(data));
    };
    postData();
  }
  function likethearticle() {

    const heart = document.querySelector(".fa-heart");
    const likespan = document.querySelector("#likespan");
    if (user["id"]) {
      if (heart.classList.contains("liked")) {
        heart.classList.remove("liked");
        likespan.innerHTML = parseInt(likespan.innerHTML) - 1;

        fetch("http://localhost:8000/api/remove_like_post/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          body: JSON.stringify({
            articleid: posts[0].id,
            userid: user["id"],
          }),
        });
      } else {
        heart.classList.add("liked");
        likespan.innerHTML = parseInt(likespan.innerHTML) + 1;

        fetch("http://localhost:8000/api/like_post/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          body: JSON.stringify({
            articleid: posts[0].id,
            userid: user["id"],
          }),
        });
      }
    } else {
      document
        .querySelector(".bottom-alert")
        .classList.toggle("open-bottom-alert");
      document.querySelector(".bottom-alert").classList.remove("success");
      document.querySelector(".bottom-alert").classList.add("warning");

      document.querySelector("#bottom-alert-text").innerHTML =
        "You have to sign in to like the article";
      setTimeout(() => {
        document
          .querySelector(".bottom-alert")
          .classList.toggle("open-bottom-alert");
      }, 2000);
    }
  }
  function openmessageside() {
    const messageside = document.querySelector("#messages-side");
    const messagesidebg = document.querySelector("#messages-side-bg");

    messageside.classList.toggle("open");
    messagesidebg.classList.toggle("d-block");
  }
  function offmessages() {
    const messageside = document.querySelector("#messages-side");
    const messagesidebg = document.querySelector("#messages-side-bg");

    messageside.classList.toggle("open");
    messagesidebg.classList.toggle("d-block");
  }
  return (
    <main>
      <div className="container" style={{ marginTop: "6rem" }}>
        <div className="col-md-12">
          <div className="row">
            <div className="mb-4 col-lg-8">
              {loading ? (
                <LoadingArticle />
              ) : (
                posts
                  .filter((i) => i.url === url)
                  .map((i) => (
                    <article key={i.id}>
                      <>
                        <img
                          alt={i.title}
                          src={i.img}
                          className="article-img"
                        />
                        <p style={{ display: "none" }}>{(articleid = i.id)}</p>
                        <div className="article-text">
                          <div className="text-center">
                            <span className="span">
                              Created Date {i.created_date} by Burhan Kocadağ
                            </span>
                            <h1>{i.title}</h1>
                          </div>
                          <div>{ReactHtmlParser(i.description)}</div>
                          <br></br>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={likethearticle}
                          >
                            <span id="likespan">{i.likes.length}</span>
                            <i
                              className={`fas fa-heart ${
                                i.likes.filter((i) => i === user.id) != ""
                                  ? "liked"
                                  : ""
                              }`}
                            ></i>{" "}
                          </span>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "0",
                              width: "100%",
                            }}
                          ></div>
                          <span onClick={openmessageside}>
                            <span
                              id="commentspan"
                              style={{
                                marginLeft: "1.5rem",
                                cursor: "pointer",
                              }}
                            >
                              {
                                comments.filter((e) => e.post === articleid)
                                  .length
                              }
                            </span>
                            <i className="fas fa-comments"></i>
                          </span>
                        </div>
                      </>
                    </article>
                  ))
              )}
            </div>
            <div className="col-lg-4">
              <RightSide categories={props.categories} />
            </div>
          </div>
        </div>
      </div>
      <img className="heart-gif"></img>
      <div id="messages-side-bg" onClick={openmessageside}></div>
      <div id="messages-side">
        <div style={{ position: "relative" }}>
          {posts.map((i) => (
            <>
              <div id="article-message">
                <div style={{ display: "flex" }}>
                  <img src={i.img} />
                  <p>{i.title}</p>
                </div>
              </div>
              <hr />
              <div
                className="p-2 message-side-messages"
                style={{ height: "500px", overflowY: "scroll" }}
              >
                {comments.filter((i) => i.post === articleid).length != 0 ? (
                  comments
                    .sort((a, b) => (a.id < b.id ? 1 : -1))
                    .filter((i) => i.post === articleid)
                    .map(
                      (i) => (
                        (commentlength = commentlength + 1),
                        (
                          <Message
                            key={i.id}
                            date={i.created_date}
                            user={i.user}
                            username={i.username}
                            text={i.text}
                          />
                        )
                      )
                    )
                ) : (
                  <div id="comments-alert">
                    <span>There is no comments</span>
                  </div>
                )}
              </div>
              <AddComment AddComment={AddCommentz} id={articleid} />
            </>
          ))}
          <i class="fas fa-times delete" onClick={offmessages}></i>
        </div>
      </div>
    </main>
  );
}
export default Makale;
