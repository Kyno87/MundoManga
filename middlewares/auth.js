// middlewares/auth.js
module.exports = {
  isAdmin: (req, res, next) => {
    if (req.session.usuario && req.session.usuario.rol === 'admin') return next();
    return res.status(403).send('Acceso solo para administradores');
  },
  isLogged: (req, res, next) => {
    if (req.session.usuario) return next();
    return res.redirect('/login');
  }
};
