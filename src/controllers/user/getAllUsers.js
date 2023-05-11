const {User} = require('../../models');

module.exports = async (req,res) => {
  try {
    const pageSize = req.query && req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query && req.query.page ? parseInt(req.query.page) : 1;

    const data = await User.findAndCountAll({
        attributes:['id','firstName','lastName','email','createdAt','updatedAt'],
      where: {
        userType: "User",
      },
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return res.status(200).json({
        message:'users retrived success',
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(data.count / pageSize),
        pageSize: pageSize,
        totalRecords: data.count,
      },
      users: data.rows
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
