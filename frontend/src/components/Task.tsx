type Task = {
  task: {
    _id: string;
    title: string;
    description: string;
  }
}

export default function Task({ task }: Task) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}