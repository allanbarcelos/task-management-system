using System.Net;
using System.Net.Mail;

namespace API.Helpers
{
    public class EmailService
    {
        private readonly string smtpServer = "smtp.gmail.com";
        private readonly int smtpPort = 587;
        private readonly string senderEmail = "dhruvmalan2005@gmail.com";
        private readonly string senderPassword = "chfo qunv fces ppps"; 

        public void SendEmail(string toEmail, string subject, string body)
        {
            using (var client = new SmtpClient(smtpServer, smtpPort))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(senderEmail, senderPassword);
                client.EnableSsl = true;

                var mailMessage = new MailMessage(senderEmail, toEmail, subject, body);
                client.Send(mailMessage);
            }
        }
    }
}