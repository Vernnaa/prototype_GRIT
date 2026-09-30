export const routes = ['welcome', 'start', 'questions', 'explorer', 'explore', 'field', 'missions', 'mission', 'workspace', 'reflection', 'insight', 'direction', 'path', 'home', 'progress', 'profile'] as const;
export type RouteName = typeof routes[number];
export type Route = { page: RouteName; id?: string };

export function currentRoute(): Route {
  const [page, id] = location.hash.slice(2).split('/');
  return { page: routes.includes(page as RouteName) ? page as RouteName : 'welcome', id };
}

export function navigate(page: RouteName, id?: string) {
  location.hash = `/${page}${id ? `/${id}` : ''}`;
}
