export const sendEmail = async (to, subject, message) => {
  console.log(`Email sent to ${to}: ${subject} - ${message}`);
  return true;
};
