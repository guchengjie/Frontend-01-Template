const npm = require('npm');

npm.load(config, (err) => {
  npm.install('webpack', (err) => {
    console.log(err);
  })
})
