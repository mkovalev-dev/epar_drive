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

export default function TrashPage() {
  const dispatch = useDispatch();
  const stateTrashFolderListData = useSelector(listTrashFolderData);
  const stateTrashFolderListStatus = useSelector(listTrashFolderStatus);

  useEffect(() => {
    dispatch(trashFolderList());
  }, []);

  return (
    <StateComponents>
      <PageHeaderCustom title="Корзина" backIcon={false} />
      <ListItems
        listData={[...stateTrashFolderListData]}
        status={stateTrashFolderListStatus}
        trash={true}
      />
    </StateComponents>
  );
}
