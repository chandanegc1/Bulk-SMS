import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ConfirmationDialog from "../components/DialogBox";

const EmailTemplate = () => {
  const [subject, setSubject] = useState(
    "Welcome {name}, Join {company} as a {position} starting on {startDate}"
  );
  const [emailContent, setEmailContent] = useState(
    `Hello <b>{name}</b>,<br/><br/>
    Welcome to <b>{company}</b> as a <b>{position}</b>. Your email is <b>{email}</b>, and your joining date is <b>{startDate}</b>.<br/><br/>
    We look forward to working with you!<br/><br/>
    <b>Here are the additional details:</b><br/>
    Var1: <b>{var1}</b><br/>
    Var2: <b>{var2}</b><br/>
    Var3: <b>{var3}</b><br/>
    Var4: <b>{var4}</b><br/>
    Var5: <b>{var5}</b><br/>
    Var6: <b>{var6}</b><br/>
    Var7: <b>{var7}</b><br/>
    Var8: <b>{var8}</b><br/>
    Var9: <b>{var9}</b><br/>
    Var10: <b>{var10}</b><br/><br/>
    Thanks!`
  );

  const [finalMessageArray, setFinalMessageArray] = useState([]);
  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    if (data && data.length > 0) {
      const messages = data.map((user) => {
        let content = emailContent;
        let subjectLine = subject;

        Object.keys(user).forEach((key) => {
          content = content.replaceAll(`{${key}}`, user[key]);
          subjectLine = subjectLine.replaceAll(`{${key}}`, user[key]);
        });

        return {
          name: user.name,
          email: user.email,
          subject: subjectLine,
          msg: content,
          company: user.company,
          position: user.position,
          startDate: user.startDate,
          var1: user.var1,
          var2: user.var2,
          var3: user.var3,
          var4: user.var4,
          var5: user.var5,
          var6: user.var6,
          var7: user.var7,
          var8: user.var8,
          var9: user.var9,
          var10: user.var10,
        };
      });
      setFinalMessageArray(messages);
    }
  }, [data, emailContent, subject]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const confirmationData = {
    title: "Send Bulk-Emails",
    message: "Are you sure you want to send bulk emails?",
  };

  const handleSendEmail = async () => {
    setIsLoader(true);
    try {
      const res = await axios.post("/api/v1/mail/send-bulk-email", {
        emailData: finalMessageArray,
        senderEmail: JSON.parse(localStorage.getItem("credential")).email,
      });
      setIsLoader(false);
      setIsDialogOpen(false);
      alert(res.data.msg);
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Final Message Array:", finalMessageArray);
    setIsDialogOpen(true);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  return (
    <form className="form" style={{ maxWidth: "90vw" }} onSubmit={handleSubmit}>
      <h2>Customize Email Template</h2>
      <br />
      <ConfirmationDialog
        open={isDialogOpen}
        close={isDialogOpen}
        confirmationData={confirmationData}
        isLoader={isLoader}
        setIsDialogOpen={setIsDialogOpen}
        handleSendEmail={handleSendEmail}
      />

      <Input
        type="text"
        name="subject"
        labelText={"Email Subject:"}
        value={subject}
        onChange={handleSubjectChange}
      />
      <label>Email Content:</label>
      <br />
      <textarea
        className="form-textarea"
        rows="10"
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
      />
      <br />
      <h3>Preview for Each User:</h3>
      <br />
      {finalMessageArray.length > 0 ? (
        <div
          className="form-textarea"
          style={{ maxWidth: "90vw", whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{ __html: finalMessageArray[0].msg }}
        ></div>
      ) : (
        <p>No messages generated yet!</p>
      )}
      <br />
      <button type="submit" className="btn btn-block form-btn">
        Next
      </button>
    </form>
  );
};

export default EmailTemplate;
