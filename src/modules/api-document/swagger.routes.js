const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const router = express.Router();

const swaggerOptions = {
  customCss: ".swagger-ui .topbar {display:none}",
};

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument, swaggerOptions));

module.exports = router;
