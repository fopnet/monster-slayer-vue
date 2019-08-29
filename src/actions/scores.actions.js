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
    this.resource = this.$resource(
      "{tableName}.json?orderBy=%22score%22&limitToLast=1&print=pretty",
      {},
      actions,
    );
    // this.resource = this.$resource("scores.json", {}, actions);
  },
};
