import axios from "axios";
// import { getCookie } from "../utilities/Utilities";

const onDragStart = (e, index, postOrderTimer, setDragSelected, list, type) => {
  clearTimeout(postOrderTimer.current);
  setDragSelected(list[index]);
  e.dataTransfer.effectAllowed = "move";
  e.target.parentNode.style.background = "rgb(80, 80, 80)";
  e.dataTransfer.setData("text/html", e.target.parentNode);
  type === "default"
    ? e.dataTransfer.setDragImage(e.target.parentNode, 0, 25)
    : e.dataTransfer.setDragImage(e.target.parentNode, 49, 75);
};

const onDragOver = (index, list, dragSelected, updateLists, listName, type) => {
  const draggedOverItem = list[index];

  if (type === "default") {
    if (dragSelected === draggedOverItem) return;

    if (draggedOverItem) {
      let items = list.filter(item => item !== dragSelected);

      items.splice(index, 0, dragSelected);

      updateLists(listName, items);
    }
  } else {
    if (dragSelected.Title === draggedOverItem.Title) return;

    if (draggedOverItem) {
      let items = list.filter(item => item.Title !== dragSelected.Title);

      items.splice(index, 0, dragSelected);

      updateLists(listName, items);
    }
  }
};

const onDragEnd = (e, username, postOrderTimer, list, listName, type) => {
  e.target.parentNode.style.background = "inherit";

  postOrderTimer.current = setTimeout(async () => {
    await axios
      .put(`https://hqfxod3kld.execute-api.eu-north-1.amazonaws.com/Prod/list/update`, {
        username: username,
        listItems: { type: type, items: list },
        listName: listName,
      })
      .catch(e => {
        console.error(e);
      });
  }, 5000);
};

export { onDragStart, onDragOver, onDragEnd };
