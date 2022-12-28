const getMailLetterToResetPass = url => {
  const latter = `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Reset password</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>

<body style="">
  <div style="background-color: #f3f4f6; padding: 30px; position: relative; font-family: Rubik; color: black">
    <div style="padding: 40px; background-color: white; box-shadow: 0 0 8px 1px #e5e7eb; border-radius: 4px;">
      <h2>Reset password</h2>
      <p>If you have forgotten your login password and want to reset it, click the following link:</p>
      <br />
      <a style="background-color: #4ade80; padding: 12px 18px; border-radius: 4px; text-decoration: none; color: white;" href="${url}">Reset password</a>
      <p style="font-size:12px; margin-top:60px; color:#9ca3af">If you have not requested a password reset, you can ignore this email.</p>
    </div>
  </div>
</body>

</html>`;
  return latter;
};
module.exports = { getMailLetterToResetPass };
