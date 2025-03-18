import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [project, setProject] = useState({
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    budget: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:9090/api/projet/Afficher')
      .then((response) => setProjects(response.data))
      .catch((error) =>
        console.error('Erreur lors du chargement des projets:', error)
      );
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post('http://localhost:9090/api/projet/Ajouter', project);
      setProjects([...projects, response.data]);
      setShowForm(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Une erreur s'est produite lors de l'ajout du projet.");
      }
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-gray-100 pl-6">
      <button
        onClick={toggleForm}
        className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 border border-transparent focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-indigo-600 me-2 mb-2"
      >
        Ajouter
      </button>

      {/* Formulaire d'ajout de projet */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="text-red-500 bg-red-100 p-3 rounded-md">
              {Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage}
            </div>
          )}

          <input
            type="text"
            placeholder="Nom du projet"
            value={project.nom}
            onChange={(e) => setProject({ ...project, nom: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Description du projet"
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            placeholder="Date de début"
            value={project.dateDebut}
            onChange={(e) => setProject({ ...project, dateDebut: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            placeholder="Date de fin"
            value={project.dateFin}
            onChange={(e) => setProject({ ...project, dateFin: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Budget"
            value={project.budget}
            onChange={(e) => setProject({ ...project, budget: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded">
            Ajouter le projet
          </button>
        </form>
      )}

      {/* Liste des projets */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => handleSelectProject(project)}
            className="p-4 border rounded shadow-lg bg-white cursor-pointer hover:shadow-xl"
          >
            <h2 className="text-xl font-bold">{project.nom}</h2>
            <p className="mt-2">{project.description}</p>
            <p className="text-sm text-gray-600">Début: {project.dateDebut} - Fin: {project.dateFin}</p>
            <p className="text-sm text-gray-600">Budget: {project.budget} DH</p>
          </div>
        ))}
      </div>

      {/* Modale pour afficher les détails d'un projet */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{selectedProject.nom}</h2>
            <p>{selectedProject.description}</p>
            <p className="text-sm text-gray-600">Début: {selectedProject.dateDebut}</p>
            <p className="text-sm text-gray-600">Fin: {selectedProject.dateFin}</p>
            <p className="text-sm text-gray-600">Budget: {selectedProject.budget} DH</p>

            {/* Liste des tâches */}
            <h3 className="text-lg font-bold mt-4">Tâches</h3>
            <ul className="list-disc pl-6">
              {(selectedProject.tasks || []).map((task, index) => (
                <li key={index}>{task.description}</li>
              ))}
            </ul>

            {/* Ajouter une tâche */}
            
            {/* Bouton pour fermer la modale */}
            <button
              onClick={() => setSelectedProject(null)}
              className="w-full bg-red-500 text-white py-2 rounded mt-4"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
