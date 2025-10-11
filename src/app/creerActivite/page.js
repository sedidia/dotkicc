'use client';
import axios from 'axios';
import { useState } from 'react';

const CreerActivite = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const createActivite = async (activite) => {
    try {
      const response = await axios.post('/api/activites', activite);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activite = {
      titre,
      description,
      image,
    };
    createActivite(activite);
  };

  return (
    <div>
      <h1>Créer une activité</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
            <label>Titre</label>
            <span className="input-group-text" id="basic-addon1"></span>
            <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3">
            <label>Description</label>
            <span className="input-group-text" id="basic-addon1">@</span>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3">
            <label>Image</label>
            <span className="input-group-text" id="basic-addon1">@</span>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        
        <button type="submit" className="btn btn-primary">Créer</button>
      </form>
    </div>
  );
};

export default CreerActivite;