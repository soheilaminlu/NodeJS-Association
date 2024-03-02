const notFoundError = (req , res , next) => {
res.status(404).json({message:"Not Found Error"})
}

module.exports = {
    notFoundError
}