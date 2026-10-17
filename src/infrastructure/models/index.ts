import Usuario from "./UsuarioModel";
import Perfil from "./PerfilModel";
import Censo from "./CensoModel";

// Asociaciones usadas para validar relaciones y devolver datos relacionados.
Usuario.hasOne(Perfil, { foreignKey: "usuarioId", as: "perfil", onDelete: "CASCADE" });
Perfil.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Usuario.hasMany(Censo, { foreignKey: "usuarioId", as: "censos", onDelete: "RESTRICT" });
Censo.belongsTo(Usuario, { foreignKey: "usuarioId", as: "censista" });

export { Usuario, Perfil, Censo };
