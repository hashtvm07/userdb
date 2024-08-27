const { Request, Response } = require('express');

export const getLog = async (req, res) => {
    res.send('logs are here..')
};
