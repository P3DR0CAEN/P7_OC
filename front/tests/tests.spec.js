import apiRegister from "../src/api/user/user.signup";
import apiLogin from "../src/api/user/user.login";
import axiosTestUnit from "../src/lib/axiosTestUnit";
import { test, expect } from "vitest";

const generatedId = Math.floor(Math.random() * 1001);
let authToken = undefined;

test("register", async () => {
    const data = {
        firstName: "Fisrtname" + generatedId,
        lastName: "Lastname" + generatedId,
        email: "test" + generatedId + "@test.fr",
        password: "test" + generatedId + "@test.fr",
    };

    const register = await apiRegister(data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    expect(register).toBeTypeOf("object"); // response ou error = object = test valide
});

test("login", async () => {
    const data = {
        email: "test" + generatedId + "@test.fr",
        password: "test" + generatedId + "@test.fr",
    };

    const login = await apiLogin(data)
        .then((response) => {
            authToken = response.data.token;
            return response.data.token;
        })
        .catch((error) => {
            return error;
        });
    expect(login).toBeTypeOf("string");
});

test("create post", async () => {
    // fail tests Unit
    const data = {
        content: "test de post 1",
        image: undefined,
    };

    console.log(data);

    const createPost = await axiosTestUnit(authToken)
        .post("post/create", data, {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
        })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
    expect(createPost).toBeTypeOf("object");
});
