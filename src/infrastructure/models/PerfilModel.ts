import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database";

class Perfil extends Model {}

Perfil.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },

    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },

    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true
    },

    genero: {
      type: DataTypes.STRING,
      allowNull: true
    },

    biografia: {
      type: DataTypes.STRING,
      allowNull: true
    },

    foto: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "Perfil",
    tableName: "Perfil",
    timestamps: false
  }
);

export default Perfil;