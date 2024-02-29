import { useState } from "react";
import ApiService from "../../service/ApiService";

export const Inscription = () => {
  const monService = new ApiService("http://localhost:8080/auth/register")
  const [isLoginIn, setIsLoginIn] = useState('')
  const [loginError, setLoginError] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordError('');
  };



  const handleRegister = async () => {
   // setIsLoginIn(true);

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

    

    
    
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/.test(password)) {
      setPasswordError('Le mot de passe doit contenir au minimum 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial');
      return;
    }





    try{
        
        const registerData = {
          email: email,
          password: password,
          username: username  
                 
        }

        //console.log(registerData);
        
        monService.post(undefined, registerData)
        .then((response) => {
          console.log(response);
          setLoginError("Utilisateur Créer !")
        })
        .catch((error) => {
          // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
          alert(error.message)
        })
        // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
        // il s'exécutera
        .finally(() => console.log('Get terminé'))
        
        /*
        await monService.post(undefined, registerData)
        .then( (data) => {
          console.log(data)
        .catch((error) => {
        console.log("Une erreur est survenue")
        console.error(error.message)})
        .finally(()=> console.log("Post terminé"))*/


        // Je simule une erreur
        //throw new Error ("Erreur d'authentification")
    }
    catch (error){
        setLoginError("Erreur lors de l'envoie des données")
    } 
    finally {
        setIsLoginIn(false)
    }
}

  return (
    <>

<div className="flex items-center justify-center min-h-screen">
        <div className="p-8 bg-white rounded shadow-md w-96">
          <h2 className="mb-6 text-2xl font-bold">Inscription</h2>
            { loginError && <p className="mb-4 text-red-500">{loginError}</p> }
<div className="mb-4" >
            <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
            
            <input 
            type="text"
            id='email'
            className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded"
            value={email}
            onChange={handleEmailChange}
            />
            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          </div>

  <div className="mb-4" >
              <label htmlFor="username" className="block font-semibold text-gray-700">Nom d'utilisateur</label>            
              <input 
              type="text"
              id='username'
              className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded"
              value={username}
              onChange={handleUsernameChange} 
              />
              {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
            </div>

      <div className="mb-4">
            <label htmlFor="password" className="block font-semibold text-gray-700">Mot de passe</label>
            <input 
                type="password" 
                id="password"
                className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded"
                value={password}
                onChange={handlePasswordChange} 
                />
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                </div>
                <button 
                  className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isLoginIn && 'opacity-50 cursor-not-allowed'}`}
                  
                  onClick={handleRegister}
                  disabled={isLoginIn}
                  >
                      S'inscrire  
                </button>
              </div>
            </div>
          </>
  );
}