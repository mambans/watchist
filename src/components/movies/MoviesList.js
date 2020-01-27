import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";

import { onDragStart, onDragOver, onDragEnd } from "./../Drag";
import { sortFunctions, SortButton } from "./../sort/Sort";
import MovieItem from "./MovieItem";
import useInput from "./../useInput";
import {
  ModalBackdrop,
  ScrollToTopIcon,
  SearchIcon,
  StyledAddForm,
  StyledAlert,
  StyledErrorPlaceholder,
  StyledList,
  StyledScollToTop,
  StyledSearchSuggestionList,
} from "./../StyledComponents";

export default ({ list, listName, addListItem, removeListItem, updateLists }) => {
  const [alert, setAlert] = useState();
  const [dragSelected, setDragSelected] = useState();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortAs, setSortAs] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState();
  const [suggestions, setSuggestions] = useState({});
  const postOrderTimer = useRef();
  const alertTimer = useRef();
  const formInput = useRef();
  const customOrder = useRef(list);
  const previousSearch = useRef();
  const scrollToTop = useRef();
  const topItemRef = useRef();

  const sortOptions = {
    Alphabetically: { name: "Alphabetically", func: sortFunctions.alphabetically },
    IMDB: { name: "Internet Movie Database", func: sortFunctions.score },
    RottenTomatoes: { name: "Rotten Tomatoes", func: sortFunctions.score },
    Metacritic: { name: "Metacritic", func: sortFunctions.score },
    Year: { name: "Year", func: sortFunctions.first },
    Runtime: { name: "Runtime", func: sortFunctions.first },
    Boxoffice: { name: "BoxOffice", func: sortFunctions.first },
  };

  const { value: item, bind: bindItem, reset: reseItem, manualSet } = useInput(
    "",
    setSuggestionsOpen
  );

  const handleSubmit = evt => {
    evt.preventDefault();
    // setAlert(null);
    addItem();
  };

  const removeItem = async p_item => {
    try {
      removeListItem(listName, p_item, "movie");

      clearTimeout(alertTimer.current);
      setAlert({ Error: "Removed: " + p_item, type: "warning" });
      alertTimer.current = setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchSuggestions = async search => {
    if (previousSearch.current !== search) {
      const year = item.substring(item.lastIndexOf("(") + 1, item.lastIndexOf(")")) || null;
      const res = await axios
        .get(
          `http://www.omdbapi.com/?apikey=235e2a1e&type=movie&s=${search.replace(
            ` (${year})`,
            ""
          )}${year ? `&y=${year}` : ""}`
        )
        .then(result => {
          previousSearch.current = search;
          return result;
        })
        .catch(e => {
          console.error(e);
        });

      if (res.data.Response !== "False") {
        setSuggestions(res.data.Search);
        setSuggestionsOpen(true);
      } else {
        setAlert({ ...res.data, type: "warning" });
      }
    } else {
      setSuggestionsOpen(true);
    }
  };

  const addItem = async () => {
    if (item && item.trim()) {
      if (list.find(movie => movie.Title.toLowerCase() === item.trim().toLowerCase())) {
        setAlert({ Response: "False", Error: "Movie already added", type: "warning" });
      } else {
        const year = item.substring(item.lastIndexOf("(") + 1, item.lastIndexOf(")")) || null;
        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=235e2a1e&type=movie&t=${item.replace(` (${year})`, "")}${
            year ? `&y=${year}` : ""
          }`
        );
        if (res.data.Response !== "False") {
          addListItem(listName, res.data, "movie");

          clearTimeout(alertTimer.current);

          setAlert({ Error: "Added: " + res.data.Title, type: "success" });

          alertTimer.current = setTimeout(() => {
            setAlert(null);
          }, 3000);

          setTimeout(() => {
            scrollToTop.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "end",
            });
          }, 0);

          reseItem();
        } else {
          setAlert({ ...res.data, type: "warning" });
          await axios
            .get(
              `http://www.omdbapi.com/?apikey=235e2a1e&type=movie&s=${item.replace(
                ` (${year})`,
                ""
              )}${year ? `&y=${year}` : ""}`
            )
            .then(res => {
              setSuggestions(res.data.Search);
              setSuggestionsOpen(true);
            })
            .catch(e => {
              console.error(e);
            });
        }
      }
    }
  };

  return (
    <>
      <h1>{listName}</h1>
      <StyledAddForm onSubmit={handleSubmit}>
        {alert ? (
          <StyledAlert
            onClose={() => setAlert(false)}
            dismissible
            key={alert.Error}
            variant={alert.type || "warning"}>
            {alert.Error}
          </StyledAlert>
        ) : (
          <StyledErrorPlaceholder />
        )}
        <SortButton
          text={sortAs}
          open={sortOpen}
          setSortOpen={setSortOpen}
          sortOptions={sortOptions}
          customOrder={customOrder.current}
          setSortAs={setSortAs}
          updateLists={updateLists}
          listName={listName}
          list={list}
        />
        <Form.Group controlId='formGroupUserName'>
          <Form.Control
            ref={formInput}
            type='text'
            placeholder='Lord of the rings...'
            {...bindItem}
            style={{
              borderRadius: suggestions && suggestionsOpen ? "0.25rem 0.25rem 0 0" : "0.25rem",
            }}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
        <Button
          id='searchBtn'
          onClick={() => {
            fetchSearchSuggestions(formInput.current.value.trim());
          }}>
          <SearchIcon />
        </Button>

        <CSSTransition
          key='StyledSearchSuggestionList'
          in={suggestions && suggestionsOpen}
          timeout={250}
          classNames='slideDown-250ms'
          unmountOnExit>
          <StyledSearchSuggestionList height={"520px"}>
            {Object.values(suggestions).map(item => {
              return (
                <li key={item.imdbID} {...manualSet}>
                  <img alt='' src={item.Poster}></img>
                  {`${item.Title} (${item.Year})`}
                </li>
              );
            })}
          </StyledSearchSuggestionList>
        </CSSTransition>
        {suggestions && suggestionsOpen ? (
          <ModalBackdrop
            onClick={() => {
              setSuggestionsOpen(false);
            }}
          />
        ) : null}
      </StyledAddForm>

      <StyledList height={950}>
        <div ref={topItemRef} style={{ height: "1px" }} />
        <TransitionGroup component={null}>
          {list.map((item, idx) => {
            return (
              <CSSTransition key={item.Title} timeout={1000} classNames='fadeDown-1s' unmountOnExit>
                <MovieItem
                  item={item}
                  removeItem={removeItem}
                  idx={idx}
                  onDragStart={(e, index) => {
                    onDragStart(e, index, postOrderTimer, setDragSelected, list, "movie");
                  }}
                  onDragOver={(e, index) => {
                    onDragOver(index, list, dragSelected, updateLists, listName, "movie");
                  }}
                  onDragEnd={e => {
                    onDragEnd(e, postOrderTimer, list, listName, "movie");
                  }}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <StyledScollToTop
          ref={scrollToTop}
          onClick={() => {
            topItemRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "end",
            });
          }}>
          <ScrollToTopIcon />
          <p>Scroll to top</p>
        </StyledScollToTop>
      </StyledList>
    </>
  );
};
