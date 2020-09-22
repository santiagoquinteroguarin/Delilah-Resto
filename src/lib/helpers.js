const bcrypt = require('bcryptjs');
const helpers = {};

// Encriptar Contraseña
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); //Salt Generar un hash
    const hash = await bcrypt.hash(password, salt); //Cifrar basado en los parametros
    return hash;
};

// Comparar Contraseñas - contraseña ingresada y el hash que esta en la base de datos
helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword); //Compare
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;