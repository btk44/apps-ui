import { type Account, AccountType } from './account';
import { type Category, CategoryType } from './category';
import type { Currency } from './currency';
import { Direction, type Transaction } from './transaction';

export const currencies: Currency[] = [
    { id: 1, code: 'USD', name: 'US Dollar', active: true, decimals: 2, symbol: '$' },
    { id: 2, code: 'EUR', name: 'Euro', active: true, decimals: 2, symbol: '€' },
    { id: 3, code: 'GBP', name: 'British Pound Sterling', active: true, decimals: 2, symbol: '£' },
    { id: 4, code: 'JPY', name: 'Japanese Yen', active: true, decimals: 0, symbol: '¥' },
    { id: 5, code: 'CAD', name: 'Canadian Dollar', active: true, decimals: 2, symbol: 'C$' },
    { id: 6, code: 'AUD', name: 'Australian Dollar', active: true, decimals: 2, symbol: 'A$' },
    { id: 7, code: 'CHF', name: 'Swiss Franc', active: true, decimals: 2, symbol: 'CHF' },
    { id: 8, code: 'CNY', name: 'Chinese Yuan', active: true, decimals: 2, symbol: '¥' },
    { id: 9, code: 'INR', name: 'Indian Rupee', active: true, decimals: 2, symbol: '₹' },
    { id: 10, code: 'SEK', name: 'Swedish Krona', active: true, decimals: 2, symbol: 'kr' },
    { id: 11, code: 'NOK', name: 'Norwegian Krone', active: true, decimals: 2, symbol: 'kr' },
    { id: 12, code: 'DKK', name: 'Danish Krone', active: true, decimals: 2, symbol: 'kr' },
    { id: 13, code: 'NZD', name: 'New Zealand Dollar', active: true, decimals: 2, symbol: 'NZ$' },
    { id: 14, code: 'SGD', name: 'Singapore Dollar', active: true, decimals: 2, symbol: 'S$' },
    { id: 15, code: 'HKD', name: 'Hong Kong Dollar', active: true, decimals: 2, symbol: 'HK$' }
];

export const accounts: Account[] = [
    { userId: 1, id: 1, name: 'Main Checking', code: 'CHK-001', type: AccountType.Bank, currencyId: 1, active: true, version: 1 },
    { userId: 1, id: 2, name: 'Travel Wallet', code: 'TRV-002', type: AccountType.Cash, currencyId: 2, active: true, version: 1 },
    { userId: 1, id: 3, name: 'Savings Vault', code: 'SAV-003', type: AccountType.Savings, currencyId: 1, active: true, version: 1 },
    { userId: 1, id: 4, name: 'Credit Card', code: 'CRD-004', type: AccountType.Credit, currencyId: 1, active: true, version: 1 },
    { userId: 1, id: 5, name: 'Euro Account', code: 'EUR-005', type: AccountType.Bank, currencyId: 2, active: true, version: 1 },
    { userId: 1, id: 6, name: 'Pound Reserve', code: 'GBP-006', type: AccountType.Bank, currencyId: 3, active: true, version: 1 },
    { userId: 1, id: 7, name: 'Emergency Cash', code: 'CASH-007', type: AccountType.Cash, currencyId: 1, active: true, version: 1 },
    { userId: 1, id: 8, name: 'Investment Fund', code: 'INV-008', type: AccountType.Savings, currencyId: 4, active: true, version: 1 },
    { userId: 1, id: 9, name: 'Business Checking', code: 'BIZ-009', type: AccountType.Bank, currencyId: 1, active: true, version: 1 },
    { userId: 1, id: 10, name: 'Family Wallet', code: 'FAM-010', type: AccountType.Cash, currencyId: 2, active: true, version: 1 }
];

