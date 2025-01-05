import path from 'path'
import readline from 'readline'
import fs from 'fs'
import osData from 'os'
const os=osData.homedir()
const rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt: '=> ', historySize: 100})
const historyFile = path.join(os, ".test_command_history")
try { rl.history = JSON.parse(fs.readFileSync(historyFile, "utf-8")) } catch (error) {}

rl.on('SIGINT', () => rl.close())
rl.on('history', (history) => fs.writeFileSync(historyFile, JSON.stringify(history)))
rl.on('line', (input) => {
  if(input != '') {
    input = input.replace(/ +/g, ' ').trim()
    const [command, ...arr] = input.split(' ')
    if(rl.listenerCount(command)) rl.emit(command, arr)
    else console.log(`The command '${command}' was not found`)
  }
  rl.prompt()
})
rl.prompt()
rl.on('test', console.log)

export default rl
