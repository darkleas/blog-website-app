import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { useState } from "react";
import RightSide from "../components/RightSide";
import LoadingPostCard from "../components/LoadingPostCard";
import InfiniteScroll from "react-infinite-scroll-component";

function Articles(props) {
  const [loading, setLoading] = useState(false);
  const [posts, setPost] = useState([]);
  const [x] = useState(0);
  const [y, setY] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch("http://localhost:8000/api/post_list/")
        .then((res) => res.json())
        .then((data) => setPost(data.sort((a, b) => (a.id < b.id ? 1 : -1))
        .slice(x, y)));
      setTimeout(() => {
        setLoading(false);
      }, 400);
    };
    fetchData();
    
  }, [setPost]);
  const fetchMoreData = async () => {
    setTimeout(() => {
      fetch("http://localhost:8000/api/post_list/")
        .then((res) => res.json())
        .then((data) => setPost(data.sort((a, b) => (a.id < b.id ? 1 : -1))
        .slice(0, y * 2)));
      setY(y * 2);
    }, 500);
  };
  return (
    <>
      <main>
        <div className="container" style={{ marginTop: "6rem" }}>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-8">
                <div className="left-side">
                  <div className="row">
                    {
                      loading ? (
                        <>
                          <div className="col-md-6">
                            <LoadingPostCard />
                          </div>
                          <div className="col-md-6">
                            <LoadingPostCard />
                          </div>
                          <div className="col-md-6">
                            <LoadingPostCard />
                          </div>
                          <div className="col-md-6">
                            <LoadingPostCard />
                          </div>
                        </>
                      ) : (
                        posts.length != 0 
                        ?
                        (
                          <InfiniteScroll
                          style={{ overflow: "unset" }}
                          dataLength={posts.length}
                          next={fetchMoreData}
                          hasMore={true}
                        >
                          <div className="row">
                            {posts.map((i) => (
                              <div key={i.id} className="col-md-6">
                                <PostCard post={i} />
                              </div>
                            ))}
                          </div>
                        </InfiniteScroll>
                        )
                        :
                        (
                          <div className="warning-alert mb-3">
                            There is no articles.
                          </div>
                        )
                      )
                    
                    
                    
                  }
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-0 col-lg-4">
                <RightSide categories={props.categories} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Articles;
