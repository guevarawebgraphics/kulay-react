import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const TaskApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const totalTasks = tasks.length;
  const remainingTasks = tasks.filter(t => !t.completed).length;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleTask(item.id)}>
      <Text style={[styles.taskText, item.completed && styles.completed]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Manager</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Add a new task"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <Text style={styles.footer}>
        Total: {totalTasks} | Remaining: {remainingTasks}
      </Text>
    </View>
  );
};

export default TaskApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f5f5f5'
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20
  },
  taskText: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888'
  },
  footer: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center'
  }
});
