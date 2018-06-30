import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'
// add expense 

const addExpense  = (
    {
        description = '',
        note = '',
        amount = 0, 
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// remove expense 

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// edit expense 

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// expenses reducer 

const expensesDefaultState = [];

const expensesReducer = (state = expensesDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter( ({id}) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map( (expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense 
                };
            });
        default: 
            return state;
    }
};


// set text filter 

const setTextFilter = (text = '') => ({
    type: "SET_TEXT_FILTER",
    text 
});

// sort by amount 

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'

});
// sort by date 

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});

// set start date 

const setStartDate = (date ) =>  ({
    type: 'SET_START_DATE',
    date
});

// set end date 

const setEndDate = (date) =>  ({
    type: 'SET_END_DATE',
    date
});

// filters reducers
 
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};
const filtersReducer = (state = filterReducerDefaultState , action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date 
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date 
            };
        default: 
            return state;
    }
}

// timestamps come in milliseconds 
// starting point at 1st 1970 (unix epoch)

// Get visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());


        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amoubt ? 1 : -1;
        } 
    });
};

// create store 

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    })

);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);

})


const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

// store.dispatch(setTextFilter('coff'));
// store.dispatch(setTextFilter(''));

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(0));

const demoState = {
    expenses: [{
        id: 'someid',
        description: 'January Rent',
        note: 'This was the final payment',
        amount: 3600,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}