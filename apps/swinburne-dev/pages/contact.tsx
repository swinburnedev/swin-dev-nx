import {GetStaticProps} from "next"
import {ContentfulRichText, ImageCaption} from "@swin-dev-nx/shared/ui"
import {gql} from "@apollo/client"
import client from "../apollo/client"
import {Layout} from "../components/layout"
import {IPageProps} from "../types/index.types"

export function Contact({contentLeft, heroImage, intro, outro}: IPageProps) {
    return (
        <Layout title="Contact">
            <div className="grid">
                <div className="grid-cols-1">
                    <ContentfulRichText document={intro?.json} />
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                    <div className="max-w-4xl">
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                            <ContentfulRichText document={contentLeft?.json} />
                            <div
                                className="badge-base LI-profile-badge"
                                data-locale="en_US"
                                data-size="medium"
                                data-theme="light"
                                data-type="HORIZONTAL"
                                data-vanity="andy-swinburne"
                                data-version="v1"
                            />
                        </div>
                        <div className="py-4">
                            <ContentfulRichText document={outro?.json} />
                        </div>
                    </div>
                    <div className="max-w-4xl">
                        <ImageCaption alt={heroImage.description} loading="lazy" priority="high" url={heroImage.url} />
                    </div>
                </div>
            </div>
            <script
                src="https://platform.linkedin.com/badges/js/profile.js"
                async
                defer
                type="text/javascript"
            ></script>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async context => {
    const query = gql`
        query ($preview: Boolean!) {
            pageCollection(where: {slug: "contact"}, preview: $preview) {
                items {
                    contentLeft {
                        json
                    }
                    heroImage {
                        description
                        title
                        url
                    }
                    intro {
                        json
                    }
                    slug
                    title
                }
            }
        }
    `
    const contentfulPreview = Boolean(process.env.CONTENTFUL_PREVIEW)
    const {data} = await client.query({
        query: query,
        variables: {
            preview: contentfulPreview,
        },
    })
    const page = data.pageCollection.items[0]
    return {
        props: {
            ...page,
        },
    }
}

export default Contact
