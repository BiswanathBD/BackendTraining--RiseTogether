export const otpEmailTemplate = (otp: string, otpExpire: number): string => {
  const expireMinutes = Math.round(otpExpire / 60);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>OTP Verification</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    border: 1px;

  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width: 100%;
            max-width: 600px;
            border-radius: 24px;
            border: 1px solid #94a3b820;
            overflow: hidden;
            box-shadow: 0 12px 40px rgba(30, 41, 59, 0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                padding: 42px 30px 38px;
                background: linear-gradient(
                  135deg,
                  #6366f1 0%,
                  #7c3aed 55%,
                  #db2777 100%
                );
              "
            >
              <div
                style="
                  width: 64px;
                  height: 64px;
                  line-height: 64px;
                  margin: 0 auto 22px;
                  border-radius: 50%;
                  background-color: rgba(255,255,255,0.18);
                  color: #ffffff;
                  font-size: 28px;
                "
              >
                🔐
              </div>

              <h1
                style="
                  margin: 0 0 10px;
                  color: #ffffff;
                  font-size: 28px;
                  line-height: 1.3;
                  font-weight: 700;
                "
              >
                Verify Your Email
              </h1>

              <p
                style="
                  margin: 0;
                  color: rgba(255,255,255,0.88);
                  font-size: 15px;
                  line-height: 1.6;
                "
              >
                Enter the code below to continue securely.
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 36px 35px;">

              <p
                style="
                  margin: 0 0 10px;
                  color: #111827;
                  font-size: 16px;
                  font-weight: 600;
                "
              >
                Hello there 👋
              </p>

              <p
                style="
                  margin: 0;
                  color: #64748b;
                  font-size: 15px;
                  line-height: 1.8;
                "
              >
                We received a request to verify your email address.
                Use the one-time verification code below to complete
                your request.
              </p>

              <!-- OTP -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin: 30px 0;"
              >
                <tr>
                  <td align="center">

                    <div
                      style="
                        padding: 22px 28px;
                        background-color: #f5f3ff;
                        border: 1px solid #ddd6fe;
                        border-radius: 16px;
                        text-align: center;
                      "
                    >
                      <p
                        style="
                          margin: 0 0 10px;
                          color: #8b5cf6;
                          font-size: 11px;
                          font-weight: 700;
                          letter-spacing: 2px;
                          text-transform: uppercase;
                        "
                      >
                        Verification Code
                      </p>

                      <div
                        style="
                          color: #5b21b6;
                          font-size: 34px;
                          line-height: 1.3;
                          font-weight: 700;
                          letter-spacing: 9px;
                        "
                      >
                        ${otp}
                      </div>
                    </div>

                  </td>
                </tr>
              </table>

              <!-- Expiry -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #fff7ed;
                  border: 1px solid #fed7aa;
                  border-radius: 12px;
                "
              >
                <tr>
                  <td style="padding: 16px 18px;">

                    <table
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>

                        <td
                          valign="middle"
                          style="
                            font-size: 20px;
                            padding-right: 12px;
                          "
                        >
                          ⏱️
                        </td>

                        <td
                          valign="middle"
                          style="
                            color: #9a3412;
                            font-size: 14px;
                            line-height: 1.5;
                          "
                        >
                          <strong>
                            This code expires in ${expireMinutes} minute${expireMinutes > 1 ? "s" : ""}.
                          </strong>
                          <br />
                          Please use it before it expires.
                        </td>

                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Security Notice -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  margin-top: 22px;
                  background-color: #f8fafc;
                  border-radius: 12px;
                "
              >
                <tr>
                  <td
                    style="
                      padding: 16px 18px;
                      color: #64748b;
                      font-size: 13px;
                      line-height: 1.7;
                    "
                  >
                    <strong style="color: #334155;">
                      🔒 Security notice
                    </strong>
                    <br />
                    Never share this verification code with anyone.
                    Our team will never ask you for your OTP.
                  </td>
                </tr>
              </table>

              <p
                style="
                  margin: 25px 0 0;
                  color: #94a3b8;
                  font-size: 12px;
                  line-height: 1.7;
                  text-align: center;
                "
              >
                If you didn't request this code, you can safely
                ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 24px 30px;
                background-color: #f8fafc;
                border-top: 1px solid #eef2f7;
              "
            >
              <p
                style="
                  margin: 0 0 7px;
                  color: #475569;
                  font-size: 13px;
                  font-weight: 600;
                "
              >
                Biswanath Sarker
              </p>

              <p
                style="
                  margin: 0;
                  color: #94a3b8;
                  font-size: 11px;
                "
              >
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
