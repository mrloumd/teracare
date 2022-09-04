/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const device = sequelize.define(
    'device',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      patient_id: {
        allowNull: true,
        type: DataTypes.UUID,
        defaultValue: null,
      },
    },
    {
      indexes: [{ unique: true, fields: ['name'] }],
    },
    {
      underscored: true,
      deletedAt: false,
    },
  );

  device.associate = (models) => {
    device.hasMany(models.reading, {
      foreignKey: 'device_id',
      as: 'device',
    });
    device.belongsTo(models.patient, {
      foreignKey: 'patient_id',
      as: 'patient',
    });
  };

  device.sync({ force: false, alter: true });

  return device;
};
