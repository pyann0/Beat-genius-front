import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";

export const ModifierProfile = () => {
  const monService = new ApiService("http://localhost:8080/users")
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [formEnvoyer, setFormEnvoyer] = useState('');



  useEffect(() => {
    monService.get(`/${localStorage.getItem('id')}`)
      .then((response) => {
        setUser(response);
        setUsername(response.username);
        setEmail(response.email);
        console.log(response);
      })
      .catch((error) => {
        // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
        alert(error.message)
      })
      // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
      // il s'exécutera
      .finally(() => console.log('Get terminé'))
  }, []);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailError('');
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    setUsernameError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérification de l'email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    // Vérification de la longueur du nom d'utilisateur
    if (username.length > 60 || username.length < 2) {
      setUsernameError('Le nom d\'utilisateur doit posséder au moins 2 caractère et ne doit pas dépasser 60 caractères.');
      return;
    }
    if (/\s/.test(username)) {
      setUsernameError('Le nom d\'utilisateur ne peut pas contenir d\'espace.');
      return;
    }
    const data = user;
    console.log(data);
    data.username = username
    data.email = email;
    console.log(data);

    monService.post(undefined, data)
    .then((response) => {
      console.log(response);
      setFormEnvoyer('Les modifications ont bien été effectué')
    })
    .catch((error) => {
      // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
      alert(error.message)
    })
    // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
    // il s'exécutera
    .finally(() => console.log('Post terminé'))




    // Le formulaire est valide, vous pouvez procéder à l'envoi des données
    console.log('Email:', email);
    console.log('Username:', username);

    // Réinitialiser le formulaire après la soumission
  };


  

  



  return (
    <>
    {formEnvoyer && <div style={{ color: 'red' }}>{formEnvoyer}</div>}
      <h1>Modifier vos informations personnelles</h1>
      
      <form onSubmit={handleSubmit}>

        <label>Username:</label>
        <input
          placeholder="Username"
          className="flex input input-bordered"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
        <label>Email:</label>
        <input
          placeholder="Email"
          className="flex input input-bordered"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

         {emailError && <div style={{ color: 'red' }}>{emailError}</div>}


        <button className="btn btn-outline btn-inf" >Modifier vos informations</button>
      </form>
      {/* Contenu de votre composant */}
    </>
  );
}