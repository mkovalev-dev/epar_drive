class ContentTypeConst:
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    PNG = "image/png"
    JPEG = "image/jpeg"


class PrefixFileConst:
    XLSX = ".xlsx"
    PPTX = ".pptx"
    DOCX = ".docx"
    PNG = ".png"
    JPEG = ".jpeg"


def get_prefix_file(content_type):
    """Определяет префикс документа по типу из запроса"""
    prefix = None
    if content_type == ContentTypeConst.XLSX:
        prefix = PrefixFileConst.XLSX
    elif content_type == ContentTypeConst.PPTX:
        prefix = PrefixFileConst.PPTX
    elif content_type == ContentTypeConst.DOCX:
        prefix = PrefixFileConst.DOCX
    elif content_type == ContentTypeConst.PNG:
        prefix = PrefixFileConst.PNG
    elif content_type == ContentTypeConst.JPEG:
        prefix = PrefixFileConst.JPEG

    return prefix
