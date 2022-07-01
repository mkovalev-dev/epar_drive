import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolderData,
  folderList,
  listFolderData,
  listFolderStatus,
  newFolderData,
} from "../../slice/sliceFolder";
import StateComponents from "../StateComponents";
import PageHeaderCustom from "../../../components/PageHeaderCustom";
import ListItems from "../../../components/ListItems";

export default function ProtectedHomePage() {
  const stateNewFolder = useSelector(newFolderData);
  const dispatch = useDispatch();
  const stateFolderListData = useSelector(listFolderData);
  const stateFolderListStatus = useSelector(listFolderStatus);
  const stateFolderDelete = useSelector(deleteFolderData);
  useEffect(() => {
    dispatch(folderList());
  }, [stateNewFolder, stateFolderDelete]);

  return (
    <StateComponents>
      <PageHeaderCustom title="Файлы" backIcon={false} />
      <ListItems
        listData={[...stateFolderListData]}
        status={stateFolderListStatus}
      />
    </StateComponents>
  );
}
