export interface IPet {
    name: string,
    age: number
}

export const PetSchema = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "age"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and required"
                },
                age: {
                    bsonType: "number",
                    description: "must be a number and required"
                }
            }
        }
    }
}