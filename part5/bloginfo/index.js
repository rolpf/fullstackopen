import app from "./app.js";
import config from "./src/utils/config.js";
import logger from "./src/utils/logger.js";

app.listen(config.PORT, "0.0.0.0", (error) => {
  logger.info(`Server running on port ${config.PORT}`);
});
