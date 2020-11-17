'use strict';

module.exports = (app, port) => {
  app.listen(port,
      () => console.log(`Localhost app is listening port ${port}`));
};