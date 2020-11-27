// Import stylesheets
import "./style.css";
const appDiv = document.getElementById("app");
const acctData = [
  {
    acctNum: "AAA - 1234",
    user: "Alice"
  },
  {
    acctNum: "AAA - 5231",
    user: "Bob"
  },
  {
    acctNum: "AAA - 9921",
    user: "Alice"
  },
  {
    acctNum: "AAA - 8191",
    user: "Alice"
  }
];

const balance = {
  "AAA - 1234": 4593.22,
  "AAA - 9921": 0,
  "AAA - 5231": 232142.5,
  "AAA - 8191": 4344
};

const sortOrder = {
  ASC: "asc",
  DESC: "desc"
};

const sort = {
  Account_Number: "acctNum",
  BALANCE: "balance"
};

const getAccountNumbers = data => {
  return Array.isArray(data)
    ? data.map(item => item.acctNum)
    : Object.keys(data);
};

const getUserAccounts = (array, user) => {
  return array.filter(item => item.user === user);
};

const getSortedAccountData = (accountData, sortDirection) => {
  return accountData.sort((a, b) =>
    sortDirection === sortOrder.DESC
      ? b.acctNum.localeCompare(a.acctNum)
      : a.acctNum.localeCompare(b.acctNum)
  );
};

const getSortedBalanceData = (balanceData, sortDirection) => {
  return Object.entries(balanceData)
    .sort(([, a], [, b]) => (sortDirection === sortOrder.DESC ? b - a : a - b))
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
};

const getAccountNumbersBasedOnCriteria = ({
  acctData,
  balance,
  user,
  sortBy,
  sortDirection
}) => {
  try {
    let result = [];
    if (user) {
      result = getAccountNumbers(getUserAccounts(acctData, user));
    }

    if (
      sortBy === sort.BALANCE &&
      Object.keys(balance).length > 0 &&
      sortDirection
    ) {
      result = getAccountNumbers(getSortedBalanceData(balance, sortDirection));
    }

    if (
      sortBy === sort.Account_Number &&
      acctData.length > 0 &&
      sortDirection
    ) {
      result = getAccountNumbers(getSortedAccountData(acctData, sortDirection));
    }
    return result;
  } catch (err) {
    throw "Error: " + err;
  }
};

// Test cases
//  const accountDetails = {acctData, balance: null, user: 'Bob', sortBy: '', sortDirection: sortOrder.ASC};
// const accountDetails = {acctData, balance: null, user: 'Charlie', sortBy: '', sortDirection: sortOrder.ASC};
//  const accountDetails = {acctData, balance: null, user: 'Alice', sortBy: '', sortDirection: sortOrder.ASC};
const accountDetails = {acctData, balance: null, user: '', sortBy: 'acctNum', sortDirection: sortOrder.ASC};

const result = getAccountNumbersBasedOnCriteria(accountDetails);
appDiv.innerHTML = `Result accounts: ${result.join(", ")}`;
