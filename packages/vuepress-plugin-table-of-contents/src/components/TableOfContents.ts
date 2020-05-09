import Vue, { ComponentOptions, VNode } from 'vue'
import { PageHeader } from 'vuepress-types'

interface TableOfContentsComponent extends Vue {
  includeLevel: number[]
  headers: TOFHeader[] | null
}

interface TOFHeader extends PageHeader {
  children: TOFHeader[] | null
}

const TableOfContents: ComponentOptions<Vue> = {
  name: 'TableOfContents',

  props: {
    includeLevel: {
      type: Array,
      required: false,
      default: (): number[] => [2, 3],
    },
  },

  computed: {
    headers(this: TableOfContentsComponent): TOFHeader[] | null {
      if (this.$page && this.$page.headers) {
        const minLevel: number = this.includeLevel[0]
        const maxLevel: number = this.includeLevel[1]

        const processHeaders = (
          headers: PageHeader[],
          rootLevel = minLevel
        ): TOFHeader[] => {
          const result: TOFHeader[] = []
          for (let i = 0; i !== headers.length; ) {
            const nextRootOffset = headers
              .slice(i + 1)
              .findIndex((h) => h.level === rootLevel)
            const nextRootIndex =
              nextRootOffset === -1 ? headers.length : nextRootOffset + i + 1
            const thisHeader = headers[i]

            if (thisHeader.level >= rootLevel && thisHeader.level <= maxLevel) {
              const childHeaders = headers.slice(i + 1, nextRootIndex)
              const children =
                rootLevel < maxLevel && childHeaders.length > 0
                  ? processHeaders(childHeaders, rootLevel + 1)
                  : null
              result.push({
                ...thisHeader,
                children,
              })
            }
            i = nextRootIndex
          }
          return result
        }
        return processHeaders(this.$page.headers)
      }

      return null
    },
  },

  render(this: TableOfContentsComponent, h) {
    if (!this.headers) {
      return (null as unknown) as VNode
    }

    const renderHeaders = (items: TOFHeader[]): VNode => {
      return h(
        'ul',
        items.map((item) =>
          h('li', [
            h(
              'RouterLink',
              {
                props: { to: `#${item.slug}` },
              },
              item.title
            ),
            item.children ? renderHeaders(item.children) : null,
          ])
        )
      )
    }
    return h('div', [renderHeaders(this.headers)])
  },
}

export default TableOfContents
