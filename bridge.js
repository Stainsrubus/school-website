;(function () {
  var CMS_ORIGIN = "https://schoolpress-cms.creoleaptech.workers.dev"
  var config = (typeof window.__SCHOOLPRESS__ === 'object' && window.__SCHOOLPRESS__) || {}
  var script = document.currentScript

  if (script && script.src) {
    try {
      var u = new URL(script.src)
      CMS_ORIGIN = u.origin
      var qs = u.searchParams.get('school')
      var qk = u.searchParams.get('key')
      if (qs) config.slug = qs
      if (qk) config.key = qk
      if (u.searchParams.get('dev') === 'true') config.dev = true
    } catch (e) {}
  }

  var slug = config.slug || ''
  var key = config.key || ''
  if (!slug || !key) {
    console.warn('[SchoolPress] Missing bridge config. Set window.__SCHOOLPRESS__ = { slug, key } before loading the bridge.')
    return
  }

  var etag = ''
  var syncedAt = 0
  var failed = false
  var TYPE_KEYS = { text: 'text', textarea: 'text', richtext: 'html', 'image-url': 'src', 'video-url': 'src' }

  function resolveAssetUrl(url) {
    if (!url) return ''
    if (url.startsWith('/api/assets/')) {
      return CMS_ORIGIN + url
    }
    return url
  }

  function pageOf(el) {
    var node = el.closest ? el.closest('[data-cms-page]') : null
    return node ? node.getAttribute('data-cms-page') || 'home' : 'home'
  }

  function fieldType(el) {
    var t = el.getAttribute('data-cms-type')
    if (t) return t
    return el.hasAttribute('data-cms-src') ? 'image-url' : 'text'
  }

  function discover() {
    var pages = {}
    var elements = document.querySelectorAll('[data-cms], [data-cms-src]')
    elements.forEach(function (el) {
      var page = pageOf(el)
      var key = el.getAttribute('data-cms') || el.getAttribute('data-cms-src') || ''
      if (!key) return
      if (!pages[page]) pages[page] = { fields: [], defaults: {} }
      pages[page].fields.push({
        key: key,
        type: fieldType(el),
        label: el.getAttribute('data-cms-label') || key,
        required: el.hasAttribute('data-cms-required')
      })
      var value = el.hasAttribute('data-cms-src') ? (el.getAttribute('src') || '') : (el.textContent || '')
      pages[page].defaults[key] = value
    })
    var seen = {}
    Object.keys(pages).forEach(function (page) {
      if (seen[page]) return
      seen[page] = true
      fetch(CMS_ORIGIN + '/api/discover?school=' + encodeURIComponent(slug), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Schoolpress-Key': key },
        body: JSON.stringify({
          school: slug,
          page: page,
          fields: pages[page].fields,
          defaults: pages[page].defaults,
          collections: config.collections || []
        })
      }).catch(function () {})
    })
  }

  function apply(data) {
    var patched = 0
    var schema = data.schema || {}
    var values = data.values || {}

    Object.keys(schema).forEach(function (page) {
      Object.keys(schema[page] || {}).forEach(function (fieldKey) {
        var value = (values[page] && values[page][fieldKey] !== undefined) ? values[page][fieldKey] : ''
        var type = schema[page][fieldKey].type || 'text'
        var targets = []
        document.querySelectorAll('[data-cms="' + fieldKey + '"], [data-cms-src="' + fieldKey + '"]').forEach(function (el) {
          if (pageOf(el) === page) targets.push(el)
        })
        if (targets.length === 0 && page === 'home') {
          document.querySelectorAll('[data-cms="' + fieldKey + '"], [data-cms-src="' + fieldKey + '"]').forEach(function (el) {
            if (!el.closest || !el.closest('[data-cms-page]')) targets.push(el)
          })
        }
        targets.forEach(function (el) {
          var mode = el.hasAttribute('data-cms-src') ? 'src' : (TYPE_KEYS[type] || 'text')
          if (mode === 'src') {
            var srcVal = resolveAssetUrl(value)
            if (srcVal && el.getAttribute('src') !== srcVal) { el.setAttribute('src', srcVal); patched++ }
          } else if (mode === 'html') {
            if (el.innerHTML !== value) { el.innerHTML = value; patched++ }
          } else {
            if (el.textContent !== value) { el.textContent = value; patched++ }
          }
        })
      })
    })

    var cols = Array.isArray(data.collections) ? data.collections : Object.keys(data.collections || {}).map(function (k) { return data.collections[k] })
    cols.forEach(function (col) { applyCollection(col) })
    return patched
  }

  function applyCollection(col) {
    var container = document.querySelector('[data-cms-collection="' + col.name + '"]')
    if (!container) return
    var template = container.querySelector('[data-cms-item]')
    if (!template) return
    var items = (col.items || []).filter(function (item) { return item.published !== false })
    container.querySelectorAll('[data-cms-item]').forEach(function (node) {
      if (node !== template) node.remove()
    })
    if (items.length === 0) return
    items.forEach(function (item) {
      var node = template.cloneNode(true)
      node.removeAttribute('data-cms-item')
      Object.keys(col.schema || {}).forEach(function (fieldKey) {
        var value = (item.data && item.data[fieldKey] !== undefined) ? item.data[fieldKey] : ''
        var type = (col.schema[fieldKey] && col.schema[fieldKey].type) || 'text'
        var el = node.querySelector('[data-cms-col="' + fieldKey + '"]')
        if (!el) return
        if (type === 'image-url' || type === 'video-url') {
          var srcVal = resolveAssetUrl(value)
          if (el.hasAttribute('data-cms-src')) { if (el.getAttribute('src') !== srcVal) el.setAttribute('src', srcVal) }
        } else if (type === 'richtext') {
          if (el.innerHTML !== value) el.innerHTML = value
        } else {
          if (el.textContent !== value) el.textContent = value
        }
      })
      container.appendChild(node)
    })
  }

  function sync() {
    fetch(CMS_ORIGIN + '/api/content?school=' + encodeURIComponent(slug), {
      headers: { 'X-Schoolpress-Key': key, 'If-None-Match': etag ? '"' + etag + '"' : '' }
    }).then(function (res) {
      if (res.status === 304) { syncedAt = Date.now(); failed = false; return }
      if (!res.ok) throw new Error('HTTP ' + res.status)
      var incoming = res.headers.get('ETag')
      return res.json().then(function (data) {
        if (incoming) etag = incoming.replace(/^W\//, '').replace(/^"|"$/g, '')
        lastData = data
        var needsDiscovery = Object.keys(data.schema || {}).length === 0
        apply(data)
        syncedAt = Date.now()
        failed = false
        if (needsDiscovery) discover()
      })
    }).catch(function (err) {
      failed = true
      if (config.dev) console.warn('[SchoolPress] Sync failed:', err.message)
    })
  }

  // SPA navigation re-mounts sections after the initial sync. Watch the DOM and
  // re-apply CMS content (and re-sync) whenever new cms elements appear.
  var lastData = null
  var domTimer = null

  function newCmsElements(mutations) {
    var found = []
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (!node || node.nodeType !== 1) return
        if (node.matches && node.matches('[data-cms], [data-cms-src]')) found.push(node)
        if (node.querySelectorAll) {
          node.querySelectorAll('[data-cms], [data-cms-src]').forEach(function (el) { found.push(el) })
        }
      })
    })
    return found
  }

  function onDomChanged(mutations) {
    var els = newCmsElements(mutations)
    if (els.length === 0) return
    clearTimeout(domTimer)
    domTimer = setTimeout(function () {
      var schema = (lastData && lastData.schema) || {}
      var needsSync = !lastData
      els.forEach(function (el) {
        var page = pageOf(el)
        var key = el.getAttribute('data-cms') || el.getAttribute('data-cms-src') || ''
        if (schema[page] && schema[page][key] !== undefined) return
        if (!schema[page] || !schema[page][key]) needsSync = true
      })
      if (lastData) apply(lastData)
      if (needsSync) sync()
    }, 120)
  }

  function startObserver() {
    if (!window.MutationObserver) return
    new MutationObserver(onDomChanged).observe(document.documentElement, { childList: true, subtree: true })
  }

  if (config.dev) {
    var bar = document.createElement('div')
    bar.id = '__schoolpress_toolbar'
    bar.innerHTML =
      '<div style="position:fixed;bottom:16px;right:16px;z-index:2147483647;background:#0f172a;color:#e2e8f0;padding:8px 14px;border-radius:8px;font:12px/1.4 ui-monospace,monospace;box-shadow:0 8px 30px rgba(0,0,0,.35);display:flex;align-items:center;gap:10px">' +
      '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e" id="__sp_dot"></span>' +
      '<span>SchoolPress <strong>' + slug + '</strong></span>' +
      '<span style="color:#64748b" id="__sp_status"></span></div>'
    document.body.appendChild(bar)
    var dot = document.getElementById('__sp_dot')
    var status = document.getElementById('__sp_status')
    setInterval(function () {
      dot.style.background = failed ? '#ef4444' : '#22c55e'
      status.textContent = syncedAt ? 'synced ' + Math.max(0, Math.round((Date.now() - syncedAt) / 1000)) + 's ago' : 'connecting…'
    }, 1000)
  }

  startObserver()
  sync()
})()
