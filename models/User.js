export default function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(255),
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING(255),
        field: 'last_name',
      },
      email: {
        type: DataTypes.STRING(255),
      },
      password: {
        type: DataTypes.STRING(255),
      },
      phone: {
        type: DataTypes.STRING(50),
      },
      designation: {
        type: DataTypes.STRING(100),
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: 'is_verified',
        default: false,
      },
      role: {
        type: DataTypes.STRING(255),
      },
      otp: {
        type: DataTypes.STRING(255),
      },
      date: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      tableName: 'users',
      schema: 'public',
      indexes: [
        {
          name: 'users_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
}
