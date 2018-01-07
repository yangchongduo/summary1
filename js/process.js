process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (chunk) {
  process.stdout.write('data: ' + chunk);
  if (chunk === 'bye') {
    process.stdin.emit('end');
  }
});
process.stdin.on('end', function () {
  process.stdout.write('end!!!');
});