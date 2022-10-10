
const dotenv = require('dotenv')
const fs = require('fs')

process.env = Object.assign(process.env, dotenv.parse(fs.readFileSync('./.env')));

module.exports = {
    "collectCoverage": true,
    "coverageReporters": ["json", "html"]
}