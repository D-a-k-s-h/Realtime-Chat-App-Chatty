import daisyui from "daisyui";
import themes from "daisyui/theme/object";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                customPurple:"#20141E",
                customYellow:"#A48F68"
            },
        },
    },
    plugins: [daisyui],
    daisyui:{
        themes:["light","dark","cupcake","retro"]
    }
};