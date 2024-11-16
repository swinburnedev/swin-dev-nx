import React from "react"
import {render} from "@testing-library/react"
import "@testing-library/jest-dom"
import {HomePage} from "./home-page"
import {IPageProps} from "../types/index.types"

const mockProps: IPageProps = {
    contentLeft: {
        json: {
            content: [
                {
                    nodeType: "paragraph",
                    data: {},
                    content: [
                        {
                            nodeType: "text",
                            value: "Mocked contentLeft",
                            marks: [],
                            data: {},
                        },
                    ],
                },
            ],
        },
    },
    contentRight: {
        json: {
            content: [
                {
                    nodeType: "paragraph",
                    data: {},
                    content: [
                        {
                            nodeType: "text",
                            value: "Mocked contentRight",
                            marks: [],
                            data: {},
                        },
                    ],
                },
            ],
        },
    },
    heroImage: {
        title: "Hero Image",
        description: "Hero Image Description",
        url: "https://example.com/hero.jpg",
    },
    intro: {
        json: {
            content: [
                {
                    nodeType: "paragraph",
                    data: {},
                    content: [
                        {
                            nodeType: "text",
                            value: "Mocked intro",
                            marks: [],
                            data: {},
                        },
                    ],
                },
            ],
        },
    },
    outro: {
        json: {
            content: [
                {
                    nodeType: "paragraph",
                    data: {},
                    content: [
                        {
                            nodeType: "text",
                            value: "Mocked outro",
                            marks: [],
                            data: {},
                        },
                    ],
                },
            ],
        },
    },
}

jest.mock("@swin-dev-nx/shared/ui", () => ({
    ...jest.requireActual("@swin-dev-nx/shared/ui"),
    ImageCaption: ({alt, caption, url}: {alt: string; caption: string; url: string}) => (
        <img alt={alt} src={url} data-testid="image-caption" />
    ),
}))

jest.mock("../components/layout", () => ({
    Layout: ({children}: {children: React.ReactNode}) => <div>{children}</div>,
}))

describe("HomePage", () => {
    it("renders without crashing", () => {
        const {getByText, getByTestId} = render(<HomePage {...mockProps} />)
        expect(getByText("Mocked contentLeft")).toBeInTheDocument()
		expect(getByText("Mocked contentRight")).toBeInTheDocument()
		expect(getByText("Mocked intro")).toBeInTheDocument()
		expect(getByText("Mocked outro")).toBeInTheDocument()
        expect(getByTestId("image-caption")).toHaveAttribute("alt", "Hero Image")
        expect(getByTestId("image-caption")).toHaveAttribute("src", "https://example.com/hero.jpg")
    })

    it.skip("renders the layout with the correct title", () => {
        const {container} = render(<HomePage {...mockProps} />)
        expect(container.querySelector("title")).toHaveTextContent("Home")
    })
})
