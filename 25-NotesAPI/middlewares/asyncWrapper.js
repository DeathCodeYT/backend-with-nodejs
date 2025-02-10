export const asyncWrapper = (reqHandler) => async (req, res, next) => {
    try {
      await reqHandler(req, res, next);
    } catch (error) {
      next(error)
    }
  };