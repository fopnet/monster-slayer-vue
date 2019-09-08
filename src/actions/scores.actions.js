/**
 * Changed by Vuex because the state auth
 */
export const scoresActions = {
  data: () => {
    return {
      resource: {},
    };
  },
  created() {
    const actions = {
      saveScore: {
        method: "POST",
        url: `scores/${this.$store.state.userId}.json`,
      },
      // https://medialize.github.io/URI.js/uri-template.html
      fetchRecordScore: {
        method: "GET",
      },
    };

    this.resource = this.$resource(
      `{tableName/${this.$store.state.userId}.json?orderBy=%22score%22&limitToLast=1&print=pretty&auth=${this.$store.state.idToken}`,
      {},
      actions,
    );
  },
};
