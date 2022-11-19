import {createServer, Model} from "miragejs";

export default function () {
  createServer({
    models: {
      todo: Model,
    },

    seeds(server) {
      server.create("todo", {text: "Learn MirageJs"});
      server.create("todo", {text: "Workout"});
      server.create("todo", {text: "Learn JS"});
    },

    routes() {
      this.get("/api/todos", (schema) => {
        return schema.todos.all();
      });

      this.post("/api/todos", (schema, request) => {
        let data = JSON.parse(request.requestBody);
        console.log(data);
        return schema.todos.create(data);
      });

      this.delete("/api/todos/:id", (schema, request) => {
        let todoId = request.params.id;
        return schema.todos.find(todoId).destroy();
      });
    },
  });
}
