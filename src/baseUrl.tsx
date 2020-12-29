export const baseUrl: string = process.env.NODE_ENV === "development"
                        ? "http://localhost:3002/"
                        : "https://lifecontingencies-7545f-default-rtdb.firebaseio.com/"