const path = require('path');
const utils = require("../utils/utils.js");

class FileController {
  async store({ body, params }, res) {
    // Selecionar Id da Box
    // const box = await Box.findById(req.params.id);
    let { empId } = params;
    utils.devLog(2, null, empId);

    // Criar um arquivo
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key,
    });

    box.files.push(file);

    await box.save();

    req.io.sockets.in(box._id).emit("file", file);
    //todos usuarios conectados na box com esse id

    return res.json(file);
  }

  async test({ headers: {useId}, body, params, query, file }, res) {
    //{body, params, query, file, title}

    // Selecionar Id da Box
    // const box = await Box.findById(req.params.id);
    let { empId, memId } = params;
    utils.devLog(2, `empId => ${empId}`, null);
    utils.devLog(2, `memId => ${memId}`, null);

    let { title } = body;
    utils.devLog(2, `title => ${title}`, null);
    utils.devLog(2, `useId => ${useId}`, null);

    utils.devLog(2,`useId | header => ${headers.useId}`, null);

    utils.devLog(2, `file => `, null);
    utils.devLog(2, null, file);

    utils.devLog(2, "==================================", null);
    utils.devLog(2, null, query);
    utils.devLog(2, "==================================", null);

    // console.log(file);
    // console.log(title);

    // console.log(req);

    // Criar um arquivo
    // const file = await File.create({
    //     title: req.file.originalname,
    //     path: req.file.key,
    // });

    // box.files.push(file);

    // await box.save();

    // req.io.sockets.in(box._id).emit("file", file);
    //todos usuarios conectados na box com esse id

    const objFile = {
      title: title,
      patch: file.path,
    };

    return res.json(objFile);
  }

  async download(req, res) {

    try {

      const filePATH    = path.resolve(__dirname,'..','..', 'files', 'uploads');
      const fileKEY     = '14fa03362f9c3051285d4d1ca3d6d754688e22db0ae12d54e2e7ed641305.pdf';
      const fileTITLE   = 'titleFile.pdf';

      res.download(`${filePATH}/${fileKEY}`, `${fileTITLE}${path.extname(fileKEY)}`, (err) => {
        if (err) {
          utils.devLog(2, null, err);
          return utils.resError(500, 'API ==> Controller => employeesFilesDownload -> Download -> Error', utils.devDebugError(err), res);   
        } else {
          return utils.resSuccess('API ==> Controller => employeesFilesDownload -> Success', { status: true });    
        }
      });
    } catch (error) {
      return utils.resError(500,`API ==> Controller => download -> Error`, error, res);
    }

  }
}

// new -> devido se não ele instanciaria a classe, e não a instancia da classe
module.exports = new FileController();
