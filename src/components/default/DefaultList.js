import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";

import { sortFunctions, SortButton } from "./../sort/Sort";
import {
  StyledAddForm,
  StyledList,
  StyledAlert,
  StyledErrorPlaceholder,
  ScrollToTopIconSmaller,
  StyledScollToTop,
} from "./../StyledComponents";
import DefaultItem from "./DefaultItem";

export default ({ list, listName, addListItem, removeListItem, updateLists }) => {
  const [alert, setAlert] = useState();
  const [dragSelected, setDragSelected] = useState();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortAs, setSortAs] = useState(false);
  const postOrderTimer = useRef();
  const alertTimer = useRef();
  const customOrder = useRef(list);
  const scrollToTop = useRef();
  const topItemRef = useRef();

  const sortOptions = {
    Alphabetically: { name: "Alphabetically", func: sortFunctions.alphabetically },
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

  const addItem = async () => {
    if (item && item.trim()) {
      if (list.find(listItem => listItem.toLowerCase() === item.trim().toLowerCase())) {
        setAlert({ Response: "False", Error: "Item already added", type: "warning" });
      } else {
        addListItem(listName, item.trim(), "default");

        setAlert({ Error: "Added: " + item, type: "success" });
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
      }
    }
  };

  const removeItem = async p_item => {
    try {
      removeListItem(listName, p_item, "default");

      clearTimeout(alertTimer.current);
      setAlert({ Error: "Removed: " + p_item, type: "warning" });
      alertTimer.current = setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (error) {
      console.log("TCL: error", error);
    }
  };

  const onDragStart = (e, index) => {
    clearTimeout(postOrderTimer.current);
    setDragSelected(list[index]);
    e.dataTransfer.effectAllowed = "move";
    e.target.parentNode.style.background = "rgb(80, 80, 80)";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 0, 25);
  };

  const onDragOver = (e, index) => {
    const draggedOverItem = list[index];

    if (dragSelected === draggedOverItem) {
      return;
    }

    if (draggedOverItem) {
      let items = list.filter(item => item !== dragSelected);

      items.splice(index, 0, dragSelected);

      updateLists(listName, items);
    }
  };

  const onDragEnd = e => {
    // e.target.parentNode.style.background = "rgb(24,24,24)";
    e.target.parentNode.style.background = "inherit";

    postOrderTimer.current = setTimeout(async () => {
      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: { type: "default", items: list },
          listName: listName,
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    }, 5000);
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
          {/* <Form.Label>Add movie</Form.Label> */}
          <Form.Control type='text' placeholder='Lord of the rings...' {...bindItem} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
      </StyledAddForm>

      <StyledList height={950}>
        <div ref={topItemRef} style={{ height: "1px" }} />

        <TransitionGroup component={null}>
          {list.map((item, idx) => {
            return (
              <CSSTransition key={item} timeout={1000} classNames='fadeDown-small-1s' unmountOnExit>
                <DefaultItem
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
        <StyledScollToTop
          height={35}
          fontSize={"1rem"}
          gridCol={"50px 120px auto"}
          ref={scrollToTop}
          onClick={() => {
            topItemRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "end",
            });
          }}>
          <ScrollToTopIconSmaller size={30} />
          <p>Scroll to top</p>
        </StyledScollToTop>
      </StyledList>
    </>
  );
};
