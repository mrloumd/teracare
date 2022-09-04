/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const reading = sequelize.define(
    'reading',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      oxygen_level: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      heart_rate: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      patient_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      device_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      deletedAt: false,
    },
  );
  reading.associate = (models) => {
    reading.belongsTo(models.patient, {
      foreignKey: 'patient_id',
      as: 'patient',
    });
  };

  reading.sync({ force: false, alter: true });

  return reading;
};
