exports.loginUser = (req, res) => {
    res.status(200).json({data: {'user': req.user}})
}

exports.logoutUser = (req, res) => {
    req.logout()
    res.status(200).json({data: null})
}