export const categories: Category[] = [
    { userId: 1, id: 1, name: 'Housing', code: 'HOUSING', active: true, type: CategoryType.Expense, version: 1 },
    { userId: 1, id: 2, name: 'Groceries', code: 'GROCERIES', active: true, type: CategoryType.Expense, version: 1 },
    { userId: 1, id: 3, name: 'Transportation', code: 'TRANSPORT', active: true, type: CategoryType.Expense, version: 1 },
    { userId: 1, id: 4, name: 'Dining', code: 'DINING', active: true, type: CategoryType.Expense, version: 1 },
    { userId: 1, id: 5, name: 'Utilities', code: 'UTILITIES', active: true, type: CategoryType.Expense, version: 1 },
    { userId: 1, id: 6, name: 'Salary', code: 'SALARY', active: true, type: CategoryType.Income, version: 1 },
    { userId: 1, id: 7, name: 'Freelance', code: 'FREELANCE', active: true, type: CategoryType.Income, version: 1 },
    { userId: 1, id: 8, name: 'Health', code: 'HEALTH', active: true, type: CategoryType.Expense, version: 1 },
    { userId: 1, id: 9, name: 'Travel', code: 'TRAVEL', active: true, type: CategoryType.Expense, version: 1 },
    { userId: 1, id: 10, name: 'Shopping', code: 'SHOPPING', active: true, type: CategoryType.Expense, version: 1 },
    { userId: 1, id: 11, name: 'Transfer', code: 'TRANSFER', active: true, type: CategoryType.Both, version: 1 }
];

function makeDate(month: number, day: number, hour: number, minute: number): Date {
    return new Date(2025, month - 1, day, hour, minute, 0, 0);
}

