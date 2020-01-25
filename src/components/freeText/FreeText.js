import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";

import { StyledAlert, StyledErrorPlaceholder, StyledTextArea } from "./../StyledComponents";

export default ({ list, listName, updateLists }) => {
  const [alert, setAlert] = useState();
  const alertTimer = useRef();

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

  const { value: item, bind: bindItem } = useInput(list);

  const handleSubmit = evt => {
    evt.preventDefault();
    // setAlert(null);
    addItem();
  };

  const addItem = async () => {
    if (item && item.trim()) {
      const text = item.trim();

      updateLists(listName, text);

      setAlert({ Error: "Saved: ", type: "success" });
      alertTimer.current = setTimeout(() => {
        setAlert(null);
      }, 3000);

      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: "mambans",
          listItems: { type: "freetext", items: text },
          listName: listName,
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
    }
  };

  return (
    <>
      <h1>{listName}</h1>
      <Form onSubmit={handleSubmit} style={{ height: 950 - 68 }}>
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
        <Button value='Submit' id='submit' type='submit'>
          Save
        </Button>
        <StyledTextArea style={{ height: 950 - 68 - 40 - 37 - 20 }} {...bindItem}></StyledTextArea>
      </Form>
    </>
  );
};
