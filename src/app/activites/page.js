import Link from 'next/link';

function ActiviteCard({ titre, description, image }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-auto">
        <img src={image} className="card-img-top" alt={titre} />
        <div className="card-body">
          <h5 className="card-title">{titre}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer">
          <Link href="/" className="btn btn-primary">
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}

function Activites() {
  const activites = [
    {
      titre: 'Activité 1',
      description: 'Description de l\'activité 1',
      image: 'activite.jpg',
    },
    {
      titre: 'Activité 2',
      description: 'Description de l\'activité 2',
      image: 'activite.jpg',
    },
    {
      titre: 'Activité 3',
      description: 'Description de l\'activité 3',
      image: 'activite.jpg',
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Nos activités</h1>
      <div className="row">
        {activites.map((activite, index) => (
          <ActiviteCard
            key={index}
            titre={activite.titre}
            description={activite.description}
            image={activite.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Activites;