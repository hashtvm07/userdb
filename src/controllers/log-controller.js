const { Request, Response } = require('express');

exports.getLog = async (req, res) => {
    res.send('logs are here..')
};
