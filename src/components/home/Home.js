"use trict";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { StyledListContainer } from "./../home/StyledComponents";
import MoviesList from "./../movies/MoviesList";
import SeriesList from "./../series/SeriesList";
import "./../transitions.scss";
import Loading from "./Loading";

export default () => {
  document.title = "Watchist | Lists";
  const [movies, setMovies] = useState();
  const [series, setSeries] = useState();

  const fetchLists = async () => {
    if (!localStorage.getItem("MovieData") || !localStorage.getItem("SerieData")) {
      await axios
        .get(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list`, {
          params: {
            username: "mambans",
          },
        })
        .then(res => {
          setMovies(res.data.Items[0].Movies);
          setSeries(res.data.Items[0].Series);
          localStorage.setItem("MovieData", JSON.stringify(res.data.Items[0].Movies));
          localStorage.setItem("SerieData", JSON.stringify(res.data.Items[0].Series));
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      setMovies(JSON.parse(localStorage.getItem("MovieData")));
      setSeries(JSON.parse(localStorage.getItem("SerieData")));
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  if (movies && series) {
    return (
      <StyledListContainer>
        <MoviesList list={movies} setList={setMovies} />
        <SeriesList list={series} setList={setSeries} />
      </StyledListContainer>
    );
  } else {
    return <Loading />;
  }
};
