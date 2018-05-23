import bootstrap from './bootstrap'
import {
  spawn
} from 'child_process'
import excel from './lib/export'
bootstrap().then(() => {
  // const ls = spawn('npm', ['run', 'es7', './lib/export.js']);
  excel();
  // ls.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });

  // ls.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });

  // ls.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });

})