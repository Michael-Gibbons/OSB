"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Session.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      shop: {
        type: DataTypes.STRING,
      },
      payload: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  return Session;
};
