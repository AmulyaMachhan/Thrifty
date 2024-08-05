import { isValidObjectId } from "mongoose";

const checkId = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404), json("Invalid Product ID");
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(404), json("Invalid Product ID");
  }
};

export { checkId };
