import {ApolloClient} from "@apollo/client"
import client from "./client"

describe("Apollo Client", () => {
    it("should create an Apollo Client instance", () => {
        expect(client).toBeInstanceOf(ApolloClient)
    })

    it("should have the correct URI", () => {
        const space_id = process.env.CONTENTFUL_SPACE_ID
        const environment_id = process.env.CONTENTFUL_ENVIRONMENT
        const access_token = process.env.CONTENTFUL_ACCESS_TOKEN
        const expectedUri = `https://graphql.contentful.com/content/v1/spaces/${space_id}/environments/${environment_id}?access_token=${access_token}`

        expect(client.link.options.uri).toBe(expectedUri)
    })

    it("should use InMemoryCache", () => {
        expect(client.cache).toBeInstanceOf(InMemoryCache)
    })
})
