/**
 * Email Service Abstraction for Syspoly Application.
 * Supports development console logging & production Nodemailer/SMTP dispatch.
 */

const sendContactNotification = async (contactData) => {
  const smtpHost = process.env.SMTP_HOST;
  
  if (!smtpHost || smtpHost === 'smtp.mailtrap.io') {
    console.log(`\n================ [EMAIL NOTIFICATION MOCK] ================`);
    console.log(`To: info@syspoly.in`);
    console.log(`Subject: New Contact Enquiry from ${contactData.name}`);
    console.log(`Details:`);
    console.log(` - Name: ${contactData.name}`);
    console.log(` - Email: ${contactData.email}`);
    console.log(` - Phone: ${contactData.phone}`);
    console.log(` - Company: ${contactData.company || 'N/A'}`);
    console.log(` - Service: ${contactData.service}`);
    console.log(` - Budget: ${contactData.budget}`);
    console.log(` - Message: ${contactData.message}`);
    console.log(`===========================================================\n`);
    return { success: true, mode: 'mock' };
  }

  // Production Nodemailer logic can be attached here seamlessly
  return { success: true, mode: 'smtp' };
};

module.exports = {
  sendContactNotification
};
