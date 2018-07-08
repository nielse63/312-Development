console.log(process.argv);

function exec(cmd) {
  // eslint-disable-next-line global-require
  return require('child_process').execSync(cmd).toString().trim();
}

const files = process.argv.slice(2);
if (!files.length) {
  process.exit();
}

files.forEach((file) => {
  const output = exec(`yarn remark -S ${file} -o ${file}`);
  console.log(output);
});

process.exit(1);
