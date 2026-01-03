import { CircleCheckBigIcon, CircleDashedIcon, Edit2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../Button";
import type { TaskModel } from "../../App";

import styles from "./styles.module.css";

type TaskContainerProps = {
    setTask: React.Dispatch<React.SetStateAction<TaskModel>>;
    tasks: TaskModel[];
    setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TaskContainer({ setTask, tasks, setTasks, setIsEditing }: TaskContainerProps) {
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

    function handleTaskEdit(id: number) {
        setIsEditing(true);
        const taskToEdit = tasks.find((task) => task.id === id);

        if (taskToEdit) setTask(taskToEdit);
    }

    return (
        <div className={styles.task}>
            <div className={styles.taskHeader}>
                <div className={styles.taskTitle}>
                    <h2>Tarefas</h2>
                </div>
                <div className={styles.taskSummary}>
                    <span>Tarefas Concluídas: {getNumberCompletedTasks()}</span>
                    <span>Tarefas Pendentes: {getNumberPendingTasks()}</span>
                </div>
            </div>
            <div className={styles.taskContent}>
                <div className={styles.taskList}>
                    {tasks.length === 0 && <p style={{ textAlign: "center" }}>Adicione algumas tarefas.</p>}
                    {tasks
                        .sort((a, b) => {
                            return b.id - a.id;
                        })
                        .map((task) => {
                            return (
                                <div
                                    key={task.id}
                                    className={styles.taskItem}
                                    style={task.completed === true ? { opacity: "0.5" } : {}}
                                >
                                    <div className={styles.taskName}>
                                        <Button
                                            variants="icon"
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
                                            {task.completed === true ? <CircleCheckBigIcon /> : <CircleDashedIcon />}
                                        </Button>
                                        {task.name}
                                    </div>
                                    <div className={styles.taskControls}>
                                        <Button
                                            variants="icon"
                                            aria-label="Excluir tarefa"
                                            title="Excluir tarefa"
                                            onClick={() => handleRemoveTask(task.id)}
                                        >
                                            <Trash2Icon />
                                        </Button>
                                        <Button
                                            variants="icon"
                                            aria-label="Editar tarefa"
                                            title="Editar tarefa"
                                            onClick={() => handleTaskEdit(task.id)}
                                        >
                                            <Edit2Icon />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
