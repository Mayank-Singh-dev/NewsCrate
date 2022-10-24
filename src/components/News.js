import React, {useEffect, useState} from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  


 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const updateNews= async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
}

// useEffect(() => {
//   updateNews();
// }, [])

useEffect(() => {
  updateNews()
  document.title = `${capitalizeFirstLetter(
    props.category
  )}-NewsCrate`;
},[])


  // async componentDidMount() {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=27a0028ebf974a28bf59f7c7eedb3687&page=1&pageSize=${props.pageSize}`;
  //   //
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading: false,
  //   // });
  //   updateNews();
  // }
  // const handlePrevClick = async () => {
    // console.log('previous')
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=27a0028ebf974a28bf59f7c7eedb3687&page=${
    //   page - 1
    // }&pageSize=${props.pageSize}`;
    //
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({
    //   page: page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
  //   setPage(page-1)
  //   updateNews();
  // };
  // const handleNextClick = async () => {
    // console.log('Next')
    // if (
    //   !(
    //     page + 1 >
    //     Math.ceil(totalResults / props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apiKey=27a0028ebf974a28bf59f7c7eedb3687&page=${
    //     page + 1
    //   }&pageSize=${props.pageSize}`;
    //  
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   // console.log(parsedData);
    //   this.setState({
    //     page: page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
  //   setPage(page+1)
  //   updateNews();
  // };

  const fetchMoreData = async () => {  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "15px 0px" , marginTop:"90px"}}>
          NewsCrate-Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* {!loading && */}
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      ImageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "science",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
