import { Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef, useContext } from "react";

import {
  StyledAlert,
  StyledErrorPlaceholder,
  StyledTextArea,
  StyledFreeTextForm,
} from "./../StyledComponents";
import useInput from "./../useInput";
import UserContext from "../home/UserContext";

export default ({ list, listName, updateLists }) => {
  const { username } = useContext(UserContext);
  const [alert, setAlert] = useState();
  const alertTimer = useRef();

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

      setAlert({ Error: "Saved", type: "success" });
      alertTimer.current = setTimeout(() => {
        setAlert(null);
      }, 3000);

      await axios
        .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
          username: username,
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
      <StyledFreeTextForm onSubmit={handleSubmit}>
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
        <StyledTextArea {...bindItem}></StyledTextArea>
      </StyledFreeTextForm>
    </>
  );
};
