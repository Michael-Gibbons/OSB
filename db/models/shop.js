"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shop.init(
    {
      shopName: DataTypes.STRING,
      longTermAccessToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shop",
    }
  );
  return Shop;
};
