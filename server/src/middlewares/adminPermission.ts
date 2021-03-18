import { Response, Request } from "express";

const isAdmin = (request: Request, response: Response, next: any) => {
    const jwt = request?.headers?.authorization;
    if (jwt) {
        const token = jwt.split(" ")[1];
        const decodedToken = Buffer.from(token.split(".")[1], 'base64').toString('binary')
        const user_data = JSON.parse(decodedToken).data[0];
        const isAdmin = user_data.isAdmin;
        if (isAdmin == 1){
            console.log("admin detected!");
            next();
        }else{
            response.status(403).send();
        }
    } else {
        response.status(403).send();
    }
}
// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiem9yZyIsImVtYWlsIjoiYmxvYkBwbGFuZXQudXMiLCJpc0FkbWluIjoxLCJjcmVhdGVfdGltZSI6IjIwMjEtMDItMTdUMDk6MDI6MjkuMDAwWiJ9XSwiaWF0IjoxNjE2MDczMjQxLCJleHAiOjE2MTYxNTk2NDF9.vpK0qXu5yk0_W_RVgkzECdrsdZ2wIjT5vPJMhU6kBi3YrN4oqrWVDGche2S4NHbSDv6Lhu0-GG8bDZWhOoZR8WyYqTWQ_BmSfTJWQg82kOPR-wkLWQ5W4LTD9_O4rWisc2kvSfs55IzkYfThM57yPeJ2jj01g5isDSLp5Zia_0Hw6cYzj9YazdnSV1_4h0q9GcIIiBvcCG0tK5SA3IYno0xqW_Wer9zYcboE9kPX_EmSXYs4r-cp--Snb5MptvA_IxF3AuN5q7UCRJ8nD94zDfQRsnomTkx-YJaA4FyIRN7PLkAel_q-JZCLeWRR37gCeBjZP53Kp_pfM8EuBcZypJPHlDUVx4wG_M7CJuV4m7EYE_hakKCZxwI5AD2e1yTrvqfWz-8RJQ5Yzgtyv5F6e4lWsidwS6Ov6o0hU1Pq-j-qJg2cuNeqrghEUssCjsE6STY6OKt_itLf6AQKNgeCu2Z_XjzlWDk554lf_Yd2NW-hoBlT0Rn_t0YRr03Wor1Jz8VjCMEUaEMfi34M-TfqWc2VB0IVN27e5ePaylS-ZlVGPIs5trfb0jTldCxEKoL3nri2heXoFFpjnBx1zdVUOMy3vEppa25RWkaN93GO3qlLl2WjZi3KXtZNa9uJ8-AFfa27fgmMO9yfOW-n7BtjaIM0RQFvj_psFvjG82a8Dm8
export default isAdmin;