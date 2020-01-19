import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";

import { sortFunctions, sortListFunc, SortButton } from "./../sort/Sort";
import MovieItem from "./MovieItem";
import {
  StyledContainer,
  StyledAddForm,
  StyledList,
  StyledAlert,
  StyledErrorPlaceholder,
} from "./../home/StyledComponents";

export default ({ list, setList }) => {
  const [alert, setAlert] = useState();
  const [dragSelected, setDragSelected] = useState();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortAs, setSortAs] = useState(false);
  const postOrderTimer = useRef();
  const alertTimer = useRef();
  const customOrder = useRef(list);

  const sortOptions = {
    Alphabetically: { name: "Alphabetically", func: sortFunctions.alphabetically },
    IMDB: { name: "Internet Movie Database", func: sortFunctions.score },
    RottenTomatoes: { name: "Rotten Tomatoes", func: sortFunctions.score },
    Metacritic: { name: "Metacritic", func: sortFunctions.score },
    Year: { name: "Year", func: sortFunctions.first },
    Runtime: { name: "Runtime", func: sortFunctions.first },
    Boxoffice: { name: "BoxOffice", func: sortFunctions.first },
  };

  const sortList = sortBy => {
    sortListFunc(sortBy, list, sortOptions, setList);
  };

  const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
      value,
      setValue,
      reset: () => setValue(""),
      bind: {
        value,
        onChange: event => {
          setValue(event.target.value);
        },
      },
    };
  };

  const { value: item, bind: bindItem, reset: reseItem } = useInput("");

  const handleSubmit = evt => {
    evt.preventDefault();
    // setAlert(null);
    addItem();
  };

  const removeItem = async p_item => {
    try {
      const newList = list.filter(item => {
        return item.Title.toLowerCase() !== p_item.toLowerCase();
      });

      localStorage.setItem("MovieData", JSON.stringify(newList));

      setList([...newList]);

      clearTimeout(alertTimer.current);
      setAlert({ Error: "Removed: " + p_item, type: "warning" });
      alertTimer.current = setTimeout(() => {
        setAlert(null);
      }, 3000);

      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: newList,
          listName: "Movies",
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    } catch (error) {
      console.log("TCL: error", error);
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
          list.push(res.data);

          localStorage.setItem("MovieData", JSON.stringify(list));

          setList([...list]);
          clearTimeout(alertTimer.current);
          setAlert({ Error: "Added: " + res.data.Title, type: "success" });
          alertTimer.current = setTimeout(() => {
            setAlert(null);
          }, 3000);
          reseItem();

          await axios
            .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
              username: "mambans",
              listItems: list,
              listName: "Movies",
            })

            .catch(e => {
              console.log("TCL: e", e);
            });
        } else {
          setAlert({ ...res.data, type: "warning" });
          console.log("ERROR: ", res);
        }
      }
    }
  };

  const onDragStart = (e, index) => {
    clearTimeout(postOrderTimer.current);
    setDragSelected(list[index]);
    e.dataTransfer.effectAllowed = "move";
    e.target.parentNode.style.background = "rgb(200, 200, 200)";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 49, 75);
  };

  const onDragOver = (e, index) => {
    const draggedOverItem = list[index];

    if (dragSelected.Title === draggedOverItem.Title) {
      return;
    }

    let items = list.filter(item => item.Title !== dragSelected.Title);

    items.splice(index, 0, dragSelected);

    setList(items);
  };

  const onDragEnd = e => {
    // e.target.parentNode.style.background = "rgb(24,24,24)";
    e.target.parentNode.style.background = "rgb(255, 255, 255)";
    localStorage.setItem("MovieData", JSON.stringify(list));

    postOrderTimer.current = setTimeout(async () => {
      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: list,
          listName: "Movies",
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    }, 5000);
  };

  return (
    <StyledContainer>
      <h1>Movies</h1>
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
          customOrder={customOrder.current}
          sortOptions={sortOptions}
          setList={setList}
          setSortAs={setSortAs}
          sortList={sortList}
        />
        <Form.Group controlId='formGroupUserName'>
          {/* <Form.Label>Add movie</Form.Label> */}
          <Form.Control type='text' placeholder='Lord of the rings...' {...bindItem} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
        {/* <StyledSearchSuggestionList>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
        </StyledSearchSuggestionList> */}
      </StyledAddForm>

      <StyledList height={1050}>
        <TransitionGroup component={null}>
          {list.map((item, idx) => {
            return (
              <CSSTransition key={item.Title} timeout={1000} classNames='fadeDown-1s' unmountOnExit>
                <MovieItem
                  item={item}
                  removeItem={removeItem}
                  idx={idx}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDragEnd={onDragEnd}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </StyledList>
    </StyledContainer>
  );
};
