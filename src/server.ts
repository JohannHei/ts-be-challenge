import Fastify from "fastify";
import mercurius, {IResolvers} from "mercurius";

const products = [
    {
        id: "P1",
        name: "Banana"
    },
    {
        id: "P2",
        name: "Olives"
    },
    {
        id: "P3",
        name: "Mango"
    },
    {
        id: "P4",
        name: "Ananas"
    }
]

const warehouses: { id: string, name: string }[] = [
    {
        id: "W1",
        name: "Battersea"
    },
    {
        id: "W2",
        name: "Kensington"
    }
];
const stock: { [key: string]: { [key: string]: number } } = {
    P1: {
        "W1": 3,
        "W2": 5
    },
    P2: {
        "W1": 0,
        "W2": 15
    },
    P3: {
        "W1": 13,
        "W2": 5
    },
    P4: {
        "W1": 1
    }
}



const typeDefs = `
    type Product {
        id: ID!
        name: String!
        sku: String!
    }

    type Query {
        products: [Product]!
    }
`

const resolvers = {
    Query: {
        products: async () => {
            return products;
        },
    },
    Product: {
        sku: (product: { id: string }) => {
            return 'SKU-' + product.id
        },

    },
}



const createApp = async () => {


    const app = Fastify();

    await app.register(mercurius, {
        schema:typeDefs,
        resolvers: resolvers as IResolvers,
        jit: 1,
        graphiql: true,
    });

    return app;
}

async function main() {
    const app = await createApp();
    await app.listen({port: 8080, host: "0.0.0.0"});
    console.log("Go to http://localhost:8080/graphiql")
}

if (require.main === module) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}