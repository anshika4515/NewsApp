import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d77bae55d9ee4c03a4f1c89eb127b2c6&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);

    // Check if parsedData has 'totalResults' property
    if (parsedData.totalResults) {
      setTotalResults(parsedData.totalResults);
    }

    setArticles(parsedData.articles);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, [page]);

  const handlePrevBtn = async () => {
    setPage(page - 1);
  };

  const handleNextBtn = async () => {
    setPage(page + 1);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='container my-3'>
      <h2 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}

      <div className='row'>
        {articles &&
          articles.map((element) => (
            <div className='col-md-4' key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ''}
                description={element.description ? element.description.slice(0, 88) : 's'}
                imageURL={element.urlToImage}
                newsURL={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
      </div>

      <div className='container d-flex justify-content-between'>
        <button disabled={page <= 1} type='button' className='btn btn-dark' onClick={handlePrevBtn}>
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          type='button'
          className='btn btn-dark'
          onClick={handleNextBtn}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default News;
