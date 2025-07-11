'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Character, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
      User.hasMany(models.Note, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.CharacterImage, { foreignKey: 'userId', onDelete: 'CASCADE' });

    }
  }

  User.init(
    {
      firstName:{
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 50]
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 50]
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    }
  );
  return User;
};