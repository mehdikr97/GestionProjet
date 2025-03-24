import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const TaskResourcesPage = () => {
  const { taskId } = useParams(); 
  const [resources, setResources] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  
  const [newResource, setNewResource] = useState({ nom: '', type: '', quantite: '' });
  const navigate = useNavigate();

  useEffect((taskId) => {
    fetchResources();
  }, [taskId]);

  const fetchResources = async (ressourceId) => {
    try {
      const response = await axios.get(`http://localhost:8888/api/tache/${taskId}/ressources/${ressourceId}`);
      setResources(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des ressources:', error);
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault(); 

    if (!newResource.nom || !newResource.type || !newResource.quantite) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8888/api/tache/${taskId}/ressources`, newResource);
      setResources([...resources, response.data]); 
      setShowForm(false);
      setNewResource({ nom: '', type: '', quantite: '' }); 
      toast.success('Ressource ajoutée avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la ressource :', error);
      toast.error('Une erreur est survenue lors de l\'ajout de la ressource.');
    }
  };
  const handleDeleteResource = async (ressourceId) => {
    try {
      await axios.delete(`http://localhost:8888/api/tache/${taskId}/ressources/${ressourceId}`);
      setResources(resources.filter((r) => r._id !== ressourceId));
      toast.success("Ressource supprimée");
    } catch (error) {
      console.error('Erreur suppression ressource:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      toast.error(error.response?.data?.message || "Échec de la suppression");
    }
  };
  const handleUpdateResource = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8888/api/tache/${taskId}/ressources/${editingResource._id}`,
        {
          nom: editingResource.nom,
          type: editingResource.type,
          quantite: editingResource.quantite
        }
      );
  
      setResources(resources.map((r) => (r._id === editingResource._id ? response.data : r)));
      toast.success("Ressource modifiée avec succès !");
      setEditingResource(null);
    } catch (error) {
      console.error("Erreur lors de la modification de la ressource :", error);
      toast.error("Erreur lors de la modification de la ressource.");
    }
  };
  
  const handleEditResource = (resource) => {
    setEditingResource(resource);
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-500 to-zinc-800 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Retour aux tâches
        </button>
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Ressources de la Tâche</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          {showForm ? 'Masquer le formulaire' : 'Ajouter une Ressource'}
        </button>

        {showForm && (
          <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Ajouter une nouvelle ressource</h2>
            <Toaster />
            <form onSubmit={handleAddResource} className="space-y-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom de la ressource"
                value={newResource.nom}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="type"
                placeholder="Type de ressource"
                value={newResource.type}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                name="quantite"
                placeholder="Quantité"
                value={newResource.quantite}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Ajouter
              </button>
            </form>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Liste des Ressources</h2>
          {resources.length === 0 ? (
            <p className="text-gray-600">Aucune ressource disponible pour cette tâche.</p>
          ) : (
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource._id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-gray-800 font-semibold">{resource.nom}</p>
                  <p className="text-sm text-gray-600">Type: {resource.type}</p>
                  <p className="text-sm text-gray-600">Quantité: {resource.quantite}</p>
                  <button
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => handleDeleteResource(resource._id)}>Supprimer</button>
                           <button
                      onClick={() => handleEditResource(resource)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Modifier
                    </button>
                  </div>
              ))}
              {editingResource && (
  <div className="edit-form">
    <h3>Modifier la ressource</h3>
    <input
      type="text"
      value={editingResource.nom}
      onChange={(e) => setEditingResource({ ...editingResource, nom: e.target.value })}
    />
    <input
      type="text"
      value={editingResource.type}
      onChange={(e) => setEditingResource({ ...editingResource, type: e.target.value })}
    />
    <input
      type="number"
      value={editingResource.quantite}
      onChange={(e) => setEditingResource({ ...editingResource, quantite: e.target.value })}
    />
    <button onClick={handleUpdateResource}>Modifier</button>
    <button onClick={() => setEditingResource(null)}>Annuler</button>
  </div>
)}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskResourcesPage;
