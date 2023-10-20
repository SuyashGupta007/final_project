const express = require('express')
const router = express.Router();
const {getAllData,getAllDataTesting,jsondatawithlimit} = require("../controllers/jsondata")
router.route("/").get(getAllData);
router.route("/testing").get(getAllDataTesting)
router.route("/jsondatawithlimit").get(jsondatawithlimit)

module.exports = router;