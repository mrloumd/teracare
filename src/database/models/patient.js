/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define(
    'patient',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      underscored: true,
      deletedAt: false,
    },
  );

  patient.sync({ force: false, alter: true });

  return patient;
};
