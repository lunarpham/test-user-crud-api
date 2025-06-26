import { hashPassword } from "../utils/passwordHelper.js";

const firstNames = [
  "John",
  "Jane",
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Edward",
  "Fiona",
  "George",
  "Helen",
  "Ivan",
  "Julia",
  "Kevin",
  "Luna",
  "Michael",
  "Nina",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Taylor",
];

const domains = ["example.com", "test.org", "sample.net", "demo.co", "mock.io"];

const generateRandomUser = async (index) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];

  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@${domain}`;
  const age = Math.floor(Math.random() * 50) + 18; // Age between 18-67
  const password = await hashPassword("password123"); // Default password for all users

  return {
    name,
    email,
    password,
    age,
  };
};

export const generateUsers = async (count = 10) => {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const user = await generateRandomUser(i);
    users.push(user);
  }
  return users;
};
