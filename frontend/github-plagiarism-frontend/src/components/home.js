import React, { useState } from "react";

const Home = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("/upload", {
        method: "POST",
        body: formData,
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleFileChange} type="file" required />
        <input type="submit" value="Submit" />
      </form>
      <div>{data}</div>
    </div>
  );
};

export default Home;
