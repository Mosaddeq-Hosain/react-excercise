"use client";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long")
});
export default function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState<FormEntry[]>([]);

  type FormEntry = {
    name: String;
    email: String;
    message: String;
  };
  const formData = { name, email, message };
  const validationResult = schema.safeParse(formData);

  if (!validationResult.success) {
    console.log("Validation Error:", validationResult.error.format());
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "message": message
      })
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <div>
        <form action="">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="message">Message:</label>
          <input type="text" id="message" onChange={(e) => setMessage(e.target.value)} />

          <button type="submit" onClick={
            (e) => {
              e.preventDefault();
              setList([...list, { name, email, message }]);
              handleSubmit();
            }
          }>Submit</button>
        </form>
      </div>

      <div>
        <h2>Show Entries</h2>
        {list.map((entry, index) => (
          <li key={index}>{entry.name} || {entry.email} || {entry.message}</li>
        ))}
      </div>
    </div>
  );
}