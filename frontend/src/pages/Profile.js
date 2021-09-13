import { useLocation } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Message from "../components/Message";
import LoadingComment from "../components/LoadingComment";
import LoadingProfile from "../components/LoadingProfile";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function Profile() {
  const history = useHistory();

  const { pathname } = useLocation();

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [comment, setComment] = useState([]);
  useEffect(() => {
    const hi2 = async () => {
      setLoading(true);
      await fetch("http://localhost:8000/api/user/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((i) => i.json())
        .then(
          (x) => (
            x["detail"] ? history.push("/") : setUser(x),
            fetch("http://localhost:8000/api/profile_list/",{method:'GET'})
              .then((res) => res.json())
              .then((data) =>
                setProfile(data.filter((i) => i.user === x["id"]))
              ),
            fetch("http://localhost:8000/api/comment_list/",{method:'GET'})
              .then((res) => res.json())
              .then((data) =>
                setComment(data.filter((i) => i.user === x["id"]))
              ),
            fetch("http://localhost:8000/api/post_list/",{method:'GET'})
              .then((res) => res.json())
              .then((data) =>
                setPosts(data.filter((i) => i.likes.find((i) => i === x["id"])))
              )
          )
        );
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    hi2();
  }, [pathname]);

  function messageoptions(e) {
    const accountdropdownz = document.querySelector(
      `#opiton${e.target.classList[2]}`
    );
    accountdropdownz.classList.toggle("d-active");
    setTimeout(() => {
      accountdropdownz.classList.toggle("account-dropdown-animate");
    }, 20);
  }
  function deletethemessage(e) {
    fetch("http://localhost:8000/api/remove_comment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRFToken': Cookies.get('csrftoken'),

        
      },
      body: JSON.stringify({
        user_id: user["id"],
        comment_id: e.target.id,
      }),
    });
    document
      .querySelector("#message" + e.target.id)
      .classList.add("translateX-100");
    setTimeout(() => {
      document.querySelector("#message" + e.target.id).classList.add("d-none");
    }, 500);
    const accountdropdownzx = document.querySelectorAll(`.message-option`);
    var index = 0,
      length = accountdropdownzx.length;

    for (; index < length; index++) {
      accountdropdownzx[index].classList.remove("d-active");
    }
    document
      .querySelector(".bottom-alert")
      .classList.toggle("open-bottom-alert");
    document.querySelector(".bottom-alert").classList.remove("success");
    document.querySelector(".bottom-alert").classList.add("warning");

    document.querySelector("#bottom-alert-text").innerHTML =
      "Message deleted succesfully";
    setTimeout(() => {
      document
        .querySelector(".bottom-alert")
        .classList.toggle("open-bottom-alert");
    }, 2000);
  }
  function profile_img() {
    const img_edit_bg = document.querySelector(".img-editbg");
    img_edit_bg.classList.toggle("d-active");
    const img_edit = document.querySelector(".img-edit");
    img_edit.classList.toggle("d-active");
    setTimeout(() => {
      document.querySelector(".img-edit-form").classList.toggle("scaled");
    }, 10);
  }
  function saveimg() {
    fetch("http://localhost:8000/api/edit_picture/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify({
        user_id: user["id"],
        img: document.querySelector(".img-edit-input").value,
      }),
    })
      .then((i) => i.json())
      .then((data) => (
      data['user_id'] 
      ? 
      ( 
      document.querySelector('.bottom-alert').classList.toggle("open-bottom-alert"),
      document.querySelector('.bottom-alert').classList.remove("success"),
      document.querySelector('.bottom-alert').classList.add(  "success"),
  
      document.querySelector('#bottom-alert-text').innerHTML = "You changed your profile picture successfully",
      setTimeout(() => {document.querySelector('.bottom-alert').classList.toggle("open-bottom-alert")},2000)
      ) 
      :
       ("")
       ));
  }
  return (
    <main className="profile">
      <div className="container" style={{ marginTop: "6rem" }}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4 mb-3 col-sm-12 col-lg-3">
              <div className="left-side">
                <div className="text-center">
                  {!loading ? (
                    profile.map((i) => (
                      <span key={i.id}>
                        <div style={{ position: "relative" }}>
                          <img
                            src={i.profile_pic ? (i.profile_pic) : ("https://i.ibb.co/J3cGYxy/default-user-image.png") }
                            onError={() =>
                              (document.querySelector("#profile-img").src =
                                "https://i.ibb.co/J3cGYxy/default-user-image.png")
                            }
                            className="profile-img" id="profile-img"
                            onClick={profile_img}
                          />
                        </div>
                        <h1 className="profile-username">{user["username"]}</h1>
                        <hr />
                        <div className="col-md-12" style={{padding: '0 1rem'}}>
                          <div className="row">
                            <div className="col-md-6">
                              <span id="likespan">{posts.length}</span>{" "}
                              <i className={`fas fa-heart`}></i>
                            </div>
                            <div className="col-md-6">
                              <span id="commentspan">{comment.length}</span>{" "}
                              <i className="fas fa-comments"></i>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </span>
                    ))
                  ) : (
                    <LoadingProfile />
                  )}
                </div>
              </div>
            </div>
            <div
              className="col-md-8 col-lg-9 col-sm-12"
              style={{ overflowY: "scroll", height: "800px" }}
            >
              <div className="right-side">
                <h5>Your comments </h5>

                {!loading ? (
                  comment.length != 0 ? (
                    comment
                      .sort((a, b) => (a.id < b.id ? 1 : -1))
                      .map((i) => (
                        <div key={i.id} style={{ position: "relative" }}>
                          <Message
                            key={i.id}
                            date={i.created_date}
                            user={i.user}
                            username={i.username}
                            text={i.text}
                            id={i.id}
                          />
                          <i
                            onClick={messageoptions}
                            className={`fas fa-ellipsis-v ${i.id}`}
                          ></i>
                          <div id={`opiton${i.id}`} className="message-option">
                            <span
                              id={i.id}
                              style={{ cursor: "pointer" }}
                              onClick={deletethemessage}
                            >
                              <i id={i.id} className="fas fa-trash-alt"></i>
                              <span id={i.id}>Delete</span>
                            </span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="mt-3" id="comments-alert">
                      <span>There is no comments</span>
                    </div>
                  )
                ) : (
                  <>
                    <LoadingComment />
                    <LoadingComment />
                    <LoadingComment />
                    <LoadingComment />
                    <LoadingComment />
                    <LoadingComment />
                    <LoadingComment />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="img-edit">
        <div className="container">
          <div className="img-edit-form">
            <h5>Edit Profile Picture</h5>
            <hr />
            <br />
            <div id="login" className="scaled">
              <div className="alertz danger login-error">
                <p className="login-error-text">hi</p>
              </div>
              {profile.map((i) => (
                <div key={i.id} style={{ position: "relative" }}>
                  <input
                    className="input img-edit-input"
                    type="text"
                    placeholder="URL of the Image"
                    defaultValue={i.profile_pic}
                    onChange={
                      (e) => 
                      (
                     
                        document.querySelector('.edit-profile-img').setAttribute('src',e.target.value)
                      )
                    }
                  />
                  <br /> <br />
                  <h5>Preview</h5>
                  <hr />
                  <div className="text-center">
                    <img
                      src={i.profile_pic}
                      className="edit-profile-img"
                    />
                  </div>
                  <div className="login-username-error">
                    <i className="fas fa-exclamation-circle"></i>
                  </div>
                </div>
              ))}

              <br />

              <button
                onClick={saveimg}
                id="savebtn"
                className="btn2 w-100 mb-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="img-editbg" onClick={profile_img}></div>
    </main>
  );
}
export default Profile;
