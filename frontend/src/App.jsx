import { useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [dataSaved, setDataSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6969/sendEmail", {
        name,
        email,
        message,
      });
      if (response.status === 200 && response.statusText === "Ok") {
        setDataSaved(!dataSaved);
      }
    } catch (e) {
      console.log(e);
    }
  }

  

  return (
    <>
      {dataSaved ?alert (<p className="success">Email Sent</p>) : ""}

      <div className="form_data">
      <h2> Nodemailer App</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />{" "}
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <textarea
          name="message"
          value={message}
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
          required
        >
          {message}
        </textarea>
        <br />
        <button type="submit">Send Email</button>
      </form>
      </div>
    </>
  );
}

export default App;