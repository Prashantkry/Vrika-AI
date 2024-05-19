// !winston
const winston = require ( 'winston')
const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: winston.format.json({
        space: 4
    }),
    transports: [
        // new winston.transports.File({  // create a folder & logs all data.
        //     filename: "logs/all.log"
        // }),
        // new winston.transports.File({  // create a folder & logs all error data.
        //     filename: "logs/error.log",
        //     level: "error"
        // }),
    ]
})

if (process.env.NODE_ENV != "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

module.exports = logger