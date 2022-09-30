import apiProd from "../services/apiProd";

const extensions = {
  docs: ["docx", "doc", "odt"],
  excel: ["xlsx", "xls"],
};

export async function fileActionByType(file) {
  const {
    data: { resData },
  } = await apiProd.get(`api/companies/files/${file.filKey}`);

  const type = file.filType?.split(".")[1].toLowerCase();

  const filePath = `https://${resData.url}`;

  if (extensions.docs.includes(type)) {
    window.open(
      `https://docs.google.com/gview?url=${filePath}&embedded=true`,
      "_blank"
    );
  } else if (extensions.excel.includes(type)) {
    window.open(
      `https://view.officeapps.live.com/op/embed.aspx?src=${filePath}`,
      "_blank"
    );
  } else {
    window.open(filePath, "_blank");
  }
}
