function LoadingPostCard() {
  return (
    <div className="loading-cart">
      <div className="loading-cart-img" />
      <div className="loading-cart-text">
        <div style={{ display: "flex" }}>
          <div className="loading-span"> </div>
        </div>
        <p></p>
        <div style={{ display: "flex" }}>
          <div className="loading-cart-profile"></div>
          <div className="loading-btn"></div>
        </div>
      </div>
    </div>
  );
}
export default LoadingPostCard;
