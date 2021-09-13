import { useEffect, useState } from "react";
function LoadingComment(props) {

  return (
    <div className="loading-message mt-3">
      <div className="row">
        <div className="loading-message-real-img"></div>

        <div className="loading-message-text">
         
          <h2></h2>
          <span className="loading-message-date"></span>

          <p></p>
        </div>
      </div>

    </div>
  );
}
export default LoadingComment;
