import styled from "styled-components";
import { ic_delete } from "react-icons-kit/md/ic_delete";
import { ic_playlist_add } from "react-icons-kit/md/ic_playlist_add";
import { Icon } from "react-icons-kit";
import { Form, Alert } from "react-bootstrap";

const StyledListContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgb(24, 24, 24);
  min-height: 100vh;
`;

const DeleteIcon = styled(Icon).attrs({ icon: ic_delete, size: 30 })`
  color: darkred;
  margin: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  z-index: 10;
`;

const MoveIcon = styled(Icon).attrs({ icon: ic_playlist_add, size: 30 })`
  color: white;
  margin: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.7;
`;

const StyledContainer = styled.div`
  color: white;
  width: 700px;
  padding: 0 10px;

  h1 {
    text-align: center;
  }
`;

const StyledListItem = styled.li`
  position: relative;
  border-bottom: 1px solid rgba(100, 100, 100, 0.5);
  list-style: none;
  height: 150px;
  display: grid;

  grid-template-areas: "poster raitings title title" "poster raitings desc desc";
  grid-template-columns: 100px 120px auto 50px;
  grid-template-rows: 25% auto;

  #poster {
    height: 100%;
    grid-area: poster;
    padding: 2px 0;
    cursor: move;
    object-fit: cover;
    max-width: 100px;
  }

  #title {
    grid-area: title;
    text-align: center;
    font-size: 1.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  #desc {
    grid-area: desc;
    font-size: 0.85rem;
    overflow: hidden;
    padding-right: 10px;
  }

  #actors {
    grid-area: actors;
  }

  #raitings {
    display: flex;
    grid-area: raitings;
    flex-flow: column;
    max-height: 150px;
    flex-wrap: wrap;
    padding: 5px;

    div {
      display: flex;
      flex-flow: column;
      text-align: center;
      height: 50%;
      width: 50%;
    }

    a {
      max-height: 50%;
      object-fit: contain;

      img {
        max-height: 100%;
      }
    }

    #rottentomatoes {
      grid-area: rotten;
    }

    #imdb {
      grid-area: imdb;
      object-fit: cover;
    }

    #metacritic {
      grid-area: meta;
    }
  }
`;

const StyledAddForm = styled(Form)`
  display: grid;
  grid-template-areas: "error error" "input button";
  grid-template-columns: 88% 10%;
  grid-gap: 2%;
  margin-bottom: 20px;

  ul {
    color: white;
    position: absolute;
    margin-top: 76px;
    width: 598px;
    overflow: hidden;
    z-index: 5;
    padding-top: 10px;
    padding-left: 0px;
    list-style: none;
    font-weight: bold;
    background: #fff;
    color: #676767;

    li {
      height: calc(1.5em + 0.75rem + 2px);
      padding: 0.375rem 0.75rem;
      border-bottom: 1px solid #d5d5d5;
    }
  }

  .form-group {
    grid-area: input;
    margin: 0;
  }

  button {
    grid-area: button;
  }
`;

const StyledSearchSuggestionList = styled.ul`
  color: red;
  position: absolute;
  margin-top: 76px;
  width: 600px;
  overflow: hidden;
  z-index: 5;

  li {
    cursor: pointer;
  }
`;

const StyledList = styled.ul`
  padding: 0;
  overflow-y: scroll;
  max-height: calc(100vh - 165px);
  margin: 0;
  scrollbar-color: rgb(33, 53, 66) rgb(5, 8, 10) !important;
  scrollbar-width: thin !important;
`;

const StyledErrorPlaceholder = styled.p`
  /* margin-bottom: 10px; */
  height: 41px;
  margin: 0;
`;

const StyledMovieNotFound = styled(Alert)`
  width: 50%;
  justify-self: center;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  grid-area: error;
  margin-bottom: 5px;

  button {
    padding: 0 !important;
  }
`;

const StyledLoadingContainer = styled.div`
  justify-content: center;
  display: grid;
  transition: all 2s ease-in;
  justify-items: center;

  h1 {
    color: #dddddd;
    text-align: center;
    font-size: ${props => props.fontSize || "2.5rem"};
  }
`;

const StyledCenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: -100px;
`;

const StyledSidebar = styled.div`
  background: white;
  width: 1000px;
  height: 800px;
  border-radius: 10px;

  ul {
    padding: 5px;
    width: 200px;
    list-style: none;
    border-right: 2px solid #898989;
  }
`;

const StyledMainContainer = styled.div`
  background: white;
  width: 1000px;
  height: 800px;
  border-radius: 10px;
  display: grid;
  grid-template-areas: "sidebar list";
  grid-template-columns: 200px auto;

  ul {
    padding: 5px;
    width: 200px;
    list-style: none;
    border-right: 2px solid #898989;
    text-align: center;
  }
`;

export {
  StyledListContainer,
  StyledContainer,
  DeleteIcon,
  StyledAddForm,
  StyledListItem,
  StyledSearchSuggestionList,
  StyledList,
  StyledMovieNotFound,
  StyledErrorPlaceholder,
  MoveIcon,
  StyledLoadingContainer,
  StyledSidebar,
  StyledCenterContainer,
  StyledMainContainer,
};
