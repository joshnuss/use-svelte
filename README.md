# useSvelte

A React hook for loading Svelte components.

## Example

Pass some Svelte code to `useSvelte()`, and it returns a `ref` suitable for binding an element.

```jsx
import { useSvelte } from 'use-svelte-hook'

export function MyComponent() {
  const ref = useSvelte(`<p>{123}</p>`)

  return (
    <div ref={ref}/>
  )
}
```

## License

MIT
