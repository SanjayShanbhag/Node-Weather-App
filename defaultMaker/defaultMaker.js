const fs = require('fs');

var add = (address) => {
  var obj = {
    defaultAddress: address
  }
  fs.writeFileSync('defaultAddress.json', JSON.stringify(obj), (err) => {
    console.log(err);
  });
};

var get = () => {
  fileContent = fs.readFileSync('defaultAddress.json');
  if(fileContent.length > 0){
    fileContent = JSON.parse(fileContent);
    return fileContent;
  }
  return undefined;
};

module.exports = {
  add,
  get
};
