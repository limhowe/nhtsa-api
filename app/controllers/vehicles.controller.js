import Nhtsa from '../models/nhtsa';

class VehiclesController {
  fetch = async (req, res, next) => {
    try {
      const source = await Nhtsa.vehicleInfoByKind(req.params);
      const { withRating } = req.query;
      if (withRating === 'true') {
        const { Count, Results: vehiclesByKind } = source.data;
        const Results = await vehiclesByKind.reduce(async (previousPromise, { VehicleId: vehicleId }) => {
          let collection = await previousPromise;
          try {
            const {
              data: { Results: vehicles },
            } = await Nhtsa.vehicleInfoById(vehicleId);

            collection = collection.concat(
              vehicles.map(({ OverallRating: CrashRating, VehicleId, VehicleDescription: Description }) => ({
                CrashRating,
                Description,
                VehicleId,
              }))
            );
          } catch (error) {
            // SHOULD LOG ERRORS
            next(error);
          }
          return collection;
        }, Promise.resolve([]));

        res.json({
          Count,
          Results,
        });
      } else {
        const { Message, ...others } = source.data;
        res.json(others);
      }
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const source = await Nhtsa.vehicleInfoByKind(req.body);
      const { Message, ...others } = source.data;
      res.json(others);
    } catch (error) {
      next(error);
    }
  };
}

export default new VehiclesController();
