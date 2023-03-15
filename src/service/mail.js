const nodemailer = require('nodemailer');
module.exports = (app)=>{
    app.post('/api/send_mail',(req,res)=>{
        try{
            const to = req.body.to;
            const transporter = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:465,
                secure:true,
                auth:{
                    user:'blablabla@gmail.com',
                    pass:'blablabla',
                },
                tls:{
                    rejectUnauthorized:false
                }
            });
            const mailOptions = {
                from:'blablabla@gmail.com',
                to:to,
                subject:'Thank you for your mail!',
                html:`
                    <h2>Hi 😊</h2>
                    </br>
                    <p>This is just a test. This website is still under development.</p>
                `,
            };
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log(error);
                }
                else{
                    const message = `Email sent: ${info.response}`;
                    console.log(message);
                }
            });
            return res.json({message:`Email sent to ${to}.`});
        }
        catch(err){
            return res.status(500).json({message:"Error"});
        }
    })
}