import Nhtsa from '../models/nhtsa';

class VehiclesController {
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
