export function getCurrentURL () {
  const protocol = window.location.protocol
  const domain = window.location.hostname
  const port = window.location.port
  const path = window.location.pathname

  let currentURL = `${protocol}//${domain}`
  if (port) {
    currentURL += `:${port}`
  }
  currentURL += path

  return currentURL
}
