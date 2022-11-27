import fs from 'fs'

// This outputs logs from winston in web/backend/services/logger/devLogger.js

// This has the effect of using colorized logs that bypass the shopify-cli default: backend logs = blue, frontend logs = yellow.

fs.writeFileSync('./log.log', '', {flags: 'w'})// Clear log file on startup
fs.writeFileSync('./log-old.log', '', {flags: 'w'})// Clear log file on startup

// Check 10 times a second for changes to the log file
// If detected, compare new and old log files
// If no change, logs are caught up within the last 100ms, clear out log and log-old
// If changed, find the difference between them and log it.
// Clear log and set log-old

// Retains colors from winston dev logger.
fs.watchFile('./log.log', { interval: 100 } , function(e,t){
  const newLog = fs.readFileSync('./log.log', {encoding: 'utf8', flags: 'a'})
  const oldLog = fs.readFileSync('./log-old.log', {encoding: 'utf8', flags: 'a'})

  if(newLog == oldLog){
    fs.writeFileSync('./log.log', '')
    fs.writeFileSync('./log-old.log', '')
    return
  }

  const mostRecentLog = newLog.replace(oldLog, "").trim()

  if(mostRecentLog){
    console.log(mostRecentLog) // Has all your fancy logger styles, you're welcome.
  }

  fs.writeFileSync('./log.log', '')
  fs.writeFileSync('./log-old.log', newLog)
})