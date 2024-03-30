const pino = require('pino');

const createLogger = () => {
  const logger = pino({
    level: 'info',
    base: { from: 'backend' },
    timestamp: pino.stdTimeFunctions.isoTime
  });

  const createLogByLevel = (level) => {
    return (data = {}, config = {}) => {
      const final = { ...logger.base(), ...data };
      logger[level](final, config);
    };
  };

  return {
    info: createLogByLevel('info'),
    warning: createLogByLevel('warning'),
    error: createLogByLevel('error')
  };
};

module.exports = createLogger()
// const logger = createLogger('logfile.log');
// logger.info({ message: 'This is an information message.' });
// logger.warning({ message: 'This is a warning message.' });
// logger.error({ message: 'This is an error message.' });
