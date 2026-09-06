import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database";

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },

    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "Usuarios",
    timestamps: false
  }
);

export default Usuario;