/*
 *   Nome: Silvanei de Almeida Martins;
 *   E-mail: silvaneimartins_rcc@hotmail.com;
 *   Contato Telegram: (69) 9.8405-2620;
 *   Frase: Estamos em constante mudança no aprendizado;
 *   Assinatura: Silvanei Martins;
 */
const request = require("supertest");
const { validate } = require("uuid");

const app = require("../");

describe("Users", () => {
    it("should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "John Doe",
            username: "johndoe",
        });
        expect(201);

        expect(validate(response.body.id)).toBe(true);

        expect(response.body).toMatchObject({
            name: "John Doe",
            username: "johndoe",
            todos: [],
        });
    });

    it("should not be able to create a new user when username already exists", async () => {
        await request(app).post("/users").send({
            name: "John Doe",
            username: "johndoe",
        });

        const response = await request(app)
            .post("/users")
            .send({
                name: "John Doe",
                username: "johndoe",
            })
            .expect(400);

        expect(response.body.error).toBeTruthy();
    });
});
