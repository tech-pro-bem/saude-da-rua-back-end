import { config } from "dotenv";
import Joi, { ObjectSchema } from "joi";
import md5 from "md5";
import Admin from "../../src/modules/admins/entities/Admin";

config({ path: ".env.test" });

describe("units tests: entities data structure", () => {
    let idSchema: ObjectSchema;

    beforeEach(() => {
        const regexPattern =
            "^[$]2[abxy]?[$](?:0[4-9]|[12][0-9]|3[01])[$][./0-9a-zA-Z]{53}$";

        idSchema = Joi.object()
            .unknown(true)
            .keys({
                id: Joi.string()
                    .guid({ version: ["uuidv4"] })
                    .required(),
                password: Joi.string().pattern(new RegExp(regexPattern)),
            });
    });

    test("Admin entity", async () => {
        const admin = new Admin("teste@gmail.com", "test", "test1234");

        const { email, name, permissionLevel } = admin;

        const { error } = idSchema.validate(admin, {
            convert: false,
        });

        expect(email).toEqual("teste@gmail.com");
        expect(name).toEqual("test");
        expect(permissionLevel).toStrictEqual(md5(process.env.TOKEN_ONE));
        expect(error).toBeUndefined();
    });
});
