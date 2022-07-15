import PageHeaderCustom from "../../../components/PageHeaderCustom";
import React from "react";
import StateComponents from "../StateComponents";
import { Skeleton, Spin } from "antd";
import ListItems from "../../../components/ListItems";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolderData,
  folderHeaderInfo,
  folderRetrieveList,
  headerFolderData,
  listFolderRetrieveData,
  listFolderRetrieveStatus,
  newFolderData,
} from "../../slice/sliceFolder";
import {
  deleteFileData,
  fileInFolderList,
  listFileInFolderData,
  renameFileData,
  uploadFileChanger,
} from "../../slice/sliceFile";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import BreadCrumbCustom from "../../../components/FolderComponents/BreadCrumpCustom";

export default function FolderPage() {
  const { id } = useParams();
  const stateNewFolder = useSelector(newFolderData);
  const dispatch = useDispatch();
  const stateFolderRetrieveListData = useSelector(listFolderRetrieveData);
  const stateFolderRetrieveListStatus = useSelector(listFolderRetrieveStatus);
  const stateFolderDelete = useSelector(deleteFolderData);
  const stateFileDelete = useSelector(deleteFileData);
  const stateUploadFileChanger = useSelector(uploadFileChanger);
  const stateRenameFileData = useSelector(renameFileData);
  const stateFilesInFolderData = useSelector(listFileInFolderData);
  const stateHeaderFolderData = useSelector(headerFolderData);

  useEffect(() => {
    dispatch(folderRetrieveList(id));
    dispatch(fileInFolderList(id));
    dispatch(folderHeaderInfo(id));
  }, [
    stateNewFolder,
    stateFolderDelete,
    stateUploadFileChanger,
    stateRenameFileData,
    stateFileDelete,
    id,
  ]);
  return (
    <StateComponents>
      <PageHeaderCustom
        title={stateHeaderFolderData?.name}
        back={<ArrowLeftOutlined />}
        breadcrumb={
          <BreadCrumbCustom routes={stateHeaderFolderData?.breadcrump} />
        }
      />
      {stateFolderRetrieveListData && stateFilesInFolderData ? (
        <ListItems
          listData={[...stateFolderRetrieveListData, ...stateFilesInFolderData]}
          status={stateFolderRetrieveListStatus}
        />
      ) : (
        <Spin />
      )}
    </StateComponents>
  );
}
