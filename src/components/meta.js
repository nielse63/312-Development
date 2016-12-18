
import { extend } from 'lodash'
import { Router } from 'preact-router'

class Tag {
  constructor(nodename, attrs = {}) {
    this.nodename = nodename.toLowerCase()
    this.attrs = attrs
    // this.attrString = this.toString()
    this.selector = this.getSelector()
    this.element = this.getElement()
    this.create()
  }

  // toString() {
  //   return Object.keys(this.attrs).map(key => {
  //     const attr = this.attrs[key]
  //     return `[${key}="${attr}"]`
  //   }).join('')
  // }

  getSelector() {
    const key = Object.keys(this.attrs)[0]
    const value = this.attrs[key]
    return `${this.nodename}[${key}="${value}"]`
  }

  getElement() {
    return document.querySelector(this.selector)
  }

  exists() {
    return !!this.getElement()
  }

  setAttributes() {
    Object.keys(this.attrs).forEach(key => {
      this.element.setAttribute(key, this.attrs[key])
    })
  }

  create() {
    if (this.element) {
      this.setAttributes()
      return this.element
    }

    this.element = document.createElement(this.nodename)
    this.setAttributes()
    this.new = true
    return this.element
  }
}

export default class Meta {
  // constructor() {
  //   const baseUrl = [
  //     window.location.protocol,
  //     window.location.host,
  //   ].join('//')
  //   const pathname = `/${(window.location.href.split('/').slice(3).join('/')).replace(/\/\//g, '/')}`
  //   const curUrl = `${baseUrl}${pathname}`
  //   this.head = document.getElementsByTagName('head')[0]
  //   this.defaults = {
  //     htmlAttributes: {
  //       lang: 'en-US',
  //       amp: undefined,
  //     },
  //     title: '',
  //     defaultTitle: '312 Development',
  //     backupTitle: 'UI & JavaScript Software Engineer',
  //     meta: [{
  //       name: 'description',
  //       content: '',
  //     }],
  //     link: [{
  //       rel: 'canonical', href: curUrl,
  //     }],
  //   }
  //   this.store = {}
  // }

  update(component, router) {
    if (router.updating) {
      return setTimeout(this.update.bind(this, component, router), 100)
    }

    const { data, path } = this.getPageInfo(component)
    this.store[path] = data
    this.path = path

    // this.createTitle(data)
    // this.createDynamic(data, 'meta')
    // this.createDynamic(data, 'link')
  }

  getPageInfo(component) {
    const path = component.attributes.path
    let data = this.store[path]
    if (!data) {
      const c = new component.nodeName() // eslint-disable-line new-cap
      data = extend(this.defaults, c.props)
    }

    return {
      data,
      path,
    }
  }

  createTitle(data) {
    const title = data.title || data.defaultTitle
    const description = data.description || data.backupTitle
    this.title = `${title} | ${description}`
    document.title = `${title} | ${description}`
  }

  createDynamic(data, node) {
    data[node].forEach(object => {
      const tag = new Tag(node, object)
      if (tag.new && tag.element) {
        this.head.appendChild(tag.element)
      }
    })
  }
}
