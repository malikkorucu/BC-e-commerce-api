const customErrorHandler = (err: any, req: any, res: any, next: any) => {

  console.log('asdşflkjasdşlfkjaşlsdkfjşalskjf');
  const customError = err;
  res.status(err.status || 500).json({
    success: false,
    message: customError.message,
  });
};

export default customErrorHandler;
