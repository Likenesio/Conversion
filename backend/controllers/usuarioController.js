const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const insert = async (req, res) => {
  try {
    const existingUser = await Usuario.findOne({ correo: req.body.correo });
    if (existingUser) {
      return res.status(400).send({ message: "El correo electrónico ya está en uso" });
    }
    
    let usuario = new Usuario();
    const salt = 12;
    const pass = req.body.contrasenia;
    usuario.rut_usuario = req.body.rut_usuario;
    usuario.nombre_usuario = req.body.nombre_usuario;
    usuario.apellido = req.body.apellido;
    usuario.contrasenia = await bcrypt.hash(pass, salt);
    usuario.fono = req.body.fono;
    usuario.correo = req.body.correo;
    usuario.rol = req.body.rol;
    
    usuario.save()
      .then((createUsuario) => {
        res.status(200).send({ createUsuario });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error al crear usuario: " + err });
      });
  } catch (err) {
    res.status(500).send({ message: "Error al crear usuario: " + err });
  }
};

const eliminar = (req, res) => {
  let usuarioId = req.params._id;
  Usuario.findByIdAndDelete(usuarioId)
    .then((usuario) => {
      res.status(200).send({ message: "Se elimino usuario exitosamente" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al eliminar usuario" });
    });
};


const listar = (req, res) => {
  Usuario.find({})
    .then((usuario) => {
      res.status(200).send({ usuario });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error al listar los usuarios" });
    });
};


const login = async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      res.status(404).json({ message: "Correo no encontrado" });
      return;
    }

    const passMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);

    if (!passMatch) {
      res.status(401).send({ message: "Contraseña inválida" });
      return;
    }

    const token = jwt.sign(
      { userId: usuario._id, rol: usuario.rol },
      "penelope",
      { expiresIn: "7d" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).send({ message: "Error al iniciar sesión", error });
    return;
  }
};



module.exports = { insert, eliminar, listar, login};