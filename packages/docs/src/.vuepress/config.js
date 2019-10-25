const ecosystem = require('./ecosystem')

module.exports = context => ({
  head: [
    ['link', { rel: 'icon', href: '/logo/600x600.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],

  plugins: [
    ['@vuepress/back-to-top'],
    [
      'clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html',
      },
    ],
    [
      'container',
      {
        type: 'right',
        defaultTitle: '',
      },
    ],
    [
      'container',
      {
        type: 'theorem',
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ],
    [
      'copyright',
      {
        disabled: true,
        authorName: {
          'zh-CN': ' VuePress Community ',
          'en-US': 'VuePress Community',
        },
      },
    ],
    ['git-log'],
    [
      'mathjax',
      {
        macros: {
          '\\Z': '\\mathbb{Z}',
        },
      },
    ],
    [
      'medium-zoom',
      {
        selector: '.theme-default-content img:not(.no-medium-zoom)',
      },
    ],
    [
      'redirect',
      {
        locales: true,
      },
    ],
    ['serve'],
    ['smooth-scroll'],
    ['table-of-contents'],
    [
      'zooming',
      {
        selector: '.theme-default-content img.zooming',
      },
    ],
  ],

  locales: {
    '/en/': {
      lang: 'en-US',
      title: 'VuePress Community',
      description: 'Community supported ecosystem for VuePress',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress 社区',
      description: '社区维护的 VuePress 生态系统',
    },
  },

  themeConfig: {
    repo: 'vuepress/vuepress-community',
    editLinks: true,
    docsDir: 'packages/docs/src',
    locales: {
      '/en/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
      },
    },
    sidebar: {
      '/en/': getSidebar('Plugins', 'Themes', 'Tools'),
      '/zh/': getSidebar('插件', '主题', '工具'),
    },
  },

  evergreen: () => !context.isProd,
})

const getSidebar = (plugins, themes, tools) => [
  {
    title: plugins,
    collapsable: true,
    children: ecosystem.plugins.map(name => `plugins/${name}`),
  },
  {
    title: tools,
    collapsable: true,
    children: ecosystem.tools.map(name => `tools/${name}`),
  },
]
