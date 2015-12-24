// App component - represents the whole app
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 }}).fetch()    }
  },

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <form className="new-task" onSubmit={this.handleSubmit} >
          <input type="text" ref="textInput" placeholder="Type to add new tasks"/>
        </form>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
