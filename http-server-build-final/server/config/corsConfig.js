module.exports = {
    init: function () {},

    getCORSConfig: function () {
        return {
            "Access-Control-Allow-Origin": "https://localhost:3030",
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Credentials": "true"
        }
    }
}