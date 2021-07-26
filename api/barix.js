module.exports.barimon = function (req, res) {
  console.log("ok")
  return res.status(200).json(req.query)
}