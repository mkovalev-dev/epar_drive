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
import {
  fileList,
  listFileData,
  uploadFileChanger,
} from "../../slice/sliceFile";

export default function ProtectedHomePage() {
  const stateNewFolder = useSelector(newFolderData);
  const dispatch = useDispatch();
  const stateFolderListData = useSelector(listFolderData);
  const stateFileListData = useSelector(listFileData);
  const stateFolderListStatus = useSelector(listFolderStatus);
  const stateFolderDelete = useSelector(deleteFolderData);
  const stateUploadFileChanger = useSelector(uploadFileChanger);
  useEffect(() => {
    dispatch(folderList());
    dispatch(fileList());
  }, [stateNewFolder, stateFolderDelete, stateUploadFileChanger]);

  return (
    <StateComponents>
      <PageHeaderCustom title="Файлы" backIcon={false} />
      <ListItems
        listData={[...stateFolderListData, ...stateFileListData]}
        status={stateFolderListStatus}
      />
    </StateComponents>
  );
}
