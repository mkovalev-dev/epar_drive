import * as React from "react";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { L10n } from "@syncfusion/ej2-base";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, notification, PageHeader, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveFile,
  retrieveFileData,
  saveFile,
} from "../../pages/slice/sliceFile";
import { unwrapResult } from "@reduxjs/toolkit";

export default function ViewSheet({ src }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [allowSave, setAllowSave] = useState(false);
  const [ssObj, setSsObj] = useState();
  const dispatch = useDispatch();
  const stateFileData = useSelector(retrieveFileData);
  const navigate = useNavigate();
  L10n.load({
    "ru-RU": {
      spreadsheet: {
        File: "Файл",
        Home: "Главная",
        Insert: "Вставить",
        Formulas: "Формулы",
        Data: "Данные",
        View: "Просмотр",
        Cut: "Вырезать",
        Copy: "Скопировать",
        Paste: "Вставить",
        PasteSpecial: "Специальная вставка",
        All: "Tous les",
        Values: "Значения",
        Formats: "Форматы",
        Font: "Шрифт",
        FontSize: "Размер шрифта",
        Bold: "Жирный",
        Italic: "Курсив",
        Underline: "Подчеркнутый",
        Strikethrough: "Зачеркнутый",
        TextColor: "Цвет текста",
        FillColor: "Цвет ячейки",
        HorizontalAlignment: "Горизонтальное выравнивание",
        AlignLeft: "По левому краю",
        AlignCenter: "По центру",
        AlignRight: "По правому краю",
        VerticalAlignment: "Вертикальное выравнивание",
        AlignTop: "Выравнивание по верху",
        AlignMiddle: "Выравнивание по центру",
        AlignBottom: "Выравнивание по низу",
        InsertFunction: "Вставить функцию",
        Delete: "Удалить",
        Rename: "Переименовать",
        Hide: "Скрыть",
        Unhide: "Показать",
        NumberFormat: "Формат",
        Open: "Открыть",
        New: "Новый документ",
        SaveAs: "Сохранить как...",
        Undo: "Назад",
        Redo: "Вперед",
        WrapText: "Перенос текста",
        FindAndReplace: "Поиск и Замена",
      },
    },
  });

  useEffect(() => {
    dispatch(retrieveFile(id))
      .then(unwrapResult)
      .then(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          <PageHeader
            title={
              <>
                {stateFileData.name}
                {stateFileData?.read_only && (
                  <small style={{ color: "rgb(187,187,187)" }}>
                    (Режим чтения)
                  </small>
                )}
              </>
            }
            onBack={() => navigate(-1)}
            extra={[
              !stateFileData?.read_only && (
                <Button
                  loading={saveLoading || loading}
                  className="btn-warning-custom"
                  disabled={!allowSave}
                  onClick={() => {
                    ssObj.save({
                      url: "https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save",
                      fileName: "Worksheet",
                      saveType: "Xlsx",
                    });
                  }}
                >
                  Сохранить
                </Button>
              ),
            ]}
          />
          <SpreadsheetComponent
            ref={(ssObj) => {
              setSsObj(ssObj);
            }}
            actionBegin={(arg) => {
              setAllowSave(true);
            }}
            // cellEdit={(arg) => {
            //   setAllowSave(true);
            // }}
            // cellEditing={(arg) => {
            //   setAllowSave(true);
            // }}
            // cellSave={(arg) => {
            //   setAllowSave(true);
            // }}
            height="100vh"
            width="100%"
            allowEditing={!stateFileData.read_only}
            locale="ru-RU"
            allowOpen={true}
            beforeSave={(arg) => {
              setSaveLoading(true);
              arg.needBlobData = true;
            }}
            hideFileMenuItems={(arg) => {
              arg.hideFileMenuItems(["File"], true, true);
            }}
            saveComplete={(args) => {
              dispatch(saveFile({ file: args.blobData, id: id }))
                .then(unwrapResult)
                .then((res) => {
                  setSaveLoading(false);
                  console.log(res);
                  notification.success({
                    key: "success-hard-delete",
                    message: `Файл "${res.name}" успешно сохранен!`,
                    style: {
                      bottom: -24,
                      width: 325,
                      borderRadius: "25px 25px 0 0",
                      marginBottom: "7px",
                    },
                    placement: "bottomLeft",
                  });
                })
                .catch((err) => {
                  notification.error({
                    key: "success-hard-delete",
                    message: "Файл не сохранился!",
                    style: {
                      width: 325,
                      borderRadius: "25px 25px 0 0",
                      marginBottom: "7px",
                      bottom: -24,
                    },
                    placement: "bottomLeft",
                  });
                });
            }}
            created={() => {
              if (stateFileData?.src) {
                fetch(stateFileData.src) // fetch the remote url
                  .then((response) => {
                    response.blob().then((fileBlob) => {
                      var file = new File([fileBlob], "Sample.xlsx"); //convert the blob into file
                      ssObj.open({ file: file }); // open the file into Spreadsheet
                    });
                  });
              }
            }}
            // allowSave={true}
            openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
            saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
          />
        </>
      )}
    </>
  );
}
