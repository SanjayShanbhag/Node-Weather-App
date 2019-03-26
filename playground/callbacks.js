var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Sanjay'
  };

  setTimeout(() => {
    callback(user);
  }, 2000);
};

getUser(31, (user) => {
  console.log(user);
});
