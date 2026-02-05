export const QUERY_KEYS = {
  POST: {
    GET: () => ["post"],
    GET_BY_ID: (id: string | number) => ["post", id],
    CREATE: () => ["post", "create"],
    UPDATE: (id: string | number) => ["post", "update", id],
    DELETE: (id: string | number) => ["post", "delete", id],
  },
};
