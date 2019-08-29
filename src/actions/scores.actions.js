export const scoresActions = {
  data: () => {
    return {
      resource: {},
    };
  },
  created() {
    const actions = {
      saveScore: { method: "POST", url: "scores.json" },
      // https://medialize.github.io/URI.js/uri-template.html
      fetchRecordScore: { method: "GET" },
    };
    this.resource = this.$resource("{tableName}.json", {}, actions);
    // this.resource = this.$resource("scores.json", {}, actions);
  },
};
