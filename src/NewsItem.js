import React from "react";

const NewsItem = (props)=>{

    let { title, description, ImageUrl, newsUrl, author, date , source} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex',justifyContent:'flex-end', position:'absolute',right:'0'}}>
        <span className="badge rounded-pill bg-danger">
                {source}
              </span>
              </div>
          <img
            src={
              !ImageUrl
                ? "https://www.shutterstock.com/image-vector/breaking-news-background-world-global-600w-719766118.jpg"
                : ImageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            {/* whenever we use target which open the link in different tab we should use rel="noreferrer" for security*/}
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
