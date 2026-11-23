/**
 * Router tối giản: so khớp path theo mẫu `:param` và `:param?`.
 * Không phụ thuộc thư viện ngoài.
 */

function compile(pattern) {
  return { segments: pattern.split('/').filter((s) => s !== '') };
}

function matchPath(compiled, pathSegments) {
  const { segments } = compiled;
  const params = {};
  let i = 0;

  for (let s = 0; s < segments.length; s++) {
    const seg = segments[s];
    const optional = seg.endsWith('?');
    const name = optional ? seg.slice(0, -1) : seg;

    if (name.startsWith(':')) {
      const key = name.slice(1);
      if (i >= pathSegments.length) {
        if (optional) continue;
        return null;
      }
      params[key] = decodeURIComponent(pathSegments[i]);
      i++;
    } else {
      if (i >= pathSegments.length || pathSegments[i].toLowerCase() !== name.toLowerCase()) return null;
      i++;
    }
  }

  return i === pathSegments.length ? params : null;
}

export function createRouter() {
  const routes = [];

  const add = (method, pattern, handler) => {
    routes.push({ method, pattern, compiled: compile(pattern), handler });
  };

  return {
    get: (pattern, handler) => add('GET', pattern, handler),
    post: (pattern, handler) => add('POST', pattern, handler),
    /** Đăng ký cùng handler cho nhiều pattern (alias route như bản ASP.NET). */
    getAny: (patterns, handler) => patterns.forEach((p) => add('GET', p, handler)),
    postAny: (patterns, handler) => patterns.forEach((p) => add('POST', p, handler)),

    match(method, pathname) {
      const pathSegments = pathname.split('/').filter((s) => s !== '');
      const head = method === 'HEAD' ? 'GET' : method;

      for (const route of routes) {
        if (route.method !== head) continue;
        const params = matchPath(route.compiled, pathSegments);
        if (params) return { handler: route.handler, params };
      }
      return null;
    },

    get routes() {
      return routes;
    },
  };
}
