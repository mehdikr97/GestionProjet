import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';


const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:8888/api/projet/Afficher')
      .then((response) => setProjects(response.data))
      .catch((error) =>
        console.error('Erreur lors du chargement des projets:', error)
      );
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    setErrorMessage("");
    setIsEditing(false);
    setProject({
      nom: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      budget: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:8888/api/projet/Modifier/${selectedProject._id}`, project);
        setProjects((prevProjects) =>
          prevProjects.map((proj) => (proj._id === selectedProject._id ? response.data.updatedProjet : proj))
        );
      } else {
        const response = await axios.post('http://localhost:8888/api/projet/Ajouter', project);
        setProjects([...projects, response.data]);
        toast.success('Envoyer avec Success ')

      }
      setShowForm(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Une erreur s'est produite lors de l'ajout/modification du projet.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8888/api/projet/Supprimer/${id}`);
      if (response.status === 200) {
        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
        toast.success('Supprimer avec succes . ',{
          icon:"🤗"
        })
        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsEditing(true);
    setShowForm(true);
    setProject({
      nom: project.nom,
      description: project.description,
      dateDebut: project.dateDebut,
      dateFin: project.dateFin,
      budget: project.budget
    });
  };

  const handleViewTasks = (projectId) => {
    navigate(`/project/${projectId}/tasks`); 
  };

  return (
<div 
  className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6"
  style={{ 
    backgroundImage: "url('https://i.pinimg.com/736x/39/8b/b0/398bb0df12de03c82f4edf2e7f0bcb29.jpg')", // Remplacez par le chemin de votre image
    backgroundSize: 'cover', // Ajuste la taille de l'image pour couvrir tout l'arrière-plan
    backgroundPosition: 'center', // Centre l'image
    backgroundBlendMode: 'overlay', // Superpose le dégradé sur l'image
  }}
>      <Toaster/>
<div className="max-w-8xl mx-auto  bg-opacity-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Gestion de Projets</h1>
        <div class="relative inline-flex group">

 
    </div>
    <div class="flex justify-end"> 
  <div class="relative inline-flex group">
    <div
      class="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-green-400 to-green-600 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
    ></div>
    <button
      type="button"
      onClick={toggleForm}
      class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-green-400 to-green-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:from-green-500 hover:to-green-700"
    >
    {isEditing ? "Modifier le projet" : "Ajouter un projet"}
    </button>
  </div>
</div>
          

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-lg">
            {errorMessage && (
              <div className="text-red-500 bg-red-100 p-3 rounded-md">
                {Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage}
              </div>
            )}

            <input type="text" placeholder="Nom du projet" value={project.nom} onChange={(e) => setProject({ ...project, nom: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="Description du projet" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"></textarea>
            <input type="date" value={project.dateDebut} onChange={(e) => setProject({ ...project, dateDebut: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
            <input type="date" value={project.dateFin} onChange={(e) => setProject({ ...project, dateFin: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
            <input type="number" placeholder="Budget" value={project.budget} onChange={(e) => setProject({ ...project, budget: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">{isEditing ? "Modifier le projet" : "Ajouter le projet"}</button>
          </form>
        )}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
  {projects.map((project, index) => (
    <div
      key={index}
      className="relative p-4 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gradient-to-r from-teal-500 to-teal-900"
      style={{
        border: '2px solid transparent',
        backgroundClip: 'padding-box', // Pour éviter que le dégradé ne déborde sur la bordure
      }}
    >
      {/* Bordure dégradée */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'linear-gradient(45deg, oklch(0.52 0.105 223.128), oklch(0.277 0.046 192.524))', 
          zIndex: -1, 
          margin: '-2px', 
        }}
      ></div>

      {/* Contenu de la carte */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold  mb-4 text-center  text-amber-500">{project.nom}</h2>
        <p className="mt-2 text-white leading-relaxed text-base italic overflow-hidden overflow-ellipsis">
          {project.description}
        </p>
        <p className="text-sm text-white mt-3 font-medium">
          <span className="font-semibold">Début:</span> {project.dateDebut}
          <br />
          <br />
          <span className="font-semibold">Fin:</span> {project.dateFin}
        </p>
        <p className="text-sm text-white mt-1 font-medium">
          <br />
          <span className="font-semibold">Budget:</span> {project.budget} DH
        </p>
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => handleEdit(project)}
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDelete(project._id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Supprimer
          </button>
          <button
            onClick={() => handleViewTasks(project._id)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Voir les tâches
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default HomePage;