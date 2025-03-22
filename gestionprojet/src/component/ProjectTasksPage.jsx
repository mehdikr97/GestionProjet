import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {toast , Toaster } from 'react-hot-toast';

const ProjectTasksPage = () => {
  const { projectId } = useParams(); // Récupérer l'ID du projet depuis l'URL
  const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
  
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [task, setTask] = useState({
    description: '',
    dateDebut: '',
    dateFin: '',
  }); 
  const [editingTaskId, setEditingTaskId] = useState(null); // ID de la tâche en cours d'édition

  // Charger les tâches du projet
  useEffect(() => {
    if (projectId) {
      axios
        .get(`http://localhost:8888/api/projet/${projectId}/taches`)
        .then((response) => setTasks(response.data))
        .catch((error) => console.error('Erreur lors du chargement des tâches:', error));
    }
  }, [projectId]);

  // Ajouter ou modifier une tâche
  const handleAddOrEditTask = async () => {
    if (!task.description || !task.dateDebut || !task.dateFin) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    const formattedTask = {
      ...task,
      dateDebut: new Date(task.dateDebut).toISOString(),
      dateFin: new Date(task.dateFin).toISOString(),
      projet: projectId,
    };

    try {
      const url = editingTaskId
        ? `http://localhost:8888/api/projet/${projectId}/taches/${editingTaskId}`
        : `http://localhost:8888/api/projet/${projectId}/taches`;

      const method = editingTaskId ? 'put' : 'post';
      const response = await axios[method](url, formattedTask);

      if (editingTaskId) {
        setTasks(tasks.map((t) => (t._id === editingTaskId ? response.data : t)));
      } else {
        setTasks([...tasks, response.data]);
      }

      setTask({ description: '', dateDebut: '', dateFin: '' });
      setEditingTaskId(null);
      setShowForm(!showForm);

    } catch (error) {
      console.error('Erreur lors de l\'ajout/modification de la tâche :', error);
    }
  };

  // Supprimer une tâche
  const handleDeleteTask = async (taskId) => {
      try {
        await axios.delete(`http://localhost:8888/api/projet/${projectId}/taches/${taskId}`);
        setTasks(tasks.filter((t) => t._id !== taskId));
        toast.success("Tache supprimee")
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche :', error);
      }
    
  };

  // Modifier une tâche
  const handleEditTask = (tache) => {
    setTask({
      description: tache.description,
      dateDebut: tache.dateDebut.split('T')[0],
      dateFin: tache.dateFin.split('T')[0],
    });
    setEditingTaskId(tache._id);
  };

  // Naviguer vers la page des ressources d'une tâche
  const handleViewTasks = (taskId) => {
    navigate(`/task/${taskId}/resources`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6"
    style={{ 
      backgroundImage: "url('https://i.pinimg.com/736x/6a/00/53/6a005392bf28f3bf2d20f8d3ecc0e350.jpg')", // Remplacez par le chemin de votre image
      backgroundSize: 'cover', // Ajuste la taille de l'image pour couvrir tout l'arrière-plan
      backgroundPosition: 'center', // Centre l'image
      backgroundBlendMode: 'overlay', // Superpose le dégradé sur l'image
    }}>
      <Toaster/>
      <div className="max-w-4xl mx-auto  bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Retour aux projets
        </button>
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Gestion des Tâches</h1>
        
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            {editingTaskId ? 'Modifier la tâche' : 'Ajouter une nouvelle tâche'}
          </h2>
         <div className="space-y-4">
            <input
              type="text"
              placeholder="Description de la tâche"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={task.dateDebut}
              onChange={(e) => setTask({ ...task, dateDebut: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={task.dateFin}
              onChange={(e) => setTask({ ...task, dateFin: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAddOrEditTask}
              className={`w-full ${editingTaskId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white py-3 rounded-lg transition duration-300`}
            >
              {editingTaskId ? 'Modifier la tâche' : 'Ajouter la tâche'}
            </button>
          </div>
        </div> 

        {/* Liste des tâches */}
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Liste des Tâches</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-600">Aucune tâche disponible pour ce projet.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((tache) => (
                <div key={tache._id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 font-semibold">{tache.description}</p>
                    <p className="text-sm text-gray-600">Début: {new Date(tache.dateDebut).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Fin: {new Date(tache.dateFin).toLocaleDateString()}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditTask(tache)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteTask(tache._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => handleViewTasks(tache._id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Voir les ressources
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTasksPage;