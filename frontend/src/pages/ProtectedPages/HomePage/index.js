import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolderData,
  folderHeaderInfo,
  folderList,
  listFolderData,
  listFolderStatus,
  newFolderData,
} from "../../slice/sliceFolder";
import StateComponents from "../StateComponents";
import PageHeaderCustom from "../../../components/PageHeaderCustom";
import ListItems from "../../../components/ListItems";
import {
  deleteFileData,
  fileList,
  listFileData,
  renameFileData,
  uploadFileChanger,
} from "../../slice/sliceFile";

export default function ProtectedHomePage() {
  const stateNewFolder = useSelector(newFolderData);
  const dispatch = useDispatch();
  const stateFolderListData = useSelector(listFolderData);
  const stateFileListData = useSelector(listFileData);
  const stateFolderListStatus = useSelector(listFolderStatus);
  const stateFolderDelete = useSelector(deleteFolderData);
  const stateFileDelete = useSelector(deleteFileData);
  const stateUploadFileChanger = useSelector(uploadFileChanger);
  const stateRenameFileData = useSelector(renameFileData);
  useEffect(() => {
    dispatch(folderList());
    dispatch(fileList());
    dispatch(folderHeaderInfo(0));
  }, [
    stateNewFolder,
    stateFolderDelete,
    stateUploadFileChanger,
    stateRenameFileData,
    stateFileDelete,
  ]);

  return (
    <StateComponents>
      <PageHeaderCustom title="Файлы" back={false} />
      <ListItems
        listData={[...stateFolderListData, ...stateFileListData]}
        status={stateFolderListStatus}
      />
    </StateComponents>
  );
}
