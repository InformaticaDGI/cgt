const authRoles = {
    Admin: ['Admin', 'Superusuario'],
    Auditor: ['Admin', 'Superusuario', 'Auditor', 'Inspector'],
    Inspector: ['Admin', 'Superusuario', 'Inspector'],
    Usuario: ['Admin', 'Superusuario', 'Usuario'],
    Public: ['*']
}


export default authRoles