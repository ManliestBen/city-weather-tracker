const router = require('express').Router();
const apiCtrl = require('../controllers/api');
const api = require('../controllers/api');

router.use(require('../config/auth'));
router.post('/weather', checkAuth, apiCtrl.getWeather);
router.get('/cities', checkAuth, apiCtrl.getCities);
router.post('/cities', apiCtrl.addCity);
router.delete('/cities/:id', apiCtrl.deleteCity);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
