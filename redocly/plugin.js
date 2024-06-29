module.exports = {
  id: "local",
  assertions: {
    fixedOperationId: (value, options, ctx) => {
      const result = [];
      for (const path of value) {
        Object.entries(ctx.rawNode[path]).forEach(([method, operation]) => {
          const fixedOperationId = getFixedOperationId(path, method);
          if (operation.operationId !== fixedOperationId) {
            result.push({
              message: fixedOperationId,
              location: ctx.baseLocation.child([path, method, "operationId"]),
            });
          }
        });
      }

      return result;
    },
  },
};
const getFixedOperationId = (path, method) =>
  [method]
    .concat(path.split("/"))
    .filter(Boolean)
    .map((s) => s.replace("{", "[").replace("}", "]"))
    .join("-");
