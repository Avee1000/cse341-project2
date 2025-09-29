const Util = {};


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
// function handleErrors(fn) {
//   return function (req, res, next) {
//     // Make sure fn always runs inside a Promise
//     Promise.resolve(fn(req, res, next))
//       .catch(err => {
//         // If fn throws an error or rejects,
//         // send the error to Express's error handler
//         next(err);
//       });
//   };
// }
module.exports = Util;