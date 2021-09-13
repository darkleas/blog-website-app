import { useEffect, useState } from "react";
function Message(props) {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/api/profile_list/`)
      .then((res) => res.json())
      .then((data) => setProfile(data.filter((i) => i.user === props.user)));
  }, [props]);
  function messageimg(e) {
    e.target.src = "https://i.ibb.co/J3cGYxy/default-user-image.png";

  }
  return (
    <>
    {profile.map((i) => (
    <div key={i.id} className={`message mt-3`} id={`message${props.id}`}>
      <div className="row">
  
          <img
            className="message-real-img"
            onError={(e) => (messageimg(e))}
            src={`${i["profile_pic"]}`}
          />
     
        <div className="message-text">
          <h2>
            {props.username} <span className="message-date"> {props.date}</span>
          </h2>

          <p>{props.text}</p>
        </div>
      </div>
    </div>
       ))}
    </>
  );
}
export default Message;
