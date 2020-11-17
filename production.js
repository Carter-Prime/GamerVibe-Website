'use strict';

module.exports = (app, port) => {
  // TODO: Redirect to https

  app.listen(port,
      () => console.log(`Production app is listening port ${port}`));
};