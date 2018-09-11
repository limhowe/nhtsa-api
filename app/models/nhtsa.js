import Constants from "../config/constants";
import axios from "axios";

const { nhtsaApiPrefix } = Constants;

class NhtsaApiModel {
  vehicleInfoById = async vehicleId => {
    return await axios.get(
      `${nhtsaApiPrefix}/VehicleId/${vehicleId}?format=json`
    );
  };

  vehicleInfoByKind = async ({ modelYear, manufacturer, model, query }) => {
    return await axios.get(
      `${nhtsaApiPrefix}/modelyear/${modelYear}/make/${manufacturer}/model/${model}?format=json`
    );
  };
}

export default new NhtsaApiModel();
