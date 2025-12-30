import { CircleCheckBigIcon, CircleDashedIcon, Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import "./styles/global.css";
import "./styles/theme.css";

type TaskModel = {
    id: number;
    name: string;
    completed: boolean;
};

export function App() {
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!taskName) {
            alert("Digite uma tarefa");
            return;
        }

        const task = taskName.trim();

        const newTask = {
            id: Date.now(),
            name: task,
            completed: false,
        };

        setTasks((prevTask) => [...prevTask, newTask]);
        setTaskName("");
    }

    function getNumberCompletedTasks() {
        let count = 0;

        tasks.forEach((task) => {
            if (task.completed) count += 1;
        });

        return count;
    }

    function getNumberPendingTasks() {
        let count = 0;

        tasks.forEach((task) => {
            if (!task.completed) count += 1;
        });

        return count;
    }

    function handleCompleteTask(id: number) {
        const updatedTask = tasks.map((task) => {
            if (task.id === id) return { ...task, completed: !task.completed };
            return task;
        });

        setTasks(updatedTask);
    }

    function handleRemoveTask(id: number) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <div className="container">
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h1>Lista de Tarefas</h1>
                    </div>
                    <div className="card-content">
                        <form className="form" onSubmit={handleCreateNewTask}>
                            <label htmlFor="taskName">Nome da Tarefa</label>
                            <input
                                id="taskName"
                                type="text"
                                placeholder="Estudar"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                            <button type="submit" className="form-button">
                                Adicionar
                            </button>
                        </form>
                        <div className="task">
                            <div className="task-header">
                                <div className="task-title">
                                    <h2>Tarefas</h2>
                                </div>
                                <div className="task-summary">
                                    <span>Tarefas Concluídas: {getNumberCompletedTasks()}</span>
                                    <span>Tarefas Pendentes: {getNumberPendingTasks()}</span>
                                </div>
                            </div>
                            <div className="task-content">
                                <div className="task-list">
                                    {tasks.length === 0 && (
                                        <p style={{ textAlign: "center" }}>Adicione algumas tarefas.</p>
                                    )}
                                    {tasks.map((task) => {
                                        return (
                                            <div
                                                key={task.id}
                                                className="task-item"
                                                style={task.completed === true ? { opacity: "0.5" } : {}}
                                            >
                                                <div className="task-name">
                                                    <button
                                                        aria-label={
                                                            task.completed === false
                                                                ? "Marcar tarefa como concluída"
                                                                : "Desmarcar tarefa como concluída"
                                                        }
                                                        title={
                                                            task.completed === false
                                                                ? "Marcar tarefa como concluída"
                                                                : "Desmarcar tarefa como concluída"
                                                        }
                                                        onClick={() => handleCompleteTask(task.id)}
                                                    >
                                                        {task.completed === true ? (
                                                            <CircleCheckBigIcon />
                                                        ) : (
                                                            <CircleDashedIcon />
                                                        )}
                                                    </button>
                                                    {task.name}
                                                </div>
                                                <div className="task-controls">
                                                    <button
                                                        aria-label="Excluir tarefa"
                                                        title="Excluir tarefa"
                                                        onClick={() => handleRemoveTask(task.id)}
                                                    >
                                                        <Trash2Icon />
                                                    </button>
                                                    <button aria-label="Editar tarefa" title="Editar tarefa">
                                                        <Edit2Icon />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
