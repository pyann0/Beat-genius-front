import ApiService from "../../service/ApiService";
import { useEffect, useState } from "react";
function HomePage(){
    const monService = new ApiService("http://localhost:8080/catalogues");
    const [catalogues, setCatalogues] = useState([]);
    
    useEffect( () => {
        monService.get()
              .then((response) =>{
                  setCatalogues(response.content)
                  console.log(response.content);
              })
              .catch((error) =>{
                  // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
                  alert(error.message)
              })
              // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
              // il s'exécutera
              .finally( () => console.log('Get terminé'))
    },[]);


    
    return(
    <>
        <h1>Bienvenue Page Accueil</h1>
    </>
    )
}
export default HomePage;