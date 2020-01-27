import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Button } from "react-bootstrap";
import React, { useState, useRef } from "react";

import { onDragStart, onDragOver, onDragEnd } from "./../Drag";
import { sortFunctions, SortButton } from "./../sort/Sort";
import DefaultItem from "./DefaultItem";
import useInput from "./../useInput";
import {
  ScrollToTopIconSmaller,
  StyledAddForm,
  StyledAlert,
  StyledErrorPlaceholder,
  StyledList,
  StyledScollToTop,
} from "./../StyledComponents";

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
                  onDragStart={(e, index) => {
                    onDragStart(e, index, postOrderTimer, setDragSelected, list, "default");
                  }}
                  onDragOver={(e, index) => {
                    onDragOver(index, list, dragSelected, updateLists, listName, "default");
                  }}
                  onDragEnd={e => {
                    onDragEnd(e, postOrderTimer, list, listName, "default");
                  }}
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
