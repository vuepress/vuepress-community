---
sidebarDepth: 3
mathjax:
  presets: \def\lr#1#2#3{\left#1#2\right#3}
---

# vuepress-plugin-mathjax <GitHubLink repo="vuepress/vuepress-plugin-mathjax"/>

Support TeX syntax in markdown files of your VuePress site.

## Installation

```sh
npm install -D vuepress-plugin-mathjax
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
  ],
}
```

## Configs

Configurations marked with <Badge vertical text="frontmatter"/> will be allowed to be written in the `mathjax` option of the frontmatter of the page in VuePress 1.0.0-alpha.39 and higher. E.g:

```yaml
---
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

```

### target

- **type**: `'svg' | 'chtml'`
- **default**: `'chtml'`

The output of MathJax.

### packages

- **type**: `string | string[]`
- **default**: all the MathJax packages available

The MathJax packages to use.

### macros

- **type**: `{ [key: string]: string | null }`
- **default**: `{}`

Macros will be automatically mixed with built-in macros. To disable a built-in macro, simply set the value to `null` accordingly. Here is a list of all built-in macros:

<!-- <<< @/src/defaultMacros.js -->

### presets <Badge text="frontmatter"/>

- **type**: `string | string[]`
- **default**: `[]`

The preset content to be added. The preset content will automatically be inserted before the TeX code.

### showError <Badge text="vuepress 1.0.0-alpha.40+"/>

- **type**: `boolean`
- **default**: `process.env.NODE_ENV === 'development'`

Whether to output an error message in the console when a compilation error is encountered.

### cache

- **type**: `false | object`
- **default**: `{}`

[LRU Cache](https://github.com/isaacs/node-lru-cache) Options. If set to `false`, no cache will be used.

## Syntax

### Inline

Surround your LaTeX with a single `$` on each side for inline rendering.

**Input:**

<pre class="math-block">
Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
</pre>

**Output:**

<div class="math-block">

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

</div>

### Block

Use two (\$\$) for block rendering. This mode uses bigger symbols and centers the result.

**Input:**

<pre class="math-block">
$$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right) 
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}$$
</pre>

**Output:**

<div class="math-block">

$$
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}$$

</div>

### Conventions

Math parsing in markdown is designed to agree with the conventions set by [pandoc](http://pandoc.org/MANUAL.html#math):

> Anything between two $ characters will be treated as TeX math. The opening $ must have a non-space character immediately to its right, while the closing $ must have a non-space character immediately to its left, and must not be followed immediately by a digit. Thus, $20,000 and $30,000 won’t parse as math. If for some reason you need to enclose text in literal $ characters, backslash-escape them and they won’t be treated as math delimiters.

## Features

### Using Macros

This is part of `config.js` of this project:

```js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-mathjax',
      {
        macros: {
          '\\Z': '\\mathbb{Z}',
        },
      },
    ],
  ],
}
```

**Input:**

<pre class="math-block">
We have $a>n <=> a>=n+1$, if $a, n\in\Z$.
</pre>

**Output:**

<div class="math-block">

We have $a>n <=> a>=n+1$, if $a, n\in\Z$.

</div>

### Using Presets <Badge text="vuepress 1.0.0-alpha.39+"/>

This is the frontmatter of this page:

```yaml
---
sidebarDepth: 3
mathjax:
  presets: '\def\lr#1#2#3{\left#1#2\right#3}'
---

```

**Input:**

<pre class="math-block">
$$

</pre>

**Output:**

<div class="math-block">

$$\frac\partial{\partial t} \lr({\frac{y^t}t})$$

</div>

## Miscellaneous

### Dependencies

This plugin uses [mathjax-v3](https://github.com/mathjax/mathjax-v3) (Early beta) which is not ready for production.

### Related Libraries

This plugin is inspired by some other libraries, thank you!

- [vuepress-plugin-latex](https://github.com/zlliang/vuepress-plugin-latex)
- [markdown-it-katex](https://github.com/waylonflinn/markdown-it-katex)
- [markdown-it-texmath](https://github.com/goessner/markdown-it-texmath)
- [markdown-it-mathjax](https://github.com/classeur/markdown-it-mathjax)
- [markdown-it-mathjax-chtml](https://github.com/yamavol/markdown-it-mathjax-chtml)

## Demo

**Input:**

<pre class="math-block">
Supposing that $y >= 0$ and that $[\log x]$ represents the integer part of $\log x$, let:

$$\Phi (y) = \frac {1} {2 \pi i} \int_{2 - i \infty}^{2 + i \infty} \frac {y^{\omega} \mathrm{d} \omega} {\omega \left(1 + \frac {\omega} {(\log x)^{1.1}}\right)^{[ \log x ] + 1}}, x > 1$$

Obviously, when $0 <= y <= 1$, there is $\Phi(y) = 0$. For all $y >= 0$, $\Phi(y)$ is a non-decreasing function.

When $\log x>=10^4$ and $y>= e^{2{(\log x)}^{-0.1}}$, thus:

$$1 - x^{- 0.1} <= \Phi (y) <= 1$$
</pre>

**Output:**

<div class="math-block">

Supposing that $y >= 0$ and that $[\log x]$ represents the integer part of $\log x$, let:

$$\Phi (y) = \frac {1} {2 \pi i} \int_{2 - i \infty}^{2 + i \infty} \frac {y^{\omega} \mathrm{d} \omega} {\omega \left(1 + \frac {\omega} {(\log x)^{1.1}}\right)^{[ \log x ] + 1}}, x > 1$$

Obviously, when $0 <= y <= 1$, there is $\Phi(y) = 0$. For all $y >= 0$, $\Phi(y)$ is a non-decreasing function.

When $\log x >= 10^4$ and $y >= e^{2{(\log x)}^{-0.1}}$, thus:

$$1 - x^{-0.1} <= \Phi (y) <= 1$$

</div>
