export const getUniqueId = () => {
  return new Date().getTime();
};

export const getIconLetters = name => {
  let fullName = name.split(' ');
  let iconLetters =
    fullName && fullName.length > 0
      ? fullName[0].substring(0, 1).toUpperCase()
      : 'U';

  if (fullName.length > 1) {
    iconLetters += fullName[1].substring(0, 1).toUpperCase();
  }
  return iconLetters;
};

export const handleFetchPagination = (pageSize, list, listToDisplay) => {
  let newPageSize = pageSize;
  let newList = list;
  let newListToDisplay = listToDisplay;
  if (newPageSize < list.length) {
    newList = list.slice(newPageSize, newPageSize + 5);
    if (newList) {
      newListToDisplay = [...newListToDisplay, ...newList];
    }
    newPageSize += 5;
    newList;
    return {newPageSize, newList, newListToDisplay};
  }
  return false;
};

export const handleDeleteItemFromList = (
  deletedItem,
  list,
  displayListLength,
) => {
  let newList = [...list];
  newList = newList?.filter((item, i) => item.id !== deletedItem.id);
  let displayedList = newList.slice(0, displayListLength - 1);
  return {newList, displayedList};
};

export const handleAddItemToList = (item, list, listToDisplay) => {
  let newList = list && list.length > 0 ? [...list] : [];
  let newListToDisplay =
    listToDisplay && listToDisplay.length > 0 ? [...listToDisplay] : [];
  let id = getUniqueId();
  newList = [{...item, id}, ...newList];
  newListToDisplay = [{...item, id}, ...newListToDisplay];
  return {newList, newListToDisplay};
};

export const startingTenRecord = list => {
  let newList = [...list];
  newList = newList.length > 10 ? newList.slice(0, 10) : newList;
  return newList;
};
