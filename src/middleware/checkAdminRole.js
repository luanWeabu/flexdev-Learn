function checkAdminRole(req, res, next) {
    // Mã hóa ngược lại token đấy để lấy roles
    // const roles = [...];

    // Kiểm tra trong token có role được cho phép không
    const { roles } = req;

    if (roles.includes("ADMIN")) {
        next();
        return;
    }

    res.status(403).json({
        message: 'The current user is not an Admin'
    });
}

module.exports = checkAdminRole;