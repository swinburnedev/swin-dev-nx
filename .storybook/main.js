module.exports = {
    stories: ["../**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
    addons: [
        "@storybook/addon-essentials",
        "@nx/react/plugins/storybook",
        "@chromatic-com/storybook",
        "@storybook/addon-mdx-gfm"
    ],

    framework: {
        name: "@storybook/nextjs",
        options: {},
    },

    docs: {
        autodocs: true,
    },

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
}
