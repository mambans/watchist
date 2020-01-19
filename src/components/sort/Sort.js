import React from "react";
import Icon from "react-icons-kit";
import styled from "styled-components";
import { Button } from "react-bootstrap";

import { ic_attach_money } from "react-icons-kit/md/ic_attach_money";
import { imdb } from "react-icons-kit/fa/imdb";
import { calendar } from "react-icons-kit/icomoon/calendar";
import { clockO } from "react-icons-kit/fa/clockO";
import { ic_sort } from "react-icons-kit/md/ic_sort";

import { StyledSortDropdown } from "./../home/StyledComponents";

const sortIcons = {
  IMDB: imdb,
  // RottenTomatoes: ic_sort,
  // Metacritic: ic_sort,
  Year: calendar,
  Runtime: clockO,
  Boxoffice: ic_attach_money,
  // Seasons: ic_sort,
};

const sortFunctions = {
  first: (a, b, prop) => {
    return (
      (parseFloat(
        b[prop]
          .replace("/min/g", "")
          .replace("$", "")
          .split(",")
          .join(".")
      ) || 0) -
      (parseFloat(
        a[prop]
          .replace("$", "")
          .split(",")
          .join(".")
      ) || 0)
    );
  },

  score: (a, b, prop) => {
    return (
      parseFloat(
        b.Ratings.find(item => {
          return item.Source === prop;
        }).Value
      ) -
      parseFloat(
        a.Ratings.find(item => {
          return item.Source === prop;
        }).Value
      )
    );
  },

  alphabetically: (a, b, prop) => {
    const aText = a.Title.toLowerCase();
    const bText = b.Title.toLowerCase();
    return aText < bText ? -1 : aText > bText ? 1 : 0;
  },
};

const sortListFunc = (sortBy, list, sortOptions, setList) => {
  const SortedList = Object.values(list).sort((a, b) => {
    return sortOptions[sortBy].func(a, b, sortOptions[sortBy].name);
  });

  setList(SortedList);
};

const StyledSortButton = styled(Button).attrs({ variant: "secondary" })`
  grid-area: sort;
  padding: 0;
  border: none;
  box-shadow: none !important;

  i {
    padding-right: 5px;
  }
`;

const SortButtonBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  cursor: default;
`;

const SortButton = ({
  text,
  open,
  setSortOpen,
  customOrder,
  sortOptions,
  setList,
  setSortAs,
  sortList,
}) => {
  return (
    <StyledSortButton
      onClick={() => {
        setSortOpen(!open);
      }}>
      <Icon icon={sortIcons[text] || ic_sort}></Icon>
      {text || "Sort by"}
      {open ? (
        <>
          <SortButtonBackdrop
            onClick={() => {
              setSortOpen(false);
            }}
          />
          <StyledSortDropdown>
            <li
              onClick={() => {
                setSortAs("Default");
                setList(customOrder);
              }}>
              Default
            </li>
            {Object.keys(sortOptions).map(key => {
              return (
                <li
                  key={key}
                  onClick={() => {
                    setSortAs(key);
                    sortList(key);
                  }}>
                  <Icon icon={sortIcons[key] || ic_sort}></Icon>
                  {key}
                </li>
              );
            })}
          </StyledSortDropdown>
        </>
      ) : null}
    </StyledSortButton>
  );
};

export { sortFunctions, sortListFunc, SortButton };
