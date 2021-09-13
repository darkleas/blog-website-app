import { useState, useEffect } from "react";

function AddComment(props) {
  const [text, setText] = useState("");
  const [user, setUser] = useState([]);

  const urlx = window.location.pathname.split("/").pop();

  const textareainput = document.querySelector(".textarea");

  const textareaerror = document.querySelector(".textarea-error");
  useEffect(() => {
    fetch("http://localhost:8000/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((i) => i.json())
      .then((x) => setUser(x));
  }, [urlx]);

  function addComment(e) {
    if (user["id"]) {
      if (text === "") {
        textareaerror.classList.add("d-active");

        textareainput.classList.add("error");
      } else {
        textareaerror.classList.remove("d-active");

        textareainput.classList.remove("error");
      }
      const username = user["username"];
      props.AddComment({ text, username });

      setText("");
    } else {
      if (text === "") {
        textareaerror.classList.add("d-active");

        textareainput.classList.add("error");
      } else {
        textareaerror.classList.remove("d-active");

        textareainput.classList.remove("error");
        document
          .querySelector(".bottom-alert")
          .classList.toggle("open-bottom-alert");
        document.querySelector(".bottom-alert").classList.remove("success");
        document.querySelector(".bottom-alert").classList.add("warning");

        document.querySelector("#bottom-alert-text").innerHTML =
          "You have to sign in to send a comment";
        setTimeout(() => {
          document
            .querySelector(".bottom-alert")
            .classList.toggle("open-bottom-alert");
        }, 2000);
      }
    }
  }
  function messageDown(e) {
    if (e.key === 'Enter') {
      addComment()
    }
  }
  return (
    <>
      <div className="add-comment">
        <div className="col-md-12">
          <div className="row" style={{ position: "relative" }}>
            <div className="col-md-8">
              <div style={{ position: "relative" }}>
                <input
                  value={text}
                  placeholder="Message"
                  onKeyDown={messageDown}
                  onChange={(e) => {
                    if (text !== "") {
                      textareainput.classList.remove("error");
                      textareaerror.classList.remove("d-active");
                    }
                    setText(e.target.value);
                  }}
                  className="textarea"
                />
                <div className="textarea-error" style={{ width: "20px" }}>
                  <i class="fas fa-exclamation-circle"></i>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <button onClick={addComment} className={`btn2 w-100`}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddComment;
