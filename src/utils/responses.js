//* Helper Function To Format Success Response
const successResponse = (res, statuscode = 200, data) => {
  return res
    .status(statuscode)
    .json({ status: statuscode, success: true, data });
};

//* Helper Function To Format Error Response
const errorResponse = (res, statuscode, message, data) => {
  console.log({ message, data });
  return res
    .status(statuscode)
    .json({ status: statuscode, success: false, error: message, data });
};

module.exports = { successResponse, errorResponse };
