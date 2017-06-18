export default ajax = (method, data) => {
return new Promise ((resolve, reject) => {
	      fetch("http://localhost/index.php", {
              method: method,
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              },
              body: data
              }).then((data) => {return JSON.parse(data._bodyText)})
              .then((data) => {
              resolve(data);
              })
              .catch((error) => {
               reject(error);
               });
});
}