export const transactions: Transaction[] = [
    { id: 1, userId: 1, amount: 3200, direction: Direction.Debit, accountId: 1, categoryId: 1, date: makeDate(1, 4, 9, 15), comment: 'Apartment rent', active: true, transferId: null, version: 1 },
    { id: 2, userId: 1, amount: 3600, direction: Direction.Credit, accountId: 1, categoryId: 6, date: makeDate(1, 5, 9, 0), comment: 'Monthly salary', active: true, transferId: null, version: 1 },
    { id: 3, userId: 1, amount: 210.45, direction: Direction.Debit, accountId: 1, categoryId: 2, date: makeDate(1, 7, 18, 30), comment: 'Fresh groceries', active: true, transferId: null, version: 1 },
    { id: 4, userId: 1, amount: 44.8, direction: Direction.Debit, accountId: 4, categoryId: 4, date: makeDate(1, 8, 20, 10), comment: 'Dinner with friends', active: true, transferId: null, version: 1 },
    { id: 5, userId: 1, amount: 125.2, direction: Direction.Debit, accountId: 9, categoryId: 3, date: makeDate(1, 10, 7, 45), comment: 'Fuel and train pass', active: true, transferId: null, version: 1 },
    { id: 6, userId: 1, amount: 980, direction: Direction.Debit, accountId: 3, categoryId: 5, date: makeDate(1, 12, 14, 20), comment: 'Electricity and internet', active: true, transferId: null, version: 1 },
    { id: 7, userId: 1, amount: 420, direction: Direction.Credit, accountId: 8, categoryId: 7, date: makeDate(1, 14, 11, 20), comment: 'Freelance design project', active: true, transferId: null, version: 1 },
    { id: 8, userId: 1, amount: 76.3, direction: Direction.Debit, accountId: 2, categoryId: 10, date: makeDate(1, 16, 16, 5), comment: 'Office supplies', active: true, transferId: null, version: 1 },
    { id: 9, userId: 1, amount: 139, direction: Direction.Debit, accountId: 10, categoryId: 8, date: makeDate(1, 18, 12, 40), comment: 'Pharmacy visit', active: true, transferId: null, version: 1 },
    { id: 10, userId: 1, amount: 280, direction: Direction.Debit, accountId: 5, categoryId: 9, date: makeDate(1, 21, 10, 10), comment: 'Weekend trip to Paris', active: true, transferId: null, version: 1 },
    { id: 11, userId: 1, amount: 640.5, direction: Direction.Debit, accountId: 1, categoryId: 2, date: makeDate(2, 2, 17, 45), comment: 'Supermarket refill', active: true, transferId: null, version: 1 },
    { id: 12, userId: 1, amount: 3600, direction: Direction.Credit, accountId: 1, categoryId: 6, date: makeDate(2, 5, 9, 10), comment: 'Salary deposit', active: true, transferId: null, version: 1 },
    { id: 13, userId: 1, amount: 58.2, direction: Direction.Debit, accountId: 4, categoryId: 4, date: makeDate(2, 7, 19, 20), comment: 'Coffee and lunch', active: true, transferId: null, version: 1 },
    { id: 14, userId: 1, amount: 96.6, direction: Direction.Debit, accountId: 9, categoryId: 3, date: makeDate(2, 9, 8, 15), comment: 'Metro and taxi', active: true, transferId: null, version: 1 },
    { id: 15, userId: 1, amount: 120, direction: Direction.Debit, accountId: 3, categoryId: 5, date: makeDate(2, 11, 11, 0), comment: 'Water bill', active: true, transferId: null, version: 1 },
    { id: 16, userId: 1, amount: 540, direction: Direction.Credit, accountId: 8, categoryId: 7, date: makeDate(2, 12, 12, 30), comment: 'Consulting invoice', active: true, transferId: null, version: 1 },
    { id: 17, userId: 1, amount: 84.75, direction: Direction.Debit, accountId: 2, categoryId: 10, date: makeDate(2, 13, 15, 35), comment: 'Books and accessories', active: true, transferId: null, version: 1 },
    { id: 18, userId: 1, amount: 150, direction: Direction.Debit, accountId: 10, categoryId: 8, date: makeDate(2, 15, 13, 0), comment: 'Dental checkup', active: true, transferId: null, version: 1 },
    { id: 19, userId: 1, amount: 330, direction: Direction.Debit, accountId: 5, categoryId: 9, date: makeDate(2, 18, 9, 50), comment: 'City break hotel', active: true, transferId: null, version: 1 },
    { id: 20, userId: 1, amount: 2100, direction: Direction.Debit, accountId: 1, categoryId: 1, date: makeDate(2, 20, 10, 15), comment: 'Apartment rent', active: true, transferId: null, version: 1 },
    { id: 21, userId: 1, amount: 590.8, direction: Direction.Debit, accountId: 1, categoryId: 2, date: makeDate(3, 1, 18, 25), comment: 'Weekly supermarket run', active: true, transferId: null, version: 1 },
    { id: 22, userId: 1, amount: 3600, direction: Direction.Credit, accountId: 1, categoryId: 6, date: makeDate(3, 5, 9, 0), comment: 'Payroll', active: true, transferId: null, version: 1 },
    { id: 23, userId: 1, amount: 73.9, direction: Direction.Debit, accountId: 4, categoryId: 4, date: makeDate(3, 7, 20, 5), comment: 'Takeout and drinks', active: true, transferId: null, version: 1 },
    { id: 24, userId: 1, amount: 134.4, direction: Direction.Debit, accountId: 9, categoryId: 3, date: makeDate(3, 9, 7, 30), comment: 'Fuel + parking', active: true, transferId: null, version: 1 },
    { id: 25, userId: 1, amount: 110, direction: Direction.Debit, accountId: 3, categoryId: 5, date: makeDate(3, 12, 11, 50), comment: 'Gas bill', active: true, transferId: null, version: 1 },
    { id: 26, userId: 1, amount: 690, direction: Direction.Credit, accountId: 8, categoryId: 7, date: makeDate(3, 15, 13, 15), comment: 'Landing page project', active: true, transferId: null, version: 1 },
    { id: 27, userId: 1, amount: 142.5, direction: Direction.Debit, accountId: 2, categoryId: 10, date: makeDate(3, 18, 17, 10), comment: 'Home improvement items', active: true, transferId: null, version: 1 },
    { id: 28, userId: 1, amount: 90, direction: Direction.Debit, accountId: 10, categoryId: 8, date: makeDate(3, 20, 14, 0), comment: 'Optician appointment', active: true, transferId: null, version: 1 },
    { id: 29, userId: 1, amount: 480, direction: Direction.Debit, accountId: 5, categoryId: 9, date: makeDate(3, 22, 8, 25), comment: 'Train tickets to Berlin', active: true, transferId: null, version: 1 },
    { id: 30, userId: 1, amount: 3200, direction: Direction.Debit, accountId: 1, categoryId: 1, date: makeDate(3, 25, 9, 5), comment: 'Rental payment', active: true, transferId: null, version: 1 },
    { id: 31, userId: 1, amount: 480.2, direction: Direction.Debit, accountId: 1, categoryId: 2, date: makeDate(4, 2, 16, 40), comment: 'Fresh produce and pantry', active: true, transferId: null, version: 1 },
    { id: 32, userId: 1, amount: 3600, direction: Direction.Credit, accountId: 1, categoryId: 6, date: makeDate(4, 5, 9, 5), comment: 'Monthly salary', active: true, transferId: null, version: 1 },
    { id: 33, userId: 1, amount: 62.4, direction: Direction.Debit, accountId: 4, categoryId: 4, date: makeDate(4, 6, 19, 45), comment: 'Casual restaurant', active: true, transferId: null, version: 1 },
    { id: 34, userId: 1, amount: 156.1, direction: Direction.Debit, accountId: 9, categoryId: 3, date: makeDate(4, 8, 8, 20), comment: 'Road trip expenses', active: true, transferId: null, version: 1 },
    { id: 35, userId: 1, amount: 118.9, direction: Direction.Debit, accountId: 3, categoryId: 5, date: makeDate(4, 12, 12, 5), comment: 'Internet and phone bundle', active: true, transferId: null, version: 1 },
    { id: 36, userId: 1, amount: 740, direction: Direction.Credit, accountId: 8, categoryId: 7, date: makeDate(4, 14, 10, 35), comment: 'Brand mockup sale', active: true, transferId: null, version: 1 },
    { id: 37, userId: 1, amount: 88.55, direction: Direction.Debit, accountId: 2, categoryId: 10, date: makeDate(4, 15, 18, 25), comment: 'Gift shopping', active: true, transferId: null, version: 1 },
    { id: 38, userId: 1, amount: 210, direction: Direction.Debit, accountId: 10, categoryId: 8, date: makeDate(4, 17, 13, 10), comment: 'Blood test and vitamins', active: true, transferId: null, version: 1 },
    { id: 39, userId: 1, amount: 520, direction: Direction.Debit, accountId: 5, categoryId: 9, date: makeDate(4, 21, 11, 15), comment: 'Weekend city escape', active: true, transferId: null, version: 1 },
    { id: 40, userId: 1, amount: 2100, direction: Direction.Debit, accountId: 1, categoryId: 1, date: makeDate(4, 25, 9, 20), comment: 'Apartment rent', active: true, transferId: null, version: 1 },
    { id: 41, userId: 1, amount: 670.4, direction: Direction.Debit, accountId: 1, categoryId: 2, date: makeDate(5, 2, 17, 50), comment: 'Grocery restock', active: true, transferId: null, version: 1 },
    { id: 42, userId: 1, amount: 3600, direction: Direction.Credit, accountId: 1, categoryId: 6, date: makeDate(5, 5, 9, 5), comment: 'Paycheck', active: true, transferId: null, version: 1 },
    { id: 43, userId: 1, amount: 91.7, direction: Direction.Debit, accountId: 4, categoryId: 4, date: makeDate(5, 9, 20, 55), comment: 'Lunch meeting', active: true, transferId: null, version: 1 },
    { id: 44, userId: 1, amount: 214.2, direction: Direction.Debit, accountId: 9, categoryId: 3, date: makeDate(5, 10, 6, 45), comment: 'Plane ticket and parking', active: true, transferId: null, version: 1 },
    { id: 45, userId: 1, amount: 129.4, direction: Direction.Debit, accountId: 3, categoryId: 5, date: makeDate(5, 14, 9, 30), comment: 'Energy usage', active: true, transferId: null, version: 1 },
    { id: 46, userId: 1, amount: 830, direction: Direction.Credit, accountId: 8, categoryId: 7, date: makeDate(5, 19, 15, 5), comment: 'Web app maintenance', active: true, transferId: null, version: 1 },
    { id: 47, userId: 1, amount: 116.2, direction: Direction.Debit, accountId: 2, categoryId: 10, date: makeDate(5, 21, 16, 20), comment: 'New headphones', active: true, transferId: null, version: 1 },
    { id: 48, userId: 1, amount: 130, direction: Direction.Debit, accountId: 10, categoryId: 8, date: makeDate(5, 23, 10, 40), comment: 'Routine checkup', active: true, transferId: null, version: 1 },
    { id: 49, userId: 1, amount: 610, direction: Direction.Debit, accountId: 5, categoryId: 9, date: makeDate(5, 27, 14, 0), comment: 'Train + accommodation', active: true, transferId: null, version: 1 },
    { id: 50, userId: 1, amount: 3275, direction: Direction.Debit, accountId: 1, categoryId: 1, date: makeDate(5, 30, 8, 55), comment: 'Rent and service fee', active: true, transferId: null, version: 1 },
    { id: 51, userId: 1, amount: 750, direction: Direction.Debit, accountId: 1, categoryId: 11, date: makeDate(6, 3, 9, 30), comment: 'Transfer to Euro Account', active: true, transferId: 1001, version: 1 },
    { id: 52, userId: 1, amount: 750, direction: Direction.Credit, accountId: 5, categoryId: 11, date: makeDate(6, 3, 9, 31), comment: 'Transfer from Main Checking', active: true, transferId: 1001, version: 1 },
    { id: 53, userId: 1, amount: 1200, direction: Direction.Debit, accountId: 3, categoryId: 11, date: makeDate(6, 6, 12, 15), comment: 'Transfer to Pound Reserve', active: true, transferId: 1002, version: 1 },
    { id: 54, userId: 1, amount: 1200, direction: Direction.Credit, accountId: 6, categoryId: 11, date: makeDate(6, 6, 12, 16), comment: 'Transfer from Savings Vault', active: true, transferId: 1002, version: 1 },
    { id: 55, userId: 1, amount: 350, direction: Direction.Debit, accountId: 9, categoryId: 11, date: makeDate(6, 10, 8, 40), comment: 'Business transfer to Travel Wallet', active: true, transferId: 1003, version: 1 },
    { id: 56, userId: 1, amount: 350, direction: Direction.Credit, accountId: 2, categoryId: 11, date: makeDate(6, 10, 8, 41), comment: 'Transfer from Business Checking', active: true, transferId: 1003, version: 1 },
    { id: 57, userId: 1, amount: 450, direction: Direction.Debit, accountId: 7, categoryId: 11, date: makeDate(6, 14, 16, 20), comment: 'Emergency cash moved to Family Wallet', active: true, transferId: 1004, version: 1 },
    { id: 58, userId: 1, amount: 450, direction: Direction.Credit, accountId: 10, categoryId: 11, date: makeDate(6, 14, 16, 21), comment: 'Transfer from Emergency Cash', active: true, transferId: 1004, version: 1 }
];

export const mockData = {
    currencies,
    accounts,
    categories,
    transactions
};

export default mockData;
