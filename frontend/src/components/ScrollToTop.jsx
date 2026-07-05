import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset scroll position on route change; scroll to the anchor target when
// the URL has a hash (react-router suppresses the native jump).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
