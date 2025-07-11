import nodemailer from "nodemailer";

const sendInternalNotification = async (formData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const {
      fullName,
      dateOfBirth,
      gender,
      nationality,
      currentCountry,
      phone,
      email,
      position,
      qualification,
      yearOfGraduation,
      councilRegistered,
      docsReady,
      passportStatus,
      italianKnowledge,
      languageMode,
      availabilityDate,
      notes,
      submittedIp,
      submittedCountry,
    } = formData;

    const mailOptions = {
      from: '"Maitri Global Notification" <no-reply@maitriglobal.com>',
      to: "hr@maitriglobaleducation.com", 
      subject: "New Lead for Nurse in Italy Submitted",
      html: `
        <h3>You have received a new application:</h3>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>DOB:</strong> ${dateOfBirth}</li>
          <li><strong>Gender:</strong> ${gender}</li>
          <li><strong>Nationality:</strong> ${nationality}</li>
          <li><strong>Current Country:</strong> ${currentCountry}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Position:</strong> ${position}</li>
          <li><strong>Qualification:</strong> ${qualification}</li>
          <li><strong>Year of Graduation:</strong> ${yearOfGraduation}</li>
          <li><strong>Council Registered:</strong> ${councilRegistered}</li>
          <li><strong>Documents Ready:</strong> ${docsReady}</li>
          <li><strong>Passport Status:</strong> ${passportStatus}</li>
          <li><strong>Italian Knowledge:</strong> ${italianKnowledge}</li>
          <li><strong>Language Mode:</strong> ${languageMode}</li>
          <li><strong>Availability Date:</strong> ${availabilityDate}</li>
          <li><strong>Notes:</strong> ${notes || "N/A"}</li>
          <li><strong>Submitted IP:</strong> ${submittedIp}</li>
          <li><strong>Submitted Country:</strong> ${submittedCountry}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Internal notification sent to hr@maitri`);
  } catch (err) {
    console.error("Internal email sending error:", err.message);
  }
};

export default sendInternalNotification;
