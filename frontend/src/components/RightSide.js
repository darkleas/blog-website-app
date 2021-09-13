import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function RightSide() {
  const [categories, setCategory] = useState([]);
  const [postsz, setPostsz] = useState([]);
  const [posts, setPosts] = useState([]);

  const [q, setQ] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const hi = async () => {
      fetch("http://localhost:8000/api/category_list/")
        .then((res) => res.json())
        .then((data) => setCategory(data));
      fetch("http://localhost:8000/api/post_list/")
        .then((res) => res.json())
        .then((data) =>
          setPosts(
            data.sort((x, y) => (x.id < y.id ? 1 : -1))
          )
        );
      fetch("http://localhost:8000/api/post_list/")
        .then((res) => res.json())
        .then((data) =>
          setPostsz(
            data.sort((x, y) => (x.likes < y.likes ? 1 : -1)).slice(0, 5)

          )
        );
    };
    hi();
  }, [setCategory]);
  const [searchPost, setSearchPost] = useState(
    posts.filter((x) => x.title.toLowerCase().includes("**********"))
  );
  function searching(e) {
    const x = () => {
      setLoading(true);
      setQ(e.target.value);

      if (e.target.value !== "") {
        setSearchPost(
          posts.filter((x) =>
            x.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      } else {
        setSearchPost(
          posts.filter((x) => x.title.toLowerCase().includes("***********"))
        );
      }
      setTimeout(() => {
        setLoading(false);
      }, 400);
    };
    x();
  }

  function closethe(e) {
    setQ("");
    setSearchPost(
      posts.filter((x) => x.title.toLowerCase().includes("***********"))
    );
  }
  return (
    <>
      <div className="right-side">
        <div className="search-div" style={{ position: "relative" }}>
          <form className="search">
            <input
              autoComplete="off"
              onChange={(e) => searching(e)}
              value={q}
              placeholder="Search post"
            />
            <i class="fas fa-search" ></i>
            <ul className="search-ul">
              {loading ? (
                <>
                  <li className="search-loading-li" style={{ display: "flex" }}>
                    <div className="search-load-img"></div>
                    <span className="search-load-text"></span>
                  </li>
                  <li className="search-loading-li" style={{ display: "flex" }}>
                    <div className="search-load-img"></div>
                    <span className="search-load-text"></span>
                  </li>
                  <li className="search-loading-li" style={{ display: "flex" }}>
                    <div className="search-load-img"></div>
                    <span className="search-load-text"></span>
                  </li>
                  <li className="search-loading-li" style={{ display: "flex" }}>
                    <div className="search-load-img"></div>
                    <span className="search-load-text"></span>
                  </li>
                </>
              ) : (
                searchPost.map((e) => (
                  <Link key={e.id} to={`/article/${e.url}`} onClick={closethe}>
                    <li style={{ display: "flex" }}>
                      <img alt={e.title} src={e.img} />
                      <span>{e.title}</span>
                    </li>
                  </Link>
                ))
              )}
            </ul>
          </form>
        </div>
        <div className="right-component kategoriler">
          <h5 className="component-title">Categories</h5>
          <br />
          {categories.map((i) => (
            <span key={i.id}>
              <Link
                to={{
                  pathname: `/category/${i.id}`,
                }}
                className="kategori-link"
              >
                {i.title}
              </Link>
              <hr />
            </span>
          ))}
        </div>
        <div className="right-component most-liked">
          <h5 className="component-title">Most Popular Articles</h5>
          <br />
          {postsz.map((i) => (
            <Link
              key={i.id}
              to={`/article/${i.url}`}
              style={{ textDecoration: "none" }}
            >
              <div className="row mb-2" style={{ borderRadius: "5px" }}>
                <img alt={i.title} src={i.img} className="most-liked-img" />
                <div className="most-liked-title">
                  <p>{i.title.substr(0, 55)}...</p>
                </div>
              </div>
              <hr />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default RightSide;
