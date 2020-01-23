import React from "react";

import { DeleteIcon, StyledListItem } from "./../StyledComponents";

export default ({ item, removeItem, idx, onDragStart, onDragOver, onDragEnd }) => {
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
      <p id='seasons'>Seasons: {item.totalSeasons}</p>
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
              <a href={`https://www.imdb.com/title/${item.imdbID}`} draggable={false}>
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
        onClick={() => {
          removeItem(item.Title);
        }}
      />
    </StyledListItem>
  );
};
