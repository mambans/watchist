import React from "react";

import { DeleteIcon, StyledListItem } from "./../StyledComponents";

export default ({ item, removeItem, idx, onDragStart, onDragOver, onDragEnd }) => {
  const raitingLinks = {
    "Internet Movie Database": {
      url: "https://www.imdb.com/title/",
      finalUrl: function() {
        return this.url + item.imdbID;
      },
    },
    "Rotten Tomatoes": {
      url: "https://www.rottentomatoes.com/m/",
      finalUrl: function() {
        return (
          this.url +
          item.Title.replace(":", "")
            .split(" ")
            .join("_")
            .toLowerCase()
        );
      },
    },
    Metacritic: {
      url: "https://www.metacritic.com/movie/",
      finalUrl: function() {
        return (
          this.url +
          item.Title.replace(":", "")
            .split(" ")
            .join("-")
            .toLowerCase()
        );
      },
    },
  };

  return (
    <StyledListItem title={item.Title} onDragOver={e => onDragOver(e, idx)}>
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
      <p id='boxoffice'>{item.BoxOffice !== "N/A" ? item.BoxOffice : null}</p>
      <p id='title'>{`${item.Title} (${item.Year})`}</p>
      <p className='details' id='details'>
        {item.Genre + " - " + item.Runtime}
      </p>
      <p className='details' id='actors'>
        {item.Actors}
      </p>
      <p className='details' id='plot'>
        {item.Plot}
      </p>
      <p className='details' id='awards'>
        {item.Awards}
      </p>

      <div id='raitings'>
        {item.Ratings.map(raiting => {
          return (
            <div
              id={raiting.Source.split(" ")
                .join("")
                .toLowerCase()}
              key={raiting.Source}>
              <a href={raitingLinks[raiting.Source].finalUrl()} draggable={false}>
                <img
                  src={`${process.env.PUBLIC_URL}/logos/${raiting.Source.split(" ")
                    .join("")
                    .toLowerCase()}.png`}
                  alt=''
                  draggable={false}></img>
              </a>
              {raiting.Value}
            </div>
          );
        })}
      </div>

      <DeleteIcon
        className='deleteIcon'
        onClick={() => {
          removeItem(item.Title);
        }}
      />
    </StyledListItem>
  );
};
