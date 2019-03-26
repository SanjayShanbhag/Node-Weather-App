console.log("Starting App");

setTimeout(() => {
  console.log("The First Timeout");
}, 2000);

setTimeout(() => {
  console.log("Hello from the second timeout");
}, 0);

console.log("Finshing Up");
