const getData = async () => {
  const response = await fetch("http://localhost:3000/api/notes");

  console.log(await response.json());
};

getData();
