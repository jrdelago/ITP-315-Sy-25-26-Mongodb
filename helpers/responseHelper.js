// helpers pag send hin standardized success response
export const successResponse = (
  res,
  statusCode = 200,
  message,
  data = null
) => {
  // pag construct han response object
  const response = {
    success: true,
    message,
  };
  // pag include han data kon ada
  if (data !== null) {
    response.data = data;
  }
  // pag return han response ha client
  return res.status(statusCode).json(response);
};

// helpers pag send hin standardized error response
export const errorResponse = (res, statusCode = 500, message, error = null) => {
  // pag construct han response object
  const response = {
    success: false,
    message,
  };
  // pag include han error details kon ada ngan development mode
  if (error !== null && process.env.NODE_ENV === "development") {
    response.error = error;
  }
  // pag return han response ha client
  return res.status(statusCode).json(response);
};
