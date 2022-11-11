module.exports = {
  sleep: (t) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, t);
    });
  }
}