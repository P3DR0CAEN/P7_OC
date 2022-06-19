import { mount } from "@vue/test-utils";
import Component from "../src/views/";

test("sets the value", async () => {
    const wrapper = mount(Component);
    const input = wrapper.find("input");

    await input.setValue("my@mail.com");

    expect(input.element.value).toBe("my@mail.com");
});
