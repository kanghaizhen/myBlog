exports.state = function (req) {
  if (req.session && req.session.user) {
    return true;
  }else{
    return false;
  }
};