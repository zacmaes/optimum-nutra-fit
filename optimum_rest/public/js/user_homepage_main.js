let user_data;

const nutritionData = [{
  type: "Breakfast",
  name: "Oatmeal with Berries",
  nutrition_facts: {
      calories: 300,
      total_fat: 6,
      saturated_fat: 1,
      trans_fat: 0,
      total_carbohydrates: 50,
      dietary_fiber: 8,
      sugars: 20,
      protein: 10,
      cholesterol: 20,
      sodium: 150
  }
},
{
  type: "Lunch",
  name: "Chicken Caesar Salad",
  nutrition_facts: {
      calories: 400,
      total_fat: 25,
      saturated_fat: 5,
      trans_fat: 0,
      total_carbohydrates: 20,
      dietary_fiber: 3,
      sugars: 5,
      protein: 30,
      cholesterol: 80,
      sodium: 250
  }
}
];

const nutritionTable = document.querySelector("#nutrition-data");

nutritionData.forEach(data => {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${data.type}</td>
      <td>${data.name}</td>
      <td>${data.nutrition_facts.calories}</td>
      <td>${data.nutrition_facts.total_fat}</td>
      <td>${data.nutrition_facts.saturated_fat}</td>
      <td>${data.nutrition_facts.trans_fat}</td>
      <td>${data.nutrition_facts.total_carbohydrates}</td>
      <td>${data.nutrition_facts.dietary_fiber}</td>
      <td>${data.nutrition_facts.sugars}</td>
      <td>${data.nutrition_facts.protein}</td>
      <td>${data.nutrition_facts.cholesterol}</td>
      <td>${data.nutrition_facts.sodium}</td>
  `;
  nutritionTable.appendChild(row);
});



const formEl = document.querySelector('.form');
    formEl.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(formEl);
      const data = Object.fromEntries(formData);
      
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        res.json()
      }).then((data) => {
        user_data = data
        console.log(user_data)
      }).then((res) => { 
        // this don't work
        window.location.replace("/home");
      }).catch(function (err) {
        console.info(err);
    });
    });
