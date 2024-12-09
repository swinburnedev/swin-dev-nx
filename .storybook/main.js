module.exports = {
    stories: ["../**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-designs",
        "@storybook/addon-essentials",
        // "@storybook/addon-interactions",
        "@nx/react/plugins/storybook",
        "@storybook/addon-mdx-gfm",
        "@etchteam/storybook-addon-status",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },

    docs: {
        autodocs: true,
    },

    typescript: {
        reactDocgen: "react-docgen-typescript",
    },
}
