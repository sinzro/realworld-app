import db from "@root/data/database.json";

export const testData = {
    newUser: {
        username: "bruce_wayne",
        password: "batman",
        firstName: "Bruce",
        lastName: "Wayne",
        email: "bruce.wayne@waynecorp.com",
        phone: "111-111-111",
        bankName: "Bank of Gotham",
        routingNumber: "111-111-1",
        accountNumber: "999999999",
    },
    commentContent: "Comment added via API",
    transactionId: db.transactions[0].id,
    signInUrl: "/signin",
    transactionUrl: "/transaction",
};
