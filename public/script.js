// helpful link for converting image to base64: https://elmah.io/tools/base64-image-encoder/
async function apiFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const getData = async () => {
  const data = await apiFetch('api/contacts');
  console.log(data);
  displayAllData(data);
};

function displayAllData(data) {
  data.forEach((d) => {
    const newSection = document.createElement('section');
    newSection.innerHTML = `
      <h2>${d.firstName + " " + d.lastName}</h2>
      <p>${d.email}</p>
      <p>${new Date(d.birthday).toLocaleDateString()}</p>
      <p>${d.favoriteColor}</p>
      <hr>
    `;
    document.body.appendChild(newSection);
  })

}


getData();
