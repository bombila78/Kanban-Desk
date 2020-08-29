'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
   
    static associate(models) {
      
    }
  };
  Todo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startTimestamp: {
      type:  DataTypes.BIGINT,
      field: 'start_timestamp'
    },
    finishTimestamp: {
      type:  DataTypes.BIGINT,
      field: 'finish_timestamp'
    }
  }, {
    sequelize,
    modelName: 'Todo',
    timestamps: false
  });
  return Todo;
};