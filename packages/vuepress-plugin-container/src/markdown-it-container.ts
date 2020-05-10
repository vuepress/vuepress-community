import * as Renderer from 'markdown-it/lib/renderer'
import * as Token from 'markdown-it/lib/token'

export type ContainerRenderFunction = (
  tokens: Token[],
  index: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  env: any,
  self: Renderer
) => string

export interface ContainerOptions {
  marker?: string
  validate?: (params: string) => boolean
  render?: ContainerRenderFunction
}
