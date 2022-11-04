const { Op, or } = require("sequelize");
const QuizType = require("../../models/resource/QuizType.model");
const association = require("../../models")

exports.create = async (req, res) => {
  try {
    const createQuizType = await QuizType.create(req.body);
    res.status(200).json(createQuizType);
  } catch (e) {
    res.status(500).json({
      message: "Something wrong here !!!",
    });
  }
};

exports.findAll = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }
  try {
    const data = await QuizType.findAndCountAll({
      attributes: ['id','name','description'],
      limit: size,
      offset: (page - 1) * size,
      where: {
        name : {
          [Op.like]: `%${req.query.name  === undefined ? '': req.query.name}%`
        },
      }
    });
    res.status(200).json({
      currentPage: page,
      itemIsAllpage: data.count,
      pageSum: Math.ceil(data.count / size ),
      content: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      code: "UNKNOWN_ERROR",
      message: "Something wrong here !!!",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const dataId = await QuizType.findOne({
      where: { id },
      isDeleted: false
    });
    if (!dataId) {
      res.status(404).json({
        message: "Not Found !!",
      });
    }
    return res.status(200).json(dataId);
  } catch (error) {
    res.status(500).json({
      code: "UNKNOWN_ERROR",
      message: "Something wrong here!!!",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateQuizType = await QuizType.findOne({
      where: { id },
      isDeleted: false
    });
    if (!updateQuizType) {
      res.status(404).json({
        message: "Not_Found !!",
      });
    }
    updateQuizType.set(req.body);
    const quizType = await updateQuizType.save();
    res.status(200).json(quizType);
  } catch (error) {
    res.status(500).json({
      code: "UNKNOWN_ERROR",
      message: "Something wrong here !!",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteById = await QuizType.findOne({
      where: { id },
      isDeleted: false
    });
    if (!deleteById) {
      res.status(404).json({
        message: "Not Found !!",
      });
    }
    deleteById.set({isDeleted: true})
    await deleteById.save();
    res.status(200).json({message: `Deleted By id:${id} is successfully`});
  } catch (error) {
    res.status(500).json({
      code: "UNKNOWN_ERROR",
      message: "Something wrong here !!",
    });
  }
};
