import axios from "axios";

export const getApi = async (category: string) => {
    const apiBaseUrl = `https://newsapi.org/v2/top-headlines?country=kr&category=${category}`;
    const apiKey = `apiKey=eb64e88d73ab40eb92309a0851e34b59`;

    const { data } = await axios.get(`${apiBaseUrl}&${apiKey}`);

    if (data.status === "ok") {
        return data.articles;
    }
};
