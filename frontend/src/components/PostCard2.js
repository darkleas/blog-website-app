import { Link } from "react-router-dom";

function PostCard2(props) {
  return (
   <Link  to={`/article/${props.post.url}`}
   style={{ textDecoration: "none", color: "rgb(31,31,31)" }}>
    <div className="post-card2">
      <div style={{ display: "flex" }}>
        <img id="post-card2-img" src={`${props.post.img}`} />
        <div className="p-3">
          <h2 style={{ color: "rgb(31,31,31)"}}>
            {props.post.title}{" "}
          </h2>
          <div className="mt-3" style={{position:'relative'}}>
            <img src="https://i.ibb.co/KFBZ2L3/profile.jpg" className="postcard-profile" />
            <div className="username-date">
              <span className="cart-user">Burhan Kocadağ</span>
           
              <p className="cart-date">
                {props.post.created_date}   
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </Link>
  );
}
export default PostCard2;
