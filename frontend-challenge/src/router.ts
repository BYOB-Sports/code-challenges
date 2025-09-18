export type Route = { name: "list" } | { name: "detail"; id: string };

export function parseRoute(): Route {
  const hash = location.hash.replace(/^#/, "");
  const [name, id] = hash.split("/");
  if (name === "detail" && id) return { name: "detail", id };
  return { name: "list" };
}
export function goToDetail(id: string) {
  location.hash = `detail/${id}`;
}
export function goToList() {
  location.hash = "";
}
