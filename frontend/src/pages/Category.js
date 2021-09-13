import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { useState } from "react";
import RightSide from "../components/RightSide";
import LoadingPostCard from "../components/LoadingPostCard";
import { useParams } from "react-router-dom";

function Category(props)
{
    const [loading, setLoading] = useState(false);
    const [posts, setPost] = useState([]);
    const urlx = window.location.pathname.split('/').pop();

    useEffect(() => {
      const fetchData = async () => {
  
        setLoading(true);
         await fetch("http://localhost:8000/api/post_list/")
          .then((res) => res.json())
          .then((data) => setPost(data));
          setTimeout(() =>{setLoading(false)},500)
      };
      fetchData();
  
    }, [urlx]);
  
    const { id } = useParams();

 

    return (
      <>
        <main>
          <div className="container" style={{ marginTop: "6rem" }}>
  
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-8">
                  <div className="left-side">
                    <div className="row">
                      {loading ? (
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
                        posts
                          .filter((i) => i.category === parseInt(id))
                          .sort((a, b) => (a.id < b.id ? 1 : -1))
                          .map((i) => (
                            <div key={i.id} className="col-md-6">
                              <PostCard post={i} />
                            </div>
                          ))
                         
                      )}
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
export default Category