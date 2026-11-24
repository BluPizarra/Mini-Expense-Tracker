const STORAGE_KEY = "mini-expense-tracker-expenses";

const DEFAULT_EXPENSES = [
  { id: 1, title: "Lunch Bowl", amount: 145.5, category: "Food" },
  { id: 2, title: "Jeepney Fare", amount: 26, category: "Transport" },
  { id: 3, title: "Notebook", amount: 85, category: "Other" }
];

function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return [...DEFAULT_EXPENSES];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [...DEFAULT_EXPENSES];
    }
    return parsed.filter(
      (item) =>
        item &&
        typeof item.title === "string" &&
        typeof item.amount === "number" &&
        Number.isFinite(item.amount) &&
        item.amount > 0 &&
        typeof item.category === "string"
    );
  } catch {
    return [...DEFAULT_EXPENSES];
  }
}

function saveExpenses(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota or privacy mode errors
  }
}

let expenses = loadExpenses();

const expenseForm = document.getElementById("expense-form");
const titleInput = document.getElementById("expense-title");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const categoryFilter = document.getElementById("category-filter");
const expenseList = document.getElementById("expense-list");
const totalAmountEl = document.getElementById("total-amount");
const errorMessageEl = document.getElementById("error-message");

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Sums the amount of all currently visible expenses
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

// Filters by selected category, renders the list, and updates the total
function renderExpenses() {
  const selectedCategory = categoryFilter.value;

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  if (filteredExpenses.length === 0) {
    expenseList.innerHTML = `<li class="empty-state">No expenses found for "${escapeHtml(selectedCategory)}".</li>`;
  } else {
    expenseList.innerHTML = filteredExpenses
      .map((expense) => {
        const { id, title, amount, category } = expense;
        return `
          <li class="expense-item">
            <div class="expense-info">
              <span class="expense-title">${escapeHtml(title)}</span>
              <span class="expense-category">${escapeHtml(category)}</span>
            </div>
            <div class="expense-actions">
              <span class="expense-amount">₱${amount.toFixed(2)}</span>
              <button class="btn-delete" type="button" data-id="${escapeHtml(String(id))}" aria-label="Delete ${escapeHtml(title)}">&times;</button>
            </div>
          </li>
        `;
      })
      .join("");
  }

  totalAmountEl.textContent = calculateTotal(filteredExpenses).toFixed(2);
}

const showError = (message) => {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.add("visible");
};

const clearError = () => {
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove("visible");
};

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Math.round(Number(amountInput.value) * 100) / 100;
  const category = categoryInput.value;

  if (title === "") {
    showError("Please enter an expense title.");
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    showError("Please enter an amount greater than 0.");
    return;
  }

  clearError();

  const newExpense = {
    id: generateId(),
    title,
    amount,
    category
  };

  expenses = [...expenses, newExpense];
  saveExpenses(expenses);

  expenseForm.reset();
  titleInput.focus();
  renderExpenses();
});

categoryFilter.addEventListener("change", () => {
  renderExpenses();
});

expenseList.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".btn-delete");
  if (deleteBtn === null) {
    return;
  }

  const targetId = deleteBtn.dataset.id;
  expenses = expenses.filter((expense) => String(expense.id) !== targetId);
  saveExpenses(expenses);
  renderExpenses();
});

renderExpenses();
