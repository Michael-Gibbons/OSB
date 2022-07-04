"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Webhooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Webhooks.init(
    {
      webhooks: DataTypes.STRING,
      host: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Webhooks",
    }
  );
  return Webhooks;
};
