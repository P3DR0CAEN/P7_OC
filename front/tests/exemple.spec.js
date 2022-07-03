import "../src/interceptors/axios";
import apiLogin from "../src/api/user/user.login";
import { test, expect } from "vitest";

test("login post", async () => {
    const data = {
        email: "test1@test.fr",
        password: "test1@test.fr",
    };

    const login = await apiLogin(data)
        .then((response) => {
            return response.data.token;
        })
        .catch((error) => {
            return error;
        });
    expect(login).toBeTypeOf("string");
});
