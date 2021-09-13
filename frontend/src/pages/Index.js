import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { useState } from "react";
import LoadingPostCard from "../components/LoadingPostCard";
import PostCard2 from "../components/PostCard2";
import LoadingPostCard2 from "../components/LoadingPostCard2";
function Index(props) {
  const [loading, setLoading] = useState(false);
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      await fetch("http://localhost:8000/api/post_list/")       
        .then((res) => res.json())
        .then((data) => setPost(data));
        setTimeout(() =>{setLoading(false)},400)
    };
    fetchData();

  }, [setPost]);

  return (
    <>
      <Header />
      <main>
        <div className="container" style={{ marginTop: "6rem" }}>
          <p className="sectoin-title">Most popular articles</p>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="left-side">
                  <div className="row">
                    {loading ? (
                      <>
                        <div className="col-md-12 col-lg-6">
                          <LoadingPostCard2 />
                        </div>
                        <div className="col-md-12 col-lg-6">
                          <LoadingPostCard2 />
                        </div>


                      </>
                    ) : (
                      posts.length != 0 
                      ?
                      (
                      posts
                        .sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1))
                        .map((i) => (
                          <div key={i.id} className="col-md-12 col-lg-6">
                            <PostCard2 post={i} />
                          </div>
                        ))
                        .slice(0, 2)
                      )
                      :
                      (
                        <div className="warning-alert">
                          There is no articles.
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="sectoin-title">Last articles</p>

          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="left-side">
                  <div className="row">
                    {loading ? (
                      <>
                        <div className="col-md-4">
                          <LoadingPostCard />
                        </div>
                        <div className="col-md-4">
                          <LoadingPostCard />
                        </div>
                        <div className="col-md-4">
                          <LoadingPostCard />
                        </div>

                      </>
                    ) : (
                      posts.length != 0 
                      ?
                      (
                      posts
                        .sort((a, b) => (a.id < b.id ? 1 : -1))
                        .map((i) => (
                          <div key={i.id} className="col-md-4">
                            <PostCard post={i} />
                          </div>
                        ))
                        .slice(0, 6)
                      )
                      :
                      (
                        <div className="warning-alert">
                          There is no articles.
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Index;
