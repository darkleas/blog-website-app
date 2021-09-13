import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
function PostCard(props) {
  return (
    <Link
      to={`/article/${props.post.url}`}
      style={{ textDecoration: "none", color: "rgb(31,31,31)" }}
    >
      <div className="cart" key={props.post.id}>
        <img alt={props.post.title} src={props.post.img} className="cart-img" />
        <div className="cartbg"></div>
        <div className="cart-text">
          <h2 style={{ color: "rgb(31,31,31)", fontSize: "28px" }}>
            {props.post.title}{" "}
          </h2>
          <div style={{position:'relative'}}>
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
    </Link>
  );
}
export default PostCard;
