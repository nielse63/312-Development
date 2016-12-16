
import { extend } from 'lodash'


export default class Meta {

  static attributesToString(element) {
    const attrs = element.attributes
    if (!attrs || !attrs.length) {
      return ''
    }
    return Object.keys(attrs).map(index => {
      const attr = attrs[index]
      return `[${attr.name}="${attr.value}"]`
    })
    .join('')
  }

  static getSelector(element) {
    const nodename = element.nodeName.toLowerCase()
    const attr = element.attributes[0].name
    const value = element.attributes[0].value
    return `${nodename}[${attr}="${value}"]`
  }

  static removeElement(element) {
    if (!element.attributes) {
      return
    }
    const attributes = Meta.attributesToString(element)
    const selector = Meta.getSelector(element)
    const existing = document.querySelector(selector)
    if (!existing) {
      return
    }
    existing.remove()
  }

  constructor() {
    this.head = document.getElementsByTagName('head')[0]
    this.defaults = {
      htmlAttributes: {
        lang: 'en-US',
        amp: undefined,
      },
      title: '',
      defaultTitle: '312 Development',
      backupTitle: 'UI &amp; JavaScript Software Engineer',
      description: '',
      base: {
        href: [
          window.location.protocol,
          window.location.host,
        ].join('//'),
      },
      meta: [],
      link: [
      { rel: 'dns-prefetch', href: window.location.href },
      { rel: 'canonical', href: window.location.href },
      ],
      // script: [],
    }
    this.store = []
  }

  update(component) {
    const C = new component.nodeName() // eslint-disable-line new-cap
    this.data = extend(this.defaults, C.props)

    this.createTitle()
    this.createBase()
    this.createDescription()
    this.createDynamic('meta')
    this.createDynamic('link')
    // this.createDynamic('script')
  }

  appendElement(element) {
    // see if an identical element exists
    const selector = Meta.attributesToString(element)
    if (document.querySelector(selector)) {
      return
    }

    // remove existing element
    Meta.removeElement(element)

    // this.store.push(uid)
    this.head.appendChild(element)
  }

  createTitle() {
    let title = this.data.title
    const defaultTitle = this.data.defaultTitle
    if (!title) {
      title = defaultTitle
    }
    const array = [
      title,
      this.data[title === defaultTitle ? 'backupTitle' : 'defaultTitle'],
    ]

    document.title = array.join(' | ')
  }

  createBase() {
    if (!Object.keys(this.data.base).length || this.createdBase) {
      return
    }

    this.createdBase = true
    const element = document.createElement('base')
    element.href = this.data.base.href

    this.appendElement(element)
  }

  createDescription() {
    if (!this.data.description) {
      return
    }

    const description = document.querySelector('meta[name="description"]')
    description.setAttribute('content', this.data.description)
  }

  createDynamic(node) {
    this.data[node].forEach(object => {
      const element = document.createElement(node)
      const attrs = Object.keys(object)
      attrs.forEach(key => {
        element.setAttribute(key, object[key])
      })
      this.appendElement(element)
    })
  }
}
