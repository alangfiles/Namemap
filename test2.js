const { spawn } = require('child_process');

async function runEcho() {
  const command = '/usr/local/bin/ollama';
  const args = ['run', 'llama3.2', 'hello world'];

  const child = spawn(command, args, { shell: true });

  const timeout = setTimeout(() => {
    console.error('Process timed out. Killing it...');
    child.kill(); // Kill the process if it hangs
  }, 5000); // 5-second timeout

  child.stdout.on('data', (data) => {
    console.log(`STDOUT: ${data.toString()}`);
    clearTimeout(timeout); // Clear the timeout if the process succeeds
  });

  child.stderr.on('data', (data) => {
    console.error(`STDERR: ${data.toString()}`);
    clearTimeout(timeout); // Clear the timeout if the process succeeds
  });

  child.on('close', (code) => {
    clearTimeout(timeout); // Clear the timeout when the process exits
    console.log(`Process exited with code ${code}`);
  });

  child.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });
}

runEcho();