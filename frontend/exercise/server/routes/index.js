var express = require('express');
var router = express.Router();

/**
* @swagger
* definitions:
*   Error:
*     content:
*       application/json:
*         schema:
*           type: object
*           properties:
*             error:
*               type: string
*/

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.send('Hello!');
});

module.exports = router;
