import { StaticPlayer } from '@/components/StaticPlayer'

export function useMDXComponents(components) {
  return {
    ...components,
    StaticPlayer,
  }
}
