import { useRef, useEffect } from 'react'
import { rollup } from '@rollup/browser'
import * as svelte from 'svelte/compiler'

const cache = new Map()

function loader(source) {
  return {
    name: 'loader',
    resolveId(id) {
      if (id == 'App.svelte') {
        return id
      }

      if (id.startsWith('svelte')) {
        return id
      }
    },

    async load(id) {
      if (id == 'App.svelte') {
        const result = svelte.compile(source)

        return result.js.code
      }

      if (id.startsWith('svelte')) {
        const url = `https://unpkg.com/${id}/index.mjs`
        const js = await fetch(url).then(r => r.text())

        return js
      }
    }
  }
}

async function compile(source) {
  const bundle = await rollup({
    input: 'App.svelte',
    plugins: [
      loader(source)
    ]
  })

  const { output } = await bundle.generate({
    format: 'iife'
  })

  return eval(output[0].code)
}

async function lookup(source) {
  let component = cache.get(source)

  if (!component) {
    component = await compile(source)
    cache.set(source, component)
  }

  return component
}

export function useSvelte(source, props = {}) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      lookup(source).then(component => {
        if ( ref.current.childNodes.length == 0) {
          new component({
            target: ref.current,
            props
          })
        }
      })
    }
  }, [ ref ])

  return ref
}
