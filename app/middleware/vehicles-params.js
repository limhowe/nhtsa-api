export default function vehiclesParams(req, res, next) {
  const { modelYear, manufacturer, model } = req.body;

  if (!modelYear || !manufacturer || !model) {
    res.status(200).json({
      Counts: 0,
      Results: [],
    });
  } else {
    next();
  }
}
