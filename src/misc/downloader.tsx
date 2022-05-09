/**
 * Download and save given URL as a file.
 * @param url
 * @param token
 */
export const downloadUrl = (url: string, token?: string, fileName?: string): void => {
  const headers: HeadersInit = token ? { Authorization: 'Bearer ' + token } : {}
  fetch(url, {
    method: 'GET',
    headers: new Headers(headers)
  })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.download = fileName || 'file.bin'
      document.body.appendChild(a)
      a.click()
      a.remove()
    })
}
