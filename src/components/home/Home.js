"use trict";
import { ic_chevron_right } from "react-icons-kit/md/ic_chevron_right";
import { ic_list } from "react-icons-kit/md/ic_list";
import axios from "axios";
import Icon from "react-icons-kit";
import React, { useState, useEffect } from "react";

import "./../transitions.scss";
import Loading from "./Loading";
import MoviesList from "./../movies/MoviesList";
import SeriesList from "./../series/SeriesList";
import {
  StyledSidebar,
  StyledCenterContainer,
  StyledMainContainer,
  StyledRightListContainer,
  StyledSidarbarItem,
} from "./../home/StyledComponents";

export default () => {
  document.title = "Watchist | Lists";
  const [movies, setMovies] = useState();
  const [series, setSeries] = useState();
  const [listName, setListName] = useState("Movies");
  const listComponents = {
    Movies: <MoviesList list={movies} setList={setMovies} />,
    Series: <SeriesList list={series} setList={setSeries} />,
  };

  const fetchLists = async () => {
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
  };

  useEffect(() => {
    // if (localStorage.getItem("MovieData") || localStorage.getItem("SerieData")) {
    //   setMovies(JSON.parse(localStorage.getItem("MovieData")));
    //   setSeries(JSON.parse(localStorage.getItem("SerieData")));
    // }
    fetchLists();
  }, []);

  return (
    <StyledCenterContainer>
      <StyledMainContainer height={1050} width={1200}>
        <div id='logo'>
          <img src={`${process.env.PUBLIC_URL}/logos/watchist.png`} alt='' />
        </div>
        <StyledSidebar>
          <p id='sidebarHeader'>
            <Icon icon={ic_list} size={20}></Icon>Lists
          </p>
          {Object.keys(listComponents).map(name => {
            return (
              <StyledSidarbarItem
                active={listName === name}
                key={name}
                onClick={() => {
                  setListName(name);
                }}>
                {name}
                <Icon icon={ic_chevron_right} size={24}></Icon>
              </StyledSidarbarItem>
            );
          })}
        </StyledSidebar>
        <StyledRightListContainer height={1050}>
          {movies && series ? (
            listComponents[listName]
          ) : (
            <Loading text={"Fetching data from server.."} fontSize={"1.5rem"} />
          )}
        </StyledRightListContainer>
      </StyledMainContainer>
    </StyledCenterContainer>
  );
};
