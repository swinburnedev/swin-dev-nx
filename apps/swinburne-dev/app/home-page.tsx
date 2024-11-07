'use client'

import { ContentfulRichText, ImageCaption } from '@swin-dev-nx/shared/ui';
import { Layout } from '../components/layout';
import {IPageProps} from "../types/index.types"

export function HomePage({contentLeft, contentRight, heroImage, intro, outro}: IPageProps) {
    return (
        <Layout title="Home">
            <div className="grid">
                <div className="grid-cols-1">
                    <ContentfulRichText document={intro?.json} />
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                    <div className="max-w-4xl">
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                            <ContentfulRichText document={contentLeft?.json} />
                            <ContentfulRichText document={contentRight?.json} />
                        </div>
                        <div className="py-4">
                            <ContentfulRichText document={outro?.json} />
                        </div>
                    </div>
                    <div className="max-w-4xl">
                        <ImageCaption
                            alt={heroImage.title}
                            caption={heroImage.description}
                            loading="lazy"
                            priority="high"
                            url={heroImage.url}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage;
