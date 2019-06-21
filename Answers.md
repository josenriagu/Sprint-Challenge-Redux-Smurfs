1.  Name 3 JavaScript Array/Object Methods that do not produce side-effects? Which method do we use to create a new object while extending the properties of another object?

Array method like `.concat()`, `.slice()`, `.map()` and `.filter()` do not mutate the original array but rather returns a new array.
To extend the properties of an existing object onto a new one, we can use the `Object.assign` method or the `...spread` operator in newer ES6 syntax.

1.  Describe `actions`, `reducers` and the `store` and their role in Redux. What does each piece do? Why is the store known as a 'single source of truth' in a redux application?

`Actions` are objects or packets that describe events that happen in the UI which determine how the state will be updated.

`Reducers` are pure functions that take actions and the initial state and return an updated copy of the state.

`Redux store` is the core of the redux application and it holds the state, the reducer functions and middlewares (if any).

The store is known as the single peice of truth because by applying immutability principles to the state, it can keep copies of the state as the application state changes over time. this makes the state predictable and can be used to monitor the behaviour of the application.

1.  What is the difference between Application state and Component state? When would be a good time to use one over the other?

`Application state` is the overall state of the application which can be accessed by multiple components in the application while the `Component state` is the state localised in a component and is only accessible by that component. It is usually handy to use Component state when the state involved will not be needed by any other component such as in managing form states.

1.  What is middleware?

Since redux is synchronous, `middleware` are functios that allow us to perform asynchronous operations by intercepting actions and performing the desired inbetweeneer actions before forwarding to the reducer.

1.  Describe `redux-thunk`, what does it allow us to do? How does it change our `action-creators`?

`Redux-thunk` is a redux middleware for making promises in redux applications. This allows us to make API fetches and wait while the server returns a response.

1.  Which `react-redux` method links up our `components` with our `redux store`?

the `.connect(state, action)` method
