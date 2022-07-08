import StateComponents from "../StateComponents";
import PageHeaderCustom from "../../../components/PageHeaderCustom";
import React, { useEffect } from "react";
import ListItems from "../../../components/ListItems";
import { useDispatch, useSelector } from "react-redux";
import {
  listTrashFolderData,
  listTrashFolderStatus,
  trashFolderList,
} from "../../slice/sliceFolder";
import { listTrashFileData, trashFileList } from "../../slice/sliceFile";

export default function TrashPage() {
  const dispatch = useDispatch();
  const stateTrashFolderListData = useSelector(listTrashFolderData);
  const stateTrashFileListData = useSelector(listTrashFileData);
  const stateTrashFolderListStatus = useSelector(listTrashFolderStatus);

  useEffect(() => {
    dispatch(trashFolderList());
    dispatch(trashFileList());
  }, []);

  return (
    <StateComponents>
      <PageHeaderCustom title="Корзина" backIcon={false} />
      <ListItems
        listData={[...stateTrashFolderListData, ...stateTrashFileListData]}
        status={stateTrashFolderListStatus}
        trash={true}
      />
    </StateComponents>
  );
}
