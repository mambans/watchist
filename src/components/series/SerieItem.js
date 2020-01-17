import React from "react";

import { DeleteIcon, StyledListItem } from "./../home/StyledComponents";

export default ({ item, removeItem, idx, onDragStart, onDragOver, onDragEnd }) => {
  if (item && item.Response === "False") {
    return (
      <StyledListItem key={item.Title}>
        <p id='title'>{item}</p>
        <p id='desc' style={{ textAlign: "center" }}>
          {item + " not found."}
        </p>
        <DeleteIcon
          onClick={() => {
            removeItem(item);
          }}
        />
      </StyledListItem>
    );
  } else if (item && item.Title) {
    return (
      <StyledListItem
        // key={item.Title}
        title={item.Title}
        onDragOver={e => onDragOver(e, idx)}>
        <img
          id='poster'
          src={item.Poster}
          alt=''
          draggable
          onDragStart={e => onDragStart(e, idx)}
          onDragEnd={e => {
            onDragEnd(e);
          }}
        />
        <p id='title'>{item.Title}</p>
        <p id='desc'>{item.Plot}</p>
        <div id='raitings'>
          {/* <div>
            <img
              id='rottentomatoes'
              src={`${process.env.PUBLIC_URL}/logos/rottentomatoes.png`}
              alt=''></img>
            {item.Ratings[1].Value || ""}
          </div> */}
          <div>
            <a href={`https://www.imdb.com/title/${item.imdbID}`} id='imdb'>
              <img src={`${process.env.PUBLIC_URL}/logos/imdb.png`} alt=''></img>
            </a>
            {item.imdbRating || ""}
          </div>
          {/* <div>
            <img
              id='metacritic'
              src={`${process.env.PUBLIC_URL}/logos/metacritic.png`}
              alt=''></img>
            {item.Ratings[2].Value || ""}
          </div> */}
        </div>

        <DeleteIcon
          onClick={() => {
            removeItem(item.Title);
          }}
        />
      </StyledListItem>
    );
  } else {
    return <p>Loading...</p>;
  }
};
