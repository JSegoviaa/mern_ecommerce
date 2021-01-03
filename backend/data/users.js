import bcrypt from 'bcryptjs';

//Creación de usuario administrador
const users = [
  {
    name: 'Isabel Segovia',
    email: 'gisabellsegovia@gmail.com',
    password: bcrypt.hashSync('Metlife', 10),
    isAdmin: true,
  },
];

export default users;
