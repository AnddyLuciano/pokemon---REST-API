module.exports = (app)=>{
    app.use((req,res,next)=>{
        const message = 'Page not found';
        res.status(404).json({message});
        next();
    });
}