const transporter = require('../config/mailer');

// Controller for handling form submission and sending email
exports.sendEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email, // Sender's email
        to: process.env.EMAIL_USER, // Recipient email
        subject: `New Contact Us Submission: ${subject}`,
        text: `You have received a new message from your website contact form.\n\n
        Name: ${name}\n
        Email: ${email}\n
        Subject: ${subject}\n
        Message: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'success' }); // Send success response
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error' }); // Send error response
    }
};
