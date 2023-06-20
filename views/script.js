const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const amountDetail = document.getElementById("text");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

function getExpenses() {
  axios.get("http://localhost:3000/api/expense").then((res) => {
    console.log("response from get API", res);
    updateValues(res.data);
  });
}

function addTransaction() {
  if (amountDetail.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      amountDetail: amountDetail.value,
      amount: amount.value,
      category: category.value,
    };
    axios
      .post("http://localhost:3000/api/expense", transaction)
      .then((res) => {
        console.log("This is the response", res.data);
        addTransactionDOM(res.data);
      })
      .catch((err) => console.log(err));

    text.value = "";
    amount.value = "";
  }
}

// Add transactions to DOM list
function addTransactionDOM(data) {
  console.log("transactionnnnnnn", data);

  const sign = data.category == "expense" ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(data.category == "expense" ? "minus" : "plus");

  item.innerHTML = `
    ${data.amountDetail} <span>${sign}${Math.abs(
    data.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    data.id
  })">x</button>
  `;
  list.appendChild(item);
}

function updateValues(transactions) {
  console.log("transactions wow ", transactions);
  // const amounts = transactions.map((transaction) => transaction.amount);

  const incomes = transactions.map((item) => {
    if (item.category == "income") {
      item = item.amount;
      return item;
    }
  });

  const totalincome = incomes
    .filter((item) => item != undefined)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expenses = transactions.map((item) => {
    if (item.category == "expense") {
      item = item.amount;
      return item;
    }
  });

  const totalExpense = (
    expenses
      .filter((item) => item != undefined)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);
  const totalBalance = totalincome * 1 + totalExpense * 1;

  balance.innerText = `$${totalBalance}`;
  money_plus.innerText = `$${totalincome}`;
  money_minus.innerText = `$${totalExpense}`;

  for (let i = 0; i < transactions.length; i++) {
    const sign = transactions[i].category == "expense" ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(
      transactions[i].category == "expense" ? "minus" : "plus"
    );

    item.innerHTML = `
    ${transactions[i].amountDetail} <span>${sign}${Math.abs(
      transactions[i].amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
      transactions[i].id
    })">x</button>
  `;
    list.appendChild(item);
  }
}

// Remove transaction by ID
function removeTransaction(id) {
  axios
    .delete(`http://localhost:3000/api/expense/${id}`)
    .then((res) => {
      console.log("deleted response", res);
      document.getElementById(id).remove();
    });

  // transactions = transactions.filter((transaction) => transaction.id !== id);
}

// form.addEventListener("submit", addTransaction);
