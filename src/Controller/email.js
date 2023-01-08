import expressAsyncHandler from "express-async-handler";
import Mailer from '../helpers/mailer'
const sendEmail = expressAsyncHandler(async (req, res) => {
    try {
        const { email, name, message, subject } = req.body
        if (!email || !name || !message || !subject) {
            return res.send('Fill data properly')
        }

        const mailer = new Mailer()
              let contactMail = await mailer.sendContactEmail(
                email,
                subject,
                message,
                name
              );
        await mailer.sendMailSync(customerEmail);
        res.send('success')
    } catch (error) {
        res.send(error.message)
    }
})


export {
    sendEmail
}