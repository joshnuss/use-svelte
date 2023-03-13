# useSvelte

A React hook for loading Svelte modules.

## Example

Pass some Svelte code to `useSvelte()`, and it returns a `ref` suitable for binding an element.

```jsx
import { useSvelte } from 'use-svelte'

function App() {
  const ref = useSvelte(`<p>{123}</p>`)

  return (
    <main>
      <h1>Svelte App</h1>
      <div ref={ref}/>
    </main>
  )
}

export default App
```


## License

MIT
