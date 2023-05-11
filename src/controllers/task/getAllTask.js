const {Task} = require('../../models');

module.exports = async (req,res) => {
  try {
    const pageSize = req.query && req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const page = req.query && req.query.page ? parseInt(req.query.page) : 1;
    const status = req.query && req.query.status ? req.query.status : ['Todo', 'Inprocess', 'Done'];

    let where = {
        status
    };
    
    if(req.user.userType === "User"){
        where.user = req.user.id;
    }

    const data = await Task.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return res.status(200).json({
        message:'task retrived success',
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(data.count / pageSize),
        pageSize: pageSize,
        totalRecords: data.count,
      },
      tasks: data.rows
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
