const express = require('express'); 
const router = express.Router(); 

router.get('/', (reg, res) => {
    res.render('index/welcome'); 
}); 
router.get('/dashboard', (reg, res) => {
    res.send('Dashboard'); 
}); 

module.exports = router;
