function LoadingProfile() {
  return (
    <>
      <div className="loading-profile-img"></div>
      <div className="loading-profile-username"></div>
      <p></p>
      <hr />
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6 mb-2">
            <div id="loading-likespan"></div>{" "}
          </div>
          <div className="col-md-6">
            <div id="loading-commentspan"></div>{" "}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
export default LoadingProfile;
