# APP

```
app/
├── components/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   ├── Task/
│   │   ├── TaskList.tsx
│   │   ├── TaskForm.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   ├── Common/
│   │   ├── LoadingSpinner.tsx
├── hooks/
│   ├── useAuth.ts
├── pages/
│   ├── api/
│   │   ├── auth.ts
│   │   ├── task.ts
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── tasks.tsx
├── styles/
│   ├── globals.scss
│   ├── variables.scss
├── utils/
│   ├── api.ts
│   ├── auth.ts
├── .env.local
├── next.config.js
├── tsconfig.json
```

## Hooks 

### useState (local state mangement)

```jsx
    import { useState } from "react";

    function Counter() {
        const [counter, setCounter] = useState(0);

        return (
            <>
                <p>Value: {counter}</p>
                <button onClick={() => setCounter(counter + 1)}> Increment</button>
            </>
        )
    }
```

### useEffect (colateral effects)

```jsx
    import { useState, useEffect } from "react";

    function UserData() {
        const [data, setData] = useState(null);

        useEffect(() => {
            fetch("https://localhost/api/users/1")
            .then((res) => res.json() )
            .then((data) =>setData(data));
        }, []); // the empty arry means this will run one time (like `componentDidMount`)

        return <pre>{JSON.stringify(data, null, 2)}</pre>
    }
```


### useContext (share global state)

```jsx
    import { useContext, createContext } from "react";

    const ThemeContext = createContext("light");

    function Button() {
        const theme = useContext(ThemeContext);

        return <button style={{ background : theme === "dark" ? "black" :  "white"}}> Click to change </button>
    }
```


### useRef (DOM element refference)


```jsx
    import { useRef } from "react";

    function InputFocus() {
        const inputRef = useRef(null);

        return (
            <>
                <input ref={inputRef} type="text" />
                <button onmClick={() => inputRef.current.focus()}> Focused </button>)
            </>
    }
```


### use Memo (memorize calculus)


```jsx
    import { useState, useMemo } from "react";

    function SomeSum({numbers}) {
        const result = useMemo(() => number.reduce((a,b) => a + b, 0), [numbers]);

        return  <p> Sum: { result } </p>;
    }
```

### useCallback (memorize the functions )


```jsx
    import { useCallback } from "react";

    function Component() {
        const memorizedFunction = useCallback(() => {
            console.log("Executing ...")
        }, []);

        return  <button onCLick={memorizedFunction}>Execute</button>
    }
